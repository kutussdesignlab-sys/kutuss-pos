/**
 * Kutuss POS - Supabase PostgreSQL Real-time Sync Engine
 * --------------------------------------------------------
 * Synchronizes local browser Dexie IndexedDB with Supabase PostgreSQL.
 * Completely eliminates Firebase 429 quota exhaustion with no daily read locks.
 */

(function () {
    const SYNC_TABLES = [
        { name: 'sales', key: 'id' },
        { name: 'expenses', key: 'id' },
        { name: 'projects', key: 'id' },
        { name: 'inquiries', key: 'id' },
        { name: 'suppliers', key: 'id' },
        { name: 'salaryPaysheets', key: 'id' },
        { name: 'teamMembers', key: 'id' },
        { name: 'memberProjectPayments', key: 'id' },
        { name: 'payableBills', key: 'id' },
        { name: 'printOrders', key: 'id' },
        { name: 'settings', key: 'key' }
    ];

    let isSyncingFromCloud = false;
    let isReconciling = false;
    let realtimeChannel = null;
    let refreshTimer = null;

    // Unique ID for this device session to avoid self-echo loops
    const deviceId = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();

    // 1. Offline Queue Management
    function getOfflineQueue() {
        try {
            return JSON.parse(localStorage.getItem('kutuss_supabase_queue') || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveOfflineQueue(queue) {
        try {
            localStorage.setItem('kutuss_supabase_queue', JSON.stringify(queue.slice(-500)));
        } catch (e) {
            console.warn('Failed to save offline queue:', e);
        }
    }

    function queueOfflineChange(action, table, id, data) {
        const queue = getOfflineQueue();
        const filtered = queue.filter(item => !(item.table === table && String(item.id) === String(id)));
        filtered.push({
            action,
            table,
            id: String(id),
            data,
            timestamp: Date.now()
        });
        saveOfflineQueue(filtered);
    }

    // 2. Tombstone Management
    function getTombstones() {
        try {
            return JSON.parse(localStorage.getItem('kutuss_deleted_records') || '{}');
        } catch (e) {
            return {};
        }
    }

    function markAsTombstone(table, id) {
        if (!id) return;
        try {
            const tombstones = getTombstones();
            tombstones[`${table}:${String(id)}`] = Date.now();
            localStorage.setItem('kutuss_deleted_records', JSON.stringify(tombstones));
        } catch (e) { }
    }

    function isTombstoned(table, id) {
        if (!id) return false;
        try {
            const tombstones = getTombstones();
            return !!tombstones[`${table}:${String(id)}`];
        } catch (e) {
            return false;
        }
    }

    // 3. Status Badge Management
    function setSyncStatus(status, text) {
        window._currentSyncStatus = status;
        const badges = document.querySelectorAll('.kutuss-cloud-sync-badge');
        badges.forEach(badge => {
            badge.setAttribute('data-status', status);
            let icon = 'fa-solid fa-cloud';
            let colorClass = 'text-gray-500 bg-gray-100 border-gray-200';

            if (status === 'connected') {
                icon = 'fa-solid fa-cloud-check';
                colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-300';
            } else if (status === 'syncing') {
                icon = 'fa-solid fa-rotate fa-spin';
                colorClass = 'text-blue-700 bg-blue-50 border-blue-300';
            } else if (status === 'offline') {
                icon = 'fa-solid fa-cloud-arrow-down';
                colorClass = 'text-amber-700 bg-amber-50 border-amber-300';
            } else if (status === 'unconfigured') {
                icon = 'fa-solid fa-cloud-slash';
                colorClass = 'text-gray-600 bg-gray-100 border-gray-300';
            } else if (status === 'error') {
                icon = 'fa-solid fa-triangle-exclamation';
                colorClass = 'text-red-700 bg-red-50 border-red-300';
            }

            badge.className = `kutuss-cloud-sync-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${colorClass}`;
            badge.innerHTML = `<i class="${icon}"></i> <span>${text}</span>`;
            badge.title = `Supabase Sync: ${text} (Click to manage)`;
            badge.onclick = () => {
                if (typeof window.showSection === 'function') {
                    window.showSection('database');
                    const el = document.getElementById('supabase-config-card');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            };
        });
    }

    window.setSyncStatus = setSyncStatus;

    // Trigger debounced UI refresh on cloud updates
    function triggerUIRefresh(table) {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
            try {
                const activeSection = document.querySelector('section:not(.hidden)');
                const sectionId = activeSection ? activeSection.id.replace('-section', '') : '';

                if (typeof window.loadDashboard === 'function') window.loadDashboard();
                if (sectionId === 'history' && typeof window.loadHistory === 'function') window.loadHistory();
                if (sectionId === 'expenses' && typeof window.loadExpenses === 'function') window.loadExpenses();
                if (sectionId === 'projects' && typeof window.loadProjects === 'function') window.loadProjects();
                if (sectionId === 'inquiries' && typeof window.loadInquiries === 'function') window.loadInquiries();
                if (sectionId === 'suppliers' && typeof window.loadSuppliers === 'function') window.loadSuppliers();
                if (sectionId === 'salary-paysheet' && typeof window.loadPaysheets === 'function') window.loadPaysheets();
                if (sectionId === 'team-members' && typeof window.loadTeamMembers === 'function') window.loadTeamMembers();
                if (sectionId === 'reports' && typeof window.generateReport === 'function') window.generateReport();
                if (sectionId === 'print-orders' && typeof window.loadPrintOrders === 'function') {
                    window.loadPrintOrders(window.currentPrintOrderFilter);
                }
            } catch (e) {
                console.warn('UI refresh error:', e);
            }
        }, 300);
    }

    // 4. Push individual mutation to Supabase
    async function pushChangeToCloud(action, table, id, data, altIds = []) {
        if (!id && id !== 0) return;
        const idStr = String(id);
        const cfg = window.getSupabaseConfig();
        if (!cfg.url || !cfg.anonKey) {
            setSyncStatus('unconfigured', 'Connect Supabase');
            return;
        }

        const tableName = `kutuss_${table}`.toLowerCase();
        const client = window.getSupabaseClient();

        if (action === 'delete') {
            markAsTombstone(table, idStr);
            if (Array.isArray(altIds)) {
                altIds.forEach(alt => markAsTombstone(table, String(alt)));
            }

            // Remove from offline queue
            try {
                const queue = getOfflineQueue();
                const cleanQueue = queue.filter(item => {
                    if (item.table !== table) return true;
                    if (String(item.id) === idStr) return false;
                    if (Array.isArray(altIds) && altIds.some(alt => String(item.id) === String(alt))) return false;
                    return true;
                });
                saveOfflineQueue(cleanQueue);
            } catch (e) { }

            const targetIds = [idStr];
            if (Array.isArray(altIds)) {
                altIds.forEach(alt => {
                    const s = String(alt).trim();
                    if (s && !targetIds.includes(s)) targetIds.push(s);
                });
            }

            let allDeleted = true;
            for (const docId of targetIds) {
                let deleted = false;
                if (client) {
                    try {
                        const { error } = await client.from(tableName).delete().eq('id', docId);
                        if (!error) deleted = true;
                    } catch (e) { }
                }

                // REST API DELETE fallback
                if (!deleted && navigator.onLine) {
                    try {
                        const res = await fetch(`${cfg.url}/rest/v1/${tableName}?id=eq.${encodeURIComponent(docId)}`, {
                            method: 'DELETE',
                            headers: {
                                'apikey': cfg.anonKey,
                                'Authorization': `Bearer ${cfg.anonKey}`
                            }
                        });
                        if (res.ok) deleted = true;
                    } catch (e) { }
                }

                if (!deleted) {
                    allDeleted = false;
                    queueOfflineChange('delete', table, docId, null);
                }
            }

            setSyncStatus(allDeleted ? 'connected' : 'offline', allDeleted ? 'Cloud Synced' : 'Pending Delete Sync');
            return;
        }

        // Action === 'set'
        const cleanData = { ...data };
        cleanData._deviceId = deviceId;
        cleanData._updatedAt = Date.now();

        const payload = {
            id: idStr,
            data: cleanData,
            updated_at: Date.now()
        };

        let saved = false;

        // 1. Supabase JS Client upsert
        if (client) {
            try {
                const { error } = await client.from(tableName).upsert(payload, { onConflict: 'id' });
                if (!error) saved = true;
                else console.warn(`Supabase upsert note for ${tableName}/${idStr}:`, error.message);
            } catch (e) {
                console.warn(`Supabase upsert error for ${tableName}/${idStr}:`, e);
            }
        }

        // 2. Direct REST API Fallback
        if (!saved && navigator.onLine) {
            try {
                const res = await fetch(`${cfg.url}/rest/v1/${tableName}?on_conflict=id`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': cfg.anonKey,
                        'Authorization': `Bearer ${cfg.anonKey}`,
                        'Prefer': 'resolution=merge-duplicates'
                    },
                    body: JSON.stringify(payload)
                });
                if (res.ok) saved = true;
            } catch (e) {
                console.warn(`REST fallback write error for ${tableName}/${idStr}:`, e);
            }
        }

        if (saved) {
            // Mark as synced locally in Dexie
            try {
                const localTable = window.db ? window.db[table] : null;
                if (localTable) {
                    const pk = (table === 'settings') ? idStr : (parseInt(idStr, 10) || idStr);
                    isSyncingFromCloud = true;
                    await localTable.update(pk, { _syncedToCloud: true });
                    isSyncingFromCloud = false;
                }
            } catch (e) {
                isSyncingFromCloud = false;
            }
            setSyncStatus('connected', 'Cloud Synced');
        } else {
            queueOfflineChange(action, table, idStr, data);
            setSyncStatus('offline', 'Sync Retrying Soon');
        }
    }

    // 5. Intercept Dexie Database Operations
    function interceptDexieMethods() {
        if (!window.db) return;

        SYNC_TABLES.forEach(({ name: tableName, key: keyField }) => {
            const table = window.db[tableName];
            if (!table || table._dexieSupabaseHooked) return;
            table._dexieSupabaseHooked = true;

            // Hook .add()
            const origAdd = table.add.bind(table);
            table.add = async function (item, key) {
                if (item && typeof item === 'object') {
                    item._syncedToCloud = false;
                }
                const resKey = await origAdd(item, key);
                const pk = (item && item[keyField] !== undefined) ? item[keyField] : (resKey || key);
                if (!isSyncingFromCloud && pk !== undefined) {
                    const record = (item && typeof item === 'object') ? { ...item, [keyField]: pk } : item;
                    pushChangeToCloud('set', tableName, pk, record);
                }
                return resKey;
            };

            // Hook .put()
            const origPut = table.put.bind(table);
            table.put = async function (item, key) {
                if (item && typeof item === 'object') {
                    item._syncedToCloud = false;
                }
                const resKey = await origPut(item, key);
                const pk = (item && item[keyField] !== undefined) ? item[keyField] : (resKey || key);
                if (!isSyncingFromCloud && pk !== undefined) {
                    const record = (item && typeof item === 'object') ? { ...item, [keyField]: pk } : item;
                    pushChangeToCloud('set', tableName, pk, record);
                }
                return resKey;
            };

            // Hook .update()
            const origUpdate = table.update.bind(table);
            table.update = async function (key, changes) {
                const lookupKey = (keyField === 'id' && typeof key === 'string' && /^\d+$/.test(key)) ? parseInt(key, 10) : key;
                const res = await origUpdate(lookupKey, changes);
                if (!isSyncingFromCloud) {
                    try {
                        let updated = await table.get(lookupKey);
                        if (!updated) updated = await table.get(key);
                        if (updated) {
                            const finalKey = (updated[keyField] !== undefined) ? updated[keyField] : lookupKey;
                            pushChangeToCloud('set', tableName, finalKey, updated);
                        } else {
                            pushChangeToCloud('set', tableName, lookupKey, changes);
                        }
                    } catch (e) { }
                }
                return res;
            };

            // Hook .delete()
            const origDelete = table.delete.bind(table);
            table.delete = async function (key) {
                let normKey = (keyField === 'id' && typeof key === 'string' && /^\d+$/.test(key)) ? parseInt(key, 10) : key;
                const altIds = [];
                try {
                    let existing = await table.get(normKey);
                    if (!existing && typeof normKey === 'number') existing = await table.get(String(normKey));
                    if (existing) {
                        if (existing.orderNo) altIds.push(existing.orderNo);
                        if (existing.projectID) altIds.push(existing.projectID);
                        if (existing.receiptNo) altIds.push(existing.receiptNo);
                    }
                } catch (e) { }

                const res = await origDelete(normKey);
                if (!isSyncingFromCloud) {
                    pushChangeToCloud('delete', tableName, normKey, null, altIds);
                }
                return res;
            };

            // Hook .bulkDelete()
            const origBulkDelete = (typeof table.bulkDelete === 'function') ? table.bulkDelete.bind(table) : null;
            if (origBulkDelete) {
                table.bulkDelete = async function (keys) {
                    if (!isSyncingFromCloud && Array.isArray(keys)) {
                        for (const k of keys) {
                            let normK = (keyField === 'id' && typeof k === 'string' && /^\d+$/.test(k)) ? parseInt(k, 10) : k;
                            pushChangeToCloud('delete', tableName, normK, null);
                        }
                    }
                    return await origBulkDelete(keys);
                };
            }
        });
    }

    // 6. Realtime Subscriptions (Pull incoming cloud changes from other devices)
    function startRealtimeListeners() {
        const client = window.getSupabaseClient();
        if (!client) return;

        if (realtimeChannel) {
            try { client.removeChannel(realtimeChannel); } catch (e) { }
        }

        realtimeChannel = client.channel('kutuss-pos-sync-channel');

        SYNC_TABLES.forEach(({ name: tableName, key: keyField }) => {
            const sbTable = `kutuss_${tableName}`.toLowerCase();
            realtimeChannel.on('postgres_changes', { event: '*', schema: 'public', table: sbTable }, async (payload) => {
                if (!window.db) return;
                const localTable = window.db[tableName];
                if (!localTable) return;

                const { eventType, new: newRec, old: oldRec } = payload;

                if (eventType === 'DELETE') {
                    const delId = oldRec ? oldRec.id : null;
                    if (!delId) return;
                    markAsTombstone(tableName, delId);
                    isSyncingFromCloud = true;
                    try {
                        const numId = parseInt(delId, 10);
                        if (!isNaN(numId)) await localTable.delete(numId);
                        await localTable.delete(delId);
                    } finally {
                        isSyncingFromCloud = false;
                        triggerUIRefresh(tableName);
                    }
                    return;
                }

                // INSERT or UPDATE
                if (newRec && newRec.data) {
                    const itemData = newRec.data;
                    if (itemData._deviceId === deviceId) return; // Skip local echo

                    const rawId = String(newRec.id);
                    if (isTombstoned(tableName, rawId)) return;

                    const item = { ...itemData };
                    delete item._deviceId;
                    delete item._updatedAt;
                    item._syncedToCloud = true;

                    if (keyField === 'id') {
                        const parsedId = parseInt(rawId, 10);
                        item.id = !isNaN(parsedId) ? parsedId : rawId;
                    } else {
                        item[keyField] = rawId;
                    }

                    isSyncingFromCloud = true;
                    try {
                        await localTable.put(item);
                    } finally {
                        isSyncingFromCloud = false;
                        triggerUIRefresh(tableName);
                    }
                }
            });
        });

        realtimeChannel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('⚡ Supabase Realtime connected successfully!');
                setSyncStatus('connected', 'Cloud Connected');
            }
        });
    }

    // 7. Process Offline Queue
    async function processOfflineQueue() {
        if (!navigator.onLine) return;
        const queue = getOfflineQueue();
        if (queue.length === 0) return;

        setSyncStatus('syncing', 'Syncing Changes...');
        const remaining = [];

        for (const item of queue) {
            try {
                await pushChangeToCloud(item.action, item.table, item.id, item.data);
            } catch (e) {
                remaining.push(item);
            }
        }

        saveOfflineQueue(remaining);
        if (remaining.length === 0) {
            setSyncStatus('connected', 'Cloud Synced');
        } else {
            setSyncStatus('offline', `${remaining.length} Pending Sync`);
        }
    }

    // 8. Reconcile Unsynced Local Records
    async function syncUnsyncedLocalRecords() {
        if (isReconciling || !navigator.onLine || !window.db) return;
        if (!window.isSupabaseConfigured()) return;

        isReconciling = true;
        try {
            for (const { name: tableName, key: keyField } of SYNC_TABLES) {
                const table = window.db[tableName];
                if (!table) continue;

                const records = await table.toArray();
                if (!records || records.length === 0) continue;

                for (const item of records) {
                    if (item._syncedToCloud === true) continue;
                    const pk = item[keyField];
                    if (pk === undefined || pk === null) continue;
                    if (isTombstoned(tableName, String(pk))) continue;

                    await pushChangeToCloud('set', tableName, pk, item);
                }
            }
        } catch (err) {
            console.warn('Reconciliation error:', err);
        } finally {
            isReconciling = false;
        }
    }

    // 8B. Pull All Records from Supabase into Local Dexie (Initial sync for new devices & auto-sync)
    window.pullAllCloudRecords = async function (silent = false) {
        if (!window.isSupabaseConfigured() || !window.db || !navigator.onLine) return 0;
        const cfg = window.getSupabaseConfig();
        const client = window.getSupabaseClient();
        if (!cfg.url || !cfg.anonKey) return 0;

        if (!silent) setSyncStatus('syncing', 'Syncing from Cloud...');
        let totalPulled = 0;

        try {
            for (const { name: tableName, key: keyField } of SYNC_TABLES) {
                const localTable = window.db[tableName];
                if (!localTable) continue;
                const sbTable = `kutuss_${tableName}`.toLowerCase();

                let cloudRows = null;

                // 1. Try Supabase Client
                if (client) {
                    try {
                        const { data, error } = await client.from(sbTable).select('*');
                        if (!error && Array.isArray(data)) {
                            cloudRows = data;
                        }
                    } catch (e) {
                        console.warn(`Client pull error for ${sbTable}:`, e);
                    }
                }

                // 2. Direct PostgREST fallback
                if (!cloudRows && navigator.onLine) {
                    try {
                        const res = await fetch(`${cfg.url}/rest/v1/${sbTable}?select=*`, {
                            headers: {
                                'apikey': cfg.anonKey,
                                'Authorization': `Bearer ${cfg.anonKey}`
                            }
                        });
                        if (res.ok) {
                            const rows = await res.json();
                            if (Array.isArray(rows)) cloudRows = rows;
                        }
                    } catch (e) {
                        console.warn(`PostgREST pull error for ${sbTable}:`, e);
                    }
                }

                if (!Array.isArray(cloudRows) || cloudRows.length === 0) continue;

                // Apply to local Dexie
                isSyncingFromCloud = true;
                try {
                    const tombstones = getTombstones();
                    for (const row of cloudRows) {
                        const item = (row.data && typeof row.data === 'object') ? { ...row.data } : null;
                        if (!item) continue;

                        const docId = String(row.id || item[keyField] || '');
                        if (tombstones[`${tableName}:${docId}`]) continue;
                        if (item._deleted === true) continue;

                        if (keyField === 'id' && item.id !== undefined && item.id !== null) {
                            const numId = parseInt(item.id, 10);
                            if (!isNaN(numId)) item.id = numId;
                        }

                        item._syncedToCloud = true;
                        await localTable.put(item);
                        totalPulled++;
                    }
                } catch (dexErr) {
                    console.warn(`Dexie put error on ${tableName}:`, dexErr);
                } finally {
                    isSyncingFromCloud = false;
                }
            }
        } catch (globalErr) {
            console.warn('pullAllCloudRecords global error:', globalErr);
        }

        setSyncStatus('connected', 'Cloud Connected');
        if (totalPulled > 0) {
            debouncedUIRefresh();
        }
        if (!silent) {
            alert(`✅ Cloud Sync Complete!\nSuccessfully downloaded ${totalPulled} records from Supabase.`);
        }
        return totalPulled;
    };

    // 9. Full Cloud Migration: Upload all local Dexie data to Supabase
    window.uploadAllDataToSupabase = async function () {
        if (!window.isSupabaseConfigured()) {
            alert('Supabase is not configured yet!\nPlease enter your Supabase Project URL and Public Anon Key in Settings.');
            return;
        }

        if (!confirm('This will upload all existing sales, expenses, projects, 3D print jobs, inquiries, and settings to your Supabase Cloud Database.\n\nProceed?')) {
            return;
        }

        setSyncStatus('syncing', 'Uploading All Data...');
        let totalUploaded = 0;

        try {
            for (const { name: tableName, key: keyField } of SYNC_TABLES) {
                const table = window.db ? window.db[tableName] : null;
                if (!table) continue;

                const records = await table.toArray();
                if (!records || records.length === 0) continue;

                for (const item of records) {
                    const pk = item[keyField];
                    if (pk === undefined || pk === null) continue;
                    await pushChangeToCloud('set', tableName, pk, item);
                    totalUploaded++;
                }
            }

            setSyncStatus('connected', 'Cloud Synced');
            alert(`✅ Migration Complete!\nSuccessfully uploaded ${totalUploaded} records to Supabase Cloud.`);
        } catch (e) {
            console.error('Upload all error:', e);
            setSyncStatus('error', 'Upload Error');
            alert('Error uploading data: ' + (e.message || e));
        }
    };

    // 10. Test Connection
    window.testSupabaseConnection = async function () {
        const cfg = window.getSupabaseConfig();
        if (!cfg.url || !cfg.anonKey) {
            alert('Please fill in both Supabase Project URL and Public Anon Key.');
            return false;
        }

        setSyncStatus('syncing', 'Testing Connection...');
        try {
            const client = window.getSupabaseClient();
            if (!client) throw new Error('Supabase client could not be created.');

            // Test query on kutuss_settings
            const { error } = await client.from('kutuss_settings').select('id').limit(1);
            if (error) {
                // If table doesn't exist yet, warn the user to run SQL schema
                if (error.code === '42P01' || (error.message && error.message.includes('does not exist'))) {
                    throw new Error('Tables not found in Supabase!\nPlease open Supabase Dashboard -> SQL Editor and run the "supabase-schema.sql" script.');
                }
                throw error;
            }

            setSyncStatus('connected', 'Cloud Connected');
            alert('✅ Supabase Connection Successful!\nYour POS is connected to Supabase PostgreSQL Database with UNLIMITED reads.');
            return true;
        } catch (err) {
            console.error('Supabase connection test failed:', err);
            setSyncStatus('error', 'Connection Failed');
            alert('❌ Supabase Connection Failed:\n' + (err.message || err));
            return false;
        }
    };

    // 11. Expose Sync Helpers
    window.deleteCloudRecord = function (table, id, altId) {
        return pushChangeToCloud('delete', table, id, null, altId ? [altId] : []);
    };

    window.syncPrintOrderToSupabase = async function (orderData) {
        if (!orderData) return false;
        try {
            const pk = orderData.id || orderData.orderNo;
            await pushChangeToCloud('set', 'printOrders', pk, orderData, orderData.orderNo ? [orderData.orderNo] : []);
            return true;
        } catch (e) {
            console.warn('syncPrintOrderToSupabase error:', e);
            return false;
        }
    };

    // Initialize Engine
    function initSyncEngine() {
        interceptDexieMethods();
        if (window.isSupabaseConfigured()) {
            setSyncStatus('connected', 'Cloud Connected');
            startRealtimeListeners();
            setTimeout(async () => {
                if (navigator.onLine) {
                    await window.pullAllCloudRecords(true);
                    processOfflineQueue();
                    syncUnsyncedLocalRecords();
                }
            }, 800);
        } else {
            setSyncStatus('unconfigured', 'Connect Supabase');
        }
    }

    window.addEventListener('online', async () => {
        setSyncStatus('connected', 'Back Online');
        await window.pullAllCloudRecords(true);
        processOfflineQueue();
        syncUnsyncedLocalRecords();
    });

    window.addEventListener('offline', () => {
        setSyncStatus('offline', 'Working Offline (Saved Locally)');
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSyncEngine);
    } else {
        initSyncEngine();
    }

    window.KutussSync = {
        test: window.testSupabaseConnection,
        uploadAll: window.uploadAllDataToSupabase,
        pullAll: window.pullAllCloudRecords,
        syncUnsynced: syncUnsyncedLocalRecords,
        deleteRecord: window.deleteCloudRecord,
        setStatus: setSyncStatus
    };
})();
