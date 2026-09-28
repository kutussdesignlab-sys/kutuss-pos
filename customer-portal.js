/**
 * Kutuss POS - Customer Live Bill & Settlement Portal
 * ---------------------------------------------------
 * Provides a dedicated, public-facing, responsive statement view
 * for customers to view their project settlement, payments, and balance.
 * Activated via URL query parameters:
 *   ?settlement=<QUO_NO_OR_ID>  (e.g. ?settlement=QUO-01525 or ?settlement=107)
 *   ?bill=<REC_NO_OR_ID>        (e.g. ?bill=REC-0142)
 */

(function () {
    const COMPANY_INFO = {
        name: "KUTUSS DESIGN LAB (PVT) LTD",
        regNo: "PV – 00317028",
        address: "13/3 Temple Road, Pilanduwa, Warakapola",
        phone: "077-88 99 312",
        phoneIntl: "+94778899312",
        email: "kutussdesignlab@gmail.com",
        bankName: "Commercial Bank of Ceylon",
        bankBranch: "Warakapola Branch",
        accountName: "KUTUSS DESIGN LAB (PVT) LTD",
        accountNo: "1000872833"
    };

    window.currentCustomerPortalProject = null;
    window.currentCustomerPortalSale = null;

    function formatLKR(val) {
        const num = parseFloat(val) || 0;
        return `LKR ${num.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Check if current page is in Customer Portal Mode
    function getPortalParams() {
        const params = new URLSearchParams(window.location.search);
        const f3d = params.get('fusion3d');
        const vendor = params.get('vendor') || params.get('partner') || params.get('hub') || params.get('printportal');
        
        let printjob = params.get('printjob') || params.get('print') || params.get('3dp');
        let vendorPortal = null;

        if (f3d) {
            const f3dClean = f3d.trim().toLowerCase();
            if (f3dClean === 'all' || f3dClean === 'portal' || f3dClean === 'hub' || f3dClean === 'true' || f3dClean === '1' || f3dClean === '') {
                vendorPortal = 'Fusion 3D';
            } else if (f3dClean.startsWith('3dp') || /^\d+$/.test(f3dClean)) {
                printjob = f3d;
            } else {
                vendorPortal = f3d;
            }
        } else if (vendor) {
            vendorPortal = vendor;
        }

        return {
            settlement: params.get('settlement') || params.get('quo') || params.get('project') || params.get('proj') || params.get('quotation'),
            bill: params.get('bill') || params.get('sale') || params.get('receipt') || params.get('rec'),
            member: params.get('member') || params.get('memberbill') || params.get('team'),
            printjob,
            vendorPortal
        };
    }

    // Isolate customer portal mode visually
    function activatePortalMode() {
        document.documentElement.classList.add('portal-mode');
        document.body.classList.add('portal-mode');

        // Inject priority CSS to guarantee isolation from admin UI & fix print styles
        let style = document.getElementById('kutuss-portal-isolated-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'kutuss-portal-isolated-style';
            document.head.appendChild(style);
        }

        style.innerHTML = `
            html.portal-mode, body.portal-mode {
                background-color: #f8fafc !important;
                overflow-x: hidden !important;
            }
            body.portal-mode #sidebar,
            body.portal-mode #sidebar-overlay,
            body.portal-mode div.fixed.top-0,
            body.portal-mode div.fixed.bottom-0,
            body.portal-mode div[class*="fixed top-0"],
            body.portal-mode div[class*="fixed bottom-0"],
            body.portal-mode section:not(#customer-portal-section) {
                display: none !important;
            }
            body.portal-mode #main-content {
                display: block !important;
                margin: 0 auto !important;
                padding: 16px !important;
                width: 100% !important;
                max-width: 960px !important;
                min-height: 100vh !important;
                height: auto !important;
                overflow: visible !important;
                background: transparent !important;
            }
            body.portal-mode #customer-portal-section {
                display: flex !important;
                width: 100% !important;
                margin: 0 auto !important;
            }

            /* PRINT OVERRIDES: PREVENT BLANK SCREEN */
            @media print {
                body.portal-mode {
                    background: white !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                body.portal-mode * {
                    visibility: visible !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                body.portal-mode main,
                body.portal-mode #main-content {
                    display: block !important;
                    visibility: visible !important;
                    position: static !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    max-width: 100% !important;
                    width: 100% !important;
                    height: auto !important;
                    overflow: visible !important;
                }
                body.portal-mode #customer-portal-section,
                body.portal-mode #customer-portal-section * {
                    visibility: visible !important;
                }
                body.portal-mode .print-hidden,
                body.portal-mode button,
                body.portal-mode a,
                body.portal-mode #sidebar,
                body.portal-mode #sidebar-overlay,
                body.portal-mode header,
                body.portal-mode nav,
                body.portal-mode div.fixed,
                body.portal-mode section:not(#customer-portal-section) {
                    display: none !important;
                    visibility: hidden !important;
                }
            }
        `;

        // Hide admin navigation elements explicitly
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';

        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) overlay.style.display = 'none';

        document.querySelectorAll('div.fixed.top-0, div.fixed.bottom-0').forEach(el => {
            el.style.display = 'none';
        });

        // Hide all admin sections
        document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));

        // Show customer portal section
        const portal = document.getElementById('customer-portal-section');
        if (portal) portal.classList.remove('hidden');
    }

    // Helper: Fetch all records from a Supabase table
    async function fetchAllDocs(collectionId) {
        const tbl = (collectionId.startsWith('kutuss_') ? collectionId : `kutuss_${collectionId}`).toLowerCase();
        const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
        if (client) {
            try {
                const { data, error } = await client.from(tbl).select('*');
                if (!error && Array.isArray(data)) {
                    return data.map(row => {
                        const item = (row.data && typeof row.data === 'object') ? { ...row.data } : {};
                        if (!item.id && row.id) item.id = row.id;
                        return item;
                    });
                }
            } catch (e) {
                console.warn(`Supabase client fetchAllDocs error on ${tbl}:`, e);
            }
        }

        // Direct PostgREST API Fallback
        const cfg = typeof window.getSupabaseConfig === 'function' ? window.getSupabaseConfig() : null;
        if (cfg && cfg.url && cfg.anonKey) {
            try {
                const res = await fetch(`${cfg.url}/rest/v1/${tbl}?select=*`, {
                    headers: {
                        'apikey': cfg.anonKey,
                        'Authorization': `Bearer ${cfg.anonKey}`
                    }
                });
                if (res.ok) {
                    const rows = await res.json();
                    if (Array.isArray(rows)) {
                        return rows.map(row => {
                            const item = (row.data && typeof row.data === 'object') ? { ...row.data } : {};
                            if (!item.id && row.id) item.id = row.id;
                            return item;
                        });
                    }
                }
            } catch (e) {
                console.warn(`REST fetchAllDocs error on ${tbl}:`, e);
            }
        }
        return [];
    }

    // Fetch data from Supabase Cloud (via Client or PostgREST REST API) or local Dexie
    async function fetchRecord(type, identifier) {
        const idClean = String(identifier || '').trim();
        if (!idClean) return null;

        // Check if marked as deleted in local tombstones
        const table = type === 'project' ? 'projects' : (type === 'printOrder' ? 'printOrders' : 'sales');
        try {
            const tombstones = JSON.parse(localStorage.getItem('kutuss_deleted_records') || '{}');
            if (tombstones[`${table}:${idClean}`]) return null;
        } catch (e) { }

        const tbl = (type === 'project' ? 'kutuss_projects' : (type === 'printOrder' ? 'kutuss_printorders' : 'kutuss_sales')).toLowerCase();
        const fieldName = type === 'project' ? 'projectID' : (type === 'printOrder' ? 'orderNo' : 'receiptNo');

        const candidates = [idClean];
        if (idClean.toUpperCase() !== idClean) candidates.push(idClean.toUpperCase());

        if (type === 'project') {
            const numMatch = idClean.match(/\d+/);
            if (numMatch) {
                const num = numMatch[0];
                candidates.push(`QUO-${num}`);
                candidates.push(`QUO-${num.padStart(4, '0')}`);
                candidates.push(String(parseInt(num, 10)));
            }
        } else if (type === 'sale') {
            candidates.push(idClean.replace(/-/g, ' '));
            candidates.push(idClean.replace(/\s+/g, '-'));
            const numMatch = idClean.match(/\d+/);
            if (numMatch) {
                const num = numMatch[0];
                candidates.push(`REC ${num.padStart(4, '0')}`);
                candidates.push(`REC-${num.padStart(4, '0')}`);
                candidates.push(String(parseInt(num, 10)));
            }
        } else if (type === 'printOrder') {
            candidates.push(idClean.replace(/-/g, ' '));
            candidates.push(idClean.replace(/\s+/g, '-'));
            const numMatch = idClean.match(/\d+/);
            if (numMatch) {
                const num = numMatch[0];
                candidates.push(`3DP-${num.padStart(4, '0')}`);
                candidates.push(`3DP-${num}`);
                candidates.push(String(parseInt(num, 10)));
            }
        }
        const uniqueCands = [...new Set(candidates)];

        // 1. Supabase Client lookup
        const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
        if (client) {
            for (const cand of uniqueCands) {
                try {
                    // Check by table primary key id
                    const { data: byIdData } = await client.from(tbl).select('*').eq('id', cand).limit(1);
                    if (Array.isArray(byIdData) && byIdData.length > 0 && byIdData[0].data) {
                        const item = { ...byIdData[0].data };
                        if (!item.id && byIdData[0].id) item.id = byIdData[0].id;
                        return item;
                    }
                    // Check by JSON field (projectID, orderNo, receiptNo)
                    const { data: byFieldData } = await client.from(tbl).select('*').filter(`data->>${fieldName}`, 'eq', cand).limit(1);
                    if (Array.isArray(byFieldData) && byFieldData.length > 0 && byFieldData[0].data) {
                        const item = { ...byFieldData[0].data };
                        if (!item.id && byFieldData[0].id) item.id = byFieldData[0].id;
                        return item;
                    }
                } catch (e) {
                    console.warn(`Supabase client lookup warning for ${cand}:`, e);
                }
            }
        }

        // 2. Direct PostgREST REST API fallback
        const cfg = typeof window.getSupabaseConfig === 'function' ? window.getSupabaseConfig() : null;
        if (cfg && cfg.url && cfg.anonKey) {
            const headers = { 'apikey': cfg.anonKey, 'Authorization': `Bearer ${cfg.anonKey}` };
            for (const cand of uniqueCands) {
                try {
                    let res = await fetch(`${cfg.url}/rest/v1/${tbl}?id=eq.${encodeURIComponent(cand)}&select=*&limit=1`, { headers });
                    if (res.ok) {
                        const rows = await res.json();
                        if (Array.isArray(rows) && rows.length > 0 && rows[0].data) {
                            const item = { ...rows[0].data };
                            if (!item.id && rows[0].id) item.id = rows[0].id;
                            return item;
                        }
                    }
                    res = await fetch(`${cfg.url}/rest/v1/${tbl}?data->>${fieldName}=eq.${encodeURIComponent(cand)}&select=*&limit=1`, { headers });
                    if (res.ok) {
                        const rows = await res.json();
                        if (Array.isArray(rows) && rows.length > 0 && rows[0].data) {
                            const item = { ...rows[0].data };
                            if (!item.id && rows[0].id) item.id = rows[0].id;
                            return item;
                        }
                    }
                } catch (e) {
                    console.warn(`PostgREST lookup warning for ${cand}:`, e);
                }
            }
        }

        // 3. Local Dexie Database Fallback
        if (window.db) {
            try {
                const tableObj = window.db[table];
                if (tableObj) {
                    const numId = parseInt(idClean, 10);
                    if (!isNaN(numId)) {
                        const byId = await tableObj.get(numId);
                        if (byId) return byId;
                    }
                    const allRecs = await tableObj.toArray();
                    const found = allRecs.find(r => {
                        const val = r[fieldName];
                        return (val && uniqueCands.includes(String(val))) || uniqueCands.includes(String(r.id));
                    });
                    if (found) return found;
                }
            } catch (dexErr) {
                console.warn('Dexie lookup error:', dexErr);
            }
        }

        return null;
    }

    // Copy to clipboard helper with button visual feedback
    window.copyBankAccToClipboard = function (btnElement) {
        const text = COMPANY_INFO.accountNo;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                if (btnElement) {
                    const originalHtml = btnElement.innerHTML;
                    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    btnElement.classList.add('bg-emerald-600', 'text-white');
                    setTimeout(() => {
                        btnElement.innerHTML = originalHtml;
                        btnElement.classList.remove('bg-emerald-600', 'text-white');
                    }, 2000);
                }
            });
        } else {
            prompt('Bank Account Number:', text);
        }
    };

    // Download Official Material Invoice PDF directly
    window.downloadCustomerMaterialInvoicePDF = async function (btnElement) {
        const proj = window.currentCustomerPortalProject;
        if (!proj) {
            alert("Project data is still loading. Please wait a moment.");
            return;
        }

        if (proj.isFullQuotation) {
            alert("This is a Full Quotation without a separate material invoice.");
            return;
        }

        if (typeof window.downloadCostSheetPDF === 'function') {
            await window.downloadCostSheetPDF(proj, btnElement);
        } else {
            window.print();
        }
    };

    // Render Project Settlement View
    function renderProjectSettlement(proj) {
        window.currentCustomerPortalProject = proj;

        const portal = document.getElementById('customer-portal-section');
        if (!portal) return;

        const serviceRevenue = parseFloat(proj.budget) || 0;
        let componentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
        if (proj.isFullQuotation) componentCost = 0;
        const discount = parseFloat(proj.discount) || 0;
        const totalAmount = (serviceRevenue + componentCost) - discount;

        const payments = proj.clientPayments || [];
        const totalPaid = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        const balance = Math.max(0, totalAmount - totalPaid);

        const quoNo = proj.projectID || `QUO-${String(proj.id).padStart(4, '0')}`;
        const issueDate = proj.registrationDate || proj.startDate || new Date().toISOString().split('T')[0];

        // Status badge
        let statusBadge = '';
        if (balance <= 0.01) {
            statusBadge = '<span class="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-circle-check text-emerald-600"></i> PAID IN FULL</span>';
        } else if (totalPaid > 0) {
            statusBadge = '<span class="px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-clock text-amber-600"></i> PARTIALLY PAID</span>';
        } else {
            statusBadge = '<span class="px-3.5 py-1.5 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-300 flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-hourglass-start text-red-600"></i> PAYMENT PENDING</span>';
        }

        // Generate payments rows
        let paymentsHtml = '';
        if (payments.length > 0) {
            paymentsHtml = payments.map((p, idx) => `
                <tr class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td class="px-4 py-3.5 text-xs text-gray-500 font-mono">#${idx + 1}</td>
                    <td class="px-4 py-3.5 text-xs font-medium text-gray-700">${p.date || '-'}</td>
                    <td class="px-4 py-3.5 text-xs font-mono font-bold text-gray-800">${p.receiptNo || 'REC-' + (idx + 1)}</td>
                    <td class="px-4 py-3.5 text-xs text-gray-600">${p.paymentMethod || p.method || 'Bank Transfer'}</td>
                    <td class="px-4 py-3.5 text-xs font-mono font-bold text-right text-emerald-700">${formatLKR(p.amount)}</td>
                    <td class="px-4 py-3.5 text-xs text-center"><span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Verified</span></td>
                </tr>
            `).join('');
        } else {
            paymentsHtml = `<tr><td colspan="6" class="px-4 py-8 text-center text-xs text-gray-400">No advance or installment payments recorded yet.</td></tr>`;
        }

        const waText = encodeURIComponent(
            `Hello Kutuss Design Lab, regarding my project settlement for ${proj.name} (${quoNo}). Outstanding balance: ${formatLKR(balance)}. I am sharing the payment slip.`
        );

        portal.innerHTML = `
            <div id="customer-statement-card" class="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">
                <!-- Top Brand Banner -->
                <div class="bg-gradient-to-r from-brand-600 to-brand-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-white text-brand-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
                                K
                            </div>
                            <div>
                                <h1 class="text-xl sm:text-2xl font-black tracking-tight">${COMPANY_INFO.name}</h1>
                                <p class="text-xs text-brand-100">Reg No: ${COMPANY_INFO.regNo}</p>
                            </div>
                        </div>
                        <p class="text-xs text-brand-100 mt-2 max-w-md">${COMPANY_INFO.address}</p>
                        <p class="text-xs text-brand-200 mt-0.5">Hotline: ${COMPANY_INFO.phone} | ${COMPANY_INFO.email}</p>
                    </div>
                    <div class="sm:text-right">
                        <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-wider text-brand-50 mb-2">
                            Settlement Statement
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-mono font-black tracking-tight">${quoNo}</h2>
                        <p class="text-xs text-brand-100">Date: ${issueDate}</p>
                    </div>
                </div>

                <!-- Customer & Project Info -->
                <div class="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Billed To (Customer)</p>
                            <h3 class="text-lg font-bold text-gray-900 mt-0.5">${proj.customerName || 'Valued Customer'}</h3>
                            ${proj.customerPhone ? `<p class="text-xs text-gray-600 font-mono mt-0.5"><i class="fa-solid fa-phone text-[10px] mr-1 text-gray-400"></i> ${proj.customerPhone}</p>` : ''}
                        </div>
                        <div class="sm:text-right">
                            <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Project / Job Description</p>
                            <h3 class="text-lg font-bold text-gray-900 mt-0.5">${proj.name || 'Custom Order'}</h3>
                            <div class="mt-2 flex sm:justify-end">${statusBadge}</div>
                        </div>
                    </div>
                </div>

                <!-- Financial Balance Summary Cards -->
                <div class="p-6 sm:p-8">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <!-- Total -->
                        <div class="bg-gray-50 p-5 rounded-2xl border border-gray-200/80">
                            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <i class="fa-solid fa-file-invoice text-gray-400"></i> Total Project Value
                            </p>
                            <p class="text-xl sm:text-2xl font-black text-gray-800 font-mono mt-2">${formatLKR(totalAmount)}</p>
                        </div>
                        <!-- Paid -->
                        <div class="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                            <p class="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                                <i class="fa-solid fa-circle-check text-emerald-600"></i> Total Paid to Date
                            </p>
                            <p class="text-xl sm:text-2xl font-black text-emerald-700 font-mono mt-2">${formatLKR(totalPaid)}</p>
                        </div>
                        <!-- Balance -->
                        <div class="${balance <= 0.01 ? 'bg-gray-50 border-gray-200' : 'bg-red-50/80 border-red-200'} p-5 rounded-2xl border">
                            <p class="text-xs font-bold ${balance <= 0.01 ? 'text-gray-500' : 'text-red-700'} uppercase tracking-wider flex items-center gap-1.5">
                                <i class="fa-solid fa-scale-balanced ${balance <= 0.01 ? 'text-gray-400' : 'text-red-500'}"></i> Outstanding Balance
                            </p>
                            <p class="text-xl sm:text-2xl font-black ${balance <= 0.01 ? 'text-gray-400 line-through' : 'text-red-600'} font-mono mt-2">
                                ${formatLKR(balance)}
                            </p>
                        </div>
                    </div>

                    <!-- Payment History / Installments Table -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-receipt text-brand-600"></i> Verified Receipts & Payments
                            </h4>
                            <span class="text-xs text-gray-500 font-medium">${payments.length} verified payment(s)</span>
                        </div>
                        <div class="overflow-x-auto rounded-2xl border border-gray-200">
                            <table class="w-full text-left">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr class="text-[11px] font-bold uppercase text-gray-500">
                                        <th class="px-4 py-3">#</th>
                                        <th class="px-4 py-3">Date</th>
                                        <th class="px-4 py-3">Receipt No</th>
                                        <th class="px-4 py-3">Method</th>
                                        <th class="px-4 py-3 text-right">Amount (LKR)</th>
                                        <th class="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${paymentsHtml}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Bank Details for Direct Transfer (If balance remaining) -->
                    ${balance > 0.01 ? `
                    <div class="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 mb-8">
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                            <h4 class="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-building-columns text-amber-600"></i> Bank Transfer Payment Details
                            </h4>
                            <span class="text-[11px] font-medium text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">Official Company Account</span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700 bg-white/70 p-4 rounded-xl border border-amber-200/60">
                            <div>
                                <p class="text-gray-500 text-[11px]">Bank & Branch:</p>
                                <p class="font-bold text-gray-900 text-sm">${COMPANY_INFO.bankName}</p>
                                <p class="text-xs text-gray-600">${COMPANY_INFO.bankBranch}</p>
                            </div>
                            <div>
                                <p class="text-gray-500 text-[11px]">Account Name:</p>
                                <p class="font-bold text-gray-900 text-sm">${COMPANY_INFO.accountName}</p>
                            </div>
                            <div class="sm:col-span-2 pt-2 border-t border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                <div>
                                    <p class="text-gray-500 text-[11px]">Account Number:</p>
                                    <p class="font-mono font-black text-gray-900 text-base tracking-wider">${COMPANY_INFO.accountNo}</p>
                                </div>
                                <button onclick="window.copyBankAccToClipboard(this)" 
                                    class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer">
                                    <i class="fa-solid fa-copy"></i> Copy Account No
                                </button>
                            </div>
                        </div>
                        <p class="text-[11px] text-amber-900 mt-3 pt-2 border-t border-amber-200/60 leading-relaxed">
                            <strong>Note:</strong> When completing the transfer via mobile/online banking, please include quotation reference <strong>${quoNo}</strong> in the remarks and share the transfer slip via WhatsApp for instant verification.
                        </p>
                    </div>
                    ` : ''}

                    <!-- Actions -->
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-gray-100 print-hidden">
                        <div class="flex flex-col sm:flex-row gap-2.5">
                            ${!proj.isFullQuotation ? `
                            <!-- Download Official Material Invoice PDF -->
                            <button onclick="window.downloadCustomerMaterialInvoicePDF(this)" 
                                class="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all cursor-pointer">
                                <i class="fa-solid fa-file-invoice text-sm"></i> Download Material Invoice (PDF)
                            </button>
                            ` : ''}
                            ${(proj.driveLink || proj.googleDriveLink) ? `
                            <!-- Google Drive Project Files -->
                            <a href="${(proj.driveLink || proj.googleDriveLink).startsWith('http') ? (proj.driveLink || proj.googleDriveLink) : 'https://' + (proj.driveLink || proj.googleDriveLink)}" target="_blank" rel="noopener noreferrer"
                                class="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer">
                                <i class="fa-brands fa-google-drive text-base"></i> Google Drive Files
                            </a>
                            ` : ''}
                            <!-- Print / Save Statement -->
                            <button onclick="window.print()" 
                                class="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <i class="fa-solid fa-print"></i> Print Statement
                            </button>
                        </div>
                        <!-- WhatsApp Slip Contact Button -->
                        <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}?text=${waText}" target="_blank"
                            class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all">
                            <i class="fa-brands fa-whatsapp text-lg"></i> Send Slip / Contact on WhatsApp
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
                    Kutuss Design Lab (Pvt) Ltd • Verified Digital Statement • Live Cloud Connected
                </div>
            </div>
        `;
    }

    // Render Single Sale Receipt
    function renderSaleBill(sale) {
        window.currentCustomerPortalSale = sale;

        const portal = document.getElementById('customer-portal-section');
        if (!portal) return;

        const amount = parseFloat(sale.amount) || 0;
        const status = (sale.status || 'PAID').toUpperCase();
        const isPaid = status === 'PAID';

        portal.innerHTML = `
            <div class="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl print:shadow-none print:border-none print:rounded-none">
                <div class="bg-gradient-to-r from-brand-600 to-brand-800 text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-black">${COMPANY_INFO.name}</h2>
                        <p class="text-xs text-brand-100">Reg: ${COMPANY_INFO.regNo} | Tel: ${COMPANY_INFO.phone}</p>
                    </div>
                    <div class="text-right">
                        <span class="px-2.5 py-1 rounded-full text-xs font-black ${isPaid ? 'bg-emerald-400 text-emerald-950' : 'bg-red-400 text-red-950'}">
                            ${status}
                        </span>
                    </div>
                </div>
                <div class="p-6 sm:p-8">
                    <div class="flex justify-between border-b border-gray-100 pb-4 mb-6">
                        <div>
                            <p class="text-xs text-gray-400 font-bold uppercase">Receipt No</p>
                            <p class="text-lg font-black font-mono text-gray-800">${sale.receiptNo || 'REC-000'}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-gray-400 font-bold uppercase">Date</p>
                            <p class="text-sm font-bold text-gray-700">${sale.date || '-'}</p>
                        </div>
                    </div>
                    <div class="mb-6">
                        <p class="text-xs text-gray-400 font-bold uppercase">Customer Name</p>
                        <p class="text-lg font-bold text-gray-800">${sale.customerName || 'Valued Customer'}</p>
                    </div>
                    <div class="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center mb-6">
                        <p class="text-xs font-bold text-brand-600 uppercase tracking-wider">Amount Received</p>
                        <p class="text-3xl font-black text-brand-900 font-mono mt-2">${formatLKR(amount)}</p>
                        <p class="text-xs text-brand-500 mt-1 font-medium">Payment Method: ${sale.paymentMethod || 'Cash'}</p>
                    </div>
                    <div class="flex gap-3 justify-center print-hidden">
                        <button onclick="window.print()" class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer">
                            <i class="fa-solid fa-print mr-1.5"></i> Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ===================================================================
    // MEMBER PORTAL - Fetch & Render Team Member Payment Summary
    // ===================================================================

    // Fetch team member data from Firestore by name or id
    async function fetchMemberRecord(identifier) {
        const idClean = String(identifier || '').trim();
        if (!idClean) return null;

        const memberName = decodeURIComponent(idClean).trim();

        const config = (typeof window.getFirebaseConfig === 'function' ? window.getFirebaseConfig() : null) || window.DEFAULT_FIREBASE_CONFIG || {
            projectId: "kutusspos",
            apiKey: "AIzaSyDADpmeJzifalvslJ6zQEyQ2Zz_iYBkPJ8"
        };
        const projectId = config.projectId;
        const apiKey = config.apiKey;

        let member = null;
        let memberProjectPayments = [];
        let salaryExpenses = [];

        if (projectId && apiKey) {
            // 1. Fetch team members to locate member profile
            const allMembers = await fetchAllDocs('kutuss_teamMembers');
            member = allMembers.find(m =>
                (m.name && m.name.toLowerCase().trim() === memberName.toLowerCase()) ||
                (m.id && String(m.id) === memberName)
            ) || null;

            // 2. Fetch memberProjectPayments — ONLY what is explicitly recorded in this table!
            const allPayments = await fetchAllDocs('kutuss_memberProjectPayments');
            memberProjectPayments = allPayments.filter(p =>
                (member && member.id && String(p.memberId) === String(member.id)) ||
                (p.memberName && p.memberName.toLowerCase().trim() === memberName.toLowerCase()) ||
                (member && member.name && p.memberName && p.memberName.toLowerCase().trim() === member.name.toLowerCase().trim())
            );

            // 3. Fetch salary expenses for this member
            const allExpenses = await fetchAllDocs('kutuss_expenses');
            salaryExpenses = allExpenses.filter(e =>
                e.personName &&
                (e.personName.toLowerCase().trim() === memberName.toLowerCase() ||
                 (member && member.name && e.personName.toLowerCase().trim() === member.name.toLowerCase().trim())) &&
                (e.category === 'Salary' || e.category === 'Salary Advance')
            );
        }

        // Dexie fallback (for local admin device)
        if ((!member || memberProjectPayments.length === 0) && window.db) {
            try {
                if (window.db.teamMembers) {
                    const localMembers = await window.db.teamMembers.toArray();
                    const found = localMembers.find(m =>
                        (m.name && m.name.toLowerCase().trim() === memberName.toLowerCase()) ||
                        (m.id && String(m.id) === memberName)
                    );
                    if (found) member = found;
                }
                if (window.db.memberProjectPayments) {
                    const localPayments = await window.db.memberProjectPayments.toArray();
                    const matched = localPayments.filter(p =>
                        (member && member.id && p.memberId === member.id) ||
                        (p.memberName && p.memberName.toLowerCase().trim() === memberName.toLowerCase()) ||
                        (member && member.name && p.memberName && p.memberName.toLowerCase().trim() === member.name.toLowerCase().trim())
                    );
                    if (matched.length > 0) memberProjectPayments = matched;
                }
                if (window.db.expenses) {
                    const localExpenses = await window.db.expenses.where('category').anyOf(['Salary', 'Salary Advance']).toArray();
                    const matchedExp = localExpenses.filter(e =>
                        e.personName &&
                        (e.personName.toLowerCase().trim() === memberName.toLowerCase() ||
                         (member && member.name && e.personName.toLowerCase().trim() === member.name.toLowerCase().trim()))
                    );
                    if (matchedExp.length > 0) salaryExpenses = matchedExp;
                }
            } catch (dexErr) {
                console.warn('Dexie fallback error:', dexErr);
            }
        }

        // Sort payments by date descending
        memberProjectPayments.sort((a, b) => {
            const da = new Date(b.date || 0), db2 = new Date(a.date || 0);
            return isNaN(da) ? 1 : isNaN(db2) ? -1 : da - db2;
        });

        if (!member && memberProjectPayments.length === 0) return null;
        if (!member) member = { name: memberName, role: 'Team Member', phone: '' };

        return { member, memberProjectPayments, salaryExpenses };
    }

    // Render member payment summary portal — EXACTLY matching admin "Manage Payments" modal
    function renderMemberPortal(data) {
        const { member: m, memberProjectPayments: payments, salaryExpenses: expenses = [] } = data;
        const portal = document.getElementById('customer-portal-section');
        if (!portal) return;

        let totalAgreed = 0, totalPaid = 0;
        payments.forEach(p => {
            totalAgreed += parseFloat(p.agreedAmount || p.agreed) || 0;
            totalPaid += parseFloat(p.paidAmount || p.paid) || 0;
        });
        const totalPending = Math.max(0, totalAgreed - totalPaid);
        const totalSalary = expenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
        const overallPct = totalAgreed > 0 ? Math.min(100, Math.round((totalPaid / totalAgreed) * 100)) : 0;
        const isOverallSettled = totalPending <= 0.01 && totalAgreed > 0;

        const roleColors = {
            'Designer': '#8b5cf6', 'Developer': '#3b82f6', 'Technician': '#f97316',
            'Photographer': '#ec4899', 'Editor': '#6366f1', 'Manager': '#10b981'
        };
        const roleColor = roleColors[m.role] || '#0284c7';

        // Table Rows (Desktop) & Cards (Mobile)
        let tableRowsHtml = '';
        let mobileCardsHtml = '';

        if (payments.length === 0) {
            tableRowsHtml = `<tr><td colspan="8" class="px-4 py-8 text-center text-gray-400">No project allocations recorded yet.</td></tr>`;
            mobileCardsHtml = `<div class="bg-gray-50 rounded-2xl p-6 text-center text-xs text-gray-400 border border-gray-100">No project allocations recorded yet.</div>`;
        } else {
            payments.forEach((p, idx) => {
                const agreed = parseFloat(p.agreedAmount || p.agreed) || 0;
                const paid = parseFloat(p.paidAmount || p.paid) || 0;
                const pending = Math.max(0, agreed - paid);
                const isSettled = pending <= 0.01;
                const pct = agreed > 0 ? Math.min(100, Math.round((paid / agreed) * 100)) : 0;

                // Desktop Table Row with animated Payment Fill Progress Bar
                tableRowsHtml += `
                <tr class="hover:bg-gray-50/80 border-b border-gray-100 transition-colors">
                    <td class="px-4 py-3.5">
                        <div class="font-bold text-gray-900 text-xs sm:text-sm">${p.projectName || 'Project'}</div>
                    </td>
                    <td class="px-4 py-3.5 font-mono text-xs text-gray-500">${p.quoNumber || '-'}</td>
                    <td class="px-4 py-3.5 text-right font-mono text-xs sm:text-sm text-gray-800 font-bold">LKR ${agreed.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3.5 text-right font-mono text-xs sm:text-sm text-emerald-600 font-bold">LKR ${paid.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3.5 text-right font-mono text-xs sm:text-sm ${pending > 0 ? 'text-rose-600 font-black' : 'text-gray-400'}">LKR ${pending.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3.5 text-xs text-gray-500 font-mono text-center">${p.date || '-'}</td>
                    <td class="px-4 py-3.5 text-xs text-gray-500">${p.notes || '-'}</td>
                    <td class="px-4 py-3.5 text-center min-w-[130px]">
                        <div class="flex items-center justify-between text-[11px] font-bold mb-1">
                            <span class="${isSettled ? 'text-emerald-700' : pct > 0 ? 'text-emerald-600' : 'text-gray-400'} font-mono">${pct}%</span>
                            <span class="text-[9px] font-black uppercase tracking-wider ${isSettled ? 'text-emerald-600' : pct > 0 ? 'text-teal-600' : 'text-amber-600'}">
                                ${isSettled ? '✓ SETTLED' : pct > 0 ? 'PARTIAL' : 'PENDING'}
                            </span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner p-0.5">
                            <div class="h-full rounded-full transition-all duration-700 ${isSettled ? 'bg-emerald-500' : pct > 0 ? 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500' : 'bg-gray-200'}" style="width: ${pct}%"></div>
                        </div>
                    </td>
                </tr>`;

                // Mobile Card View with Payment Fill Progress Bar
                mobileCardsHtml += `
                <div class="bg-white rounded-2xl border ${isSettled ? 'border-emerald-100' : 'border-gray-100'} p-4 shadow-sm space-y-2.5">
                    <div class="flex items-start justify-between">
                        <div>
                            <p class="font-bold text-gray-900 text-sm">${p.projectName || 'Project'}</p>
                            ${p.quoNumber ? `<p class="text-xs text-gray-400 font-mono mt-0.5">${p.quoNumber}</p>` : ''}
                        </div>
                        <span class="text-[10px] font-black px-2 py-0.5 rounded ${isSettled ? 'bg-emerald-100 text-emerald-700' : pct > 0 ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                            ${isSettled ? '✓ SETTLED' : `${pct}% PAID`}
                        </span>
                    </div>

                    <div class="grid grid-cols-3 gap-2 text-center py-2 bg-gray-50 rounded-xl">
                        <div>
                            <p class="text-[9px] text-gray-400 font-bold uppercase">Agreed</p>
                            <p class="font-bold text-gray-800 text-xs font-mono">LKR ${agreed.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</p>
                        </div>
                        <div>
                            <p class="text-[9px] text-emerald-600 font-bold uppercase">Paid</p>
                            <p class="font-bold text-emerald-600 text-xs font-mono">LKR ${paid.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</p>
                        </div>
                        <div>
                            <p class="text-[9px] text-rose-500 font-bold uppercase">Pending</p>
                            <p class="font-bold ${pending > 0 ? 'text-rose-600' : 'text-gray-400'} text-xs font-mono">LKR ${pending.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</p>
                        </div>
                    </div>

                    <!-- Payment Fill Bar -->
                    <div class="pt-1">
                        <div class="flex justify-between items-center text-[11px] font-bold mb-1">
                            <span class="text-gray-500 flex items-center gap-1">
                                <i class="fa-solid fa-chart-line text-emerald-500 text-[10px]"></i> Payment Fill
                            </span>
                            <span class="font-mono font-black ${isSettled ? 'text-emerald-600' : pct > 0 ? 'text-teal-600' : 'text-gray-400'}">
                                ${pct}%
                            </span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner p-0.5">
                            <div class="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 transition-all duration-700" style="width: ${pct}%"></div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
                        <span><i class="fa-regular fa-calendar mr-1"></i>${p.date || '-'}</span>
                        ${p.notes ? `<span>${p.notes}</span>` : ''}
                    </div>
                </div>`;
            });
        }

        // Salary Rows
        let salaryRowsHtml = '';
        if (expenses.length > 0) {
            salaryRowsHtml = expenses.map(e => `
                <tr class="hover:bg-blue-50/50 border-b border-gray-100">
                    <td class="px-4 py-3">
                        <div class="font-semibold text-gray-800 text-xs sm:text-sm">${e.category}</div>
                        <div class="text-[11px] text-gray-400">${e.description || '-'}</div>
                    </td>
                    <td class="px-4 py-3 text-right font-mono text-xs sm:text-sm text-blue-700 font-bold">LKR ${parseFloat(e.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-xs text-gray-500 font-mono text-center">${e.date || '-'}</td>
                </tr>`).join('');
        }

        portal.innerHTML = `
        <div class="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
            <!-- Header Brand Bar -->
            <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center shadow-md">
                        <i class="fa-solid fa-k text-white font-black text-xl"></i>
                    </div>
                    <div>
                        <h1 class="font-black text-gray-900 text-base sm:text-lg leading-tight">${COMPANY_INFO.name}</h1>
                        <p class="text-xs text-gray-400 font-medium">${COMPANY_INFO.phone} · ${COMPANY_INFO.email}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                        <i class="fa-solid fa-id-badge mr-1"></i> Member Statement
                    </span>
                    <button onclick="window.print()" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg transition-colors print-hidden">
                        <i class="fa-solid fa-print mr-1"></i> Print
                    </button>
                </div>
            </div>

            <!-- Member Title Card -->
            <div class="bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-black border border-white/30 shadow-inner">
                        ${(m.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-black tracking-tight">${m.name || 'Team Member'}</h2>
                        <div class="flex flex-wrap items-center gap-2 mt-1.5">
                            <span class="inline-block text-xs font-bold px-3 py-0.5 rounded-full bg-white/25 text-white border border-white/30">
                                ${m.role || 'Team Member'}
                            </span>
                            ${m.phone ? `<span class="text-xs text-sky-100 flex items-center gap-1"><i class="fa-solid fa-phone text-[10px]"></i> ${m.phone}</span>` : ''}
                            ${m.joinDate ? `<span class="text-xs text-sky-100 flex items-center gap-1"><i class="fa-solid fa-calendar text-[10px]"></i> Joined: ${m.joinDate}</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top 4 Summary Cards (Exact mirror of admin modal) -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                    <p class="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">TOTAL AGREED</p>
                    <p class="font-mono font-black text-gray-900 text-base sm:text-xl mt-1">LKR ${totalAgreed.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 shadow-sm text-center">
                    <p class="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider">PAID (PROJECTS)</p>
                    <p class="font-mono font-black text-emerald-600 text-base sm:text-xl mt-1">LKR ${totalPaid.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="bg-rose-50/60 rounded-2xl p-4 border border-rose-100 shadow-sm text-center">
                    <p class="text-[10px] sm:text-xs font-bold text-rose-600 uppercase tracking-wider">PENDING</p>
                    <p class="font-mono font-black ${totalPending > 0 ? 'text-rose-600' : 'text-gray-400'} text-base sm:text-xl mt-1">LKR ${totalPending.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 shadow-sm text-center">
                    <p class="text-[10px] sm:text-xs font-bold text-blue-700 uppercase tracking-wider">SALARY PAID</p>
                    <p class="font-mono font-black text-blue-700 text-base sm:text-xl mt-1">LKR ${totalSalary.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>

            <!-- Overall Settlement Progress Graphic Bar -->
            <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-2.5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">
                            <i class="fa-solid fa-chart-pie"></i>
                        </div>
                        <div>
                            <p class="text-xs font-black text-gray-800 uppercase tracking-wider">Overall Settlement Progress</p>
                            <p class="text-[11px] text-gray-400">Total received across all projects</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-lg font-black text-emerald-600 font-mono">${overallPct}%</span>
                        <span class="text-[10px] font-bold text-gray-400 block">${isOverallSettled ? '✓ Fully Settled' : 'Payment in Progress'}</span>
                    </div>
                </div>
                <!-- Visual Fill Bar -->
                <div class="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden shadow-inner p-0.5">
                    <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-700 shadow-sm" style="width: ${overallPct}%"></div>
                </div>
                <div class="flex justify-between items-center text-[10px] sm:text-[11px] text-gray-500 font-mono font-medium">
                    <span>Paid: <strong class="text-emerald-600 font-bold">LKR ${totalPaid.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</strong></span>
                    <span>Pending: <strong class="${totalPending > 0 ? 'text-rose-600' : 'text-gray-500'} font-bold">LKR ${totalPending.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</strong></span>
                </div>
            </div>

            <!-- Section 1: PROJECT ALLOCATIONS & PAYMENTS -->
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-diagram-project text-sky-600"></i>
                        <h3 class="font-black text-gray-800 text-xs sm:text-sm uppercase tracking-wider">PROJECT ALLOCATIONS & PAYMENTS</h3>
                    </div>
                    <span class="text-xs font-bold text-gray-400">${payments.length} Records</span>
                </div>

                <!-- Desktop Table View -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50/70 border-b border-gray-100 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                                <th class="px-4 py-3">PROJECT</th>
                                <th class="px-4 py-3">QUO #</th>
                                <th class="px-4 py-3 text-right">AGREED</th>
                                <th class="px-4 py-3 text-right">PAID</th>
                                <th class="px-4 py-3 text-right">PENDING</th>
                                <th class="px-4 py-3 text-center">DATE</th>
                                <th class="px-4 py-3">NOTE</th>
                                <th class="px-4 py-3 text-center">PAYMENT FILL</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            ${tableRowsHtml}
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Card List View -->
                <div class="block md:hidden p-4 space-y-3">
                    ${mobileCardsHtml}
                </div>
            </div>

            <!-- Section 2: SALARY / ADVANCE PAYMENTS (EXPENSES) -->
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-money-bill-wave text-blue-600"></i>
                        <h3 class="font-black text-gray-800 text-xs sm:text-sm uppercase tracking-wider">SALARY / ADVANCE PAYMENTS (EXPENSES)</h3>
                    </div>
                    <span class="text-xs font-bold text-blue-600 font-mono">LKR ${totalSalary.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                </div>

                ${expenses.length > 0 ? `
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50/70 border-b border-gray-100 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                                <th class="px-4 py-3">CATEGORY</th>
                                <th class="px-4 py-3 text-right">AMOUNT</th>
                                <th class="px-4 py-3 text-center">DATE</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            ${salaryRowsHtml}
                        </tbody>
                    </table>
                </div>` : `
                <div class="p-6 text-center text-xs text-gray-400">
                    No salary expenses recorded.
                </div>`}
            </div>

            <!-- Footer Details -->
            <div class="text-center pt-2 space-y-3 print-hidden">
                <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}" target="_blank"
                   class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors">
                    <i class="fa-brands fa-whatsapp text-base"></i> Contact Management on WhatsApp
                </a>
                <p class="text-[11px] text-gray-400">${COMPANY_INFO.name} · ${COMPANY_INFO.address}</p>
                <p class="text-[10px] text-gray-300">Official Live Payment Statement · Powered by Kutuss POS</p>
            </div>
        </div>`;
    }

    // ==========================================
    // 3D PRINT OUTSOURCING PORTAL (FUSION 3D)
    // ==========================================

    async function updateSupabasePrintOrder(orderId, fields, orderNo) {
        const idStr = String(orderId);
        const orderNoStr = orderNo ? String(orderNo) : null;
        let synced = false;

        const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
        if (client) {
            try {
                // Find existing row by primary id or orderNo
                let row = null;
                const { data: byId } = await client.from('kutuss_printorders').select('*').eq('id', idStr).limit(1);
                if (byId && byId.length > 0) {
                    row = byId[0];
                } else if (orderNoStr) {
                    const { data: byOrderNo } = await client.from('kutuss_printorders').select('*').eq('id', orderNoStr).limit(1);
                    if (byOrderNo && byOrderNo.length > 0) row = byOrderNo[0];
                }

                if (row) {
                    const updatedData = { ...(row.data || {}), ...fields, _updatedAt: Date.now() };
                    const { error } = await client.from('kutuss_printorders').update({
                        data: updatedData,
                        updated_at: Date.now()
                    }).eq('id', row.id);
                    synced = !error;
                } else {
                    const targetId = orderNoStr || idStr;
                    const newData = { id: targetId, orderNo: orderNoStr, ...fields, _updatedAt: Date.now() };
                    const { error } = await client.from('kutuss_printorders').upsert({
                        id: targetId,
                        data: newData,
                        updated_at: Date.now()
                    });
                    synced = !error;
                }
            } catch (e) {
                console.warn('Supabase client printOrder update error:', e);
            }
        }

        // Direct PostgREST REST API fallback
        if (!synced) {
            const cfg = typeof window.getSupabaseConfig === 'function' ? window.getSupabaseConfig() : null;
            if (cfg && cfg.url && cfg.anonKey) {
                try {
                    const headers = {
                        'apikey': cfg.anonKey,
                        'Authorization': `Bearer ${cfg.anonKey}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    };
                    const targetKey = orderNoStr || idStr;
                    // Get existing
                    const getRes = await fetch(`${cfg.url}/rest/v1/kutuss_printorders?id=eq.${encodeURIComponent(targetKey)}&select=*&limit=1`, {
                        headers: { 'apikey': cfg.anonKey, 'Authorization': `Bearer ${cfg.anonKey}` }
                    });
                    let existingRow = null;
                    if (getRes.ok) {
                        const rows = await getRes.json();
                        if (rows && rows.length > 0) existingRow = rows[0];
                    }

                    const mergedData = { ...(existingRow ? existingRow.data : {}), ...fields, _updatedAt: Date.now() };
                    if (!mergedData.id) mergedData.id = targetKey;
                    if (orderNoStr && !mergedData.orderNo) mergedData.orderNo = orderNoStr;

                    const upsertRes = await fetch(`${cfg.url}/rest/v1/kutuss_printorders`, {
                        method: 'POST',
                        headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
                        body: JSON.stringify({
                            id: targetKey,
                            data: mergedData,
                            updated_at: Date.now()
                        })
                    });
                    synced = upsertRes.ok;
                } catch (restErr) {
                    console.warn('PostgREST printOrder update error:', restErr);
                }
            }
        }

        return synced;
    }

    window.updatePartnerPrintStatus = async function (orderId, orderNo, newStatus) {
        const updateData = {
            status: newStatus,
            completedAt: (newStatus === 'Finish' || newStatus === 'Finished') ? Date.now() : null
        };

        // 1. Optimistic UI update
        if (window.currentPrintJobOrder) {
            window.currentPrintJobOrder.status = newStatus;
            if (updateData.completedAt) {
                window.currentPrintJobOrder.completedAt = updateData.completedAt;
            } else {
                delete window.currentPrintJobOrder.completedAt;
            }
            renderPrintJobPortal(window.currentPrintJobOrder);
        }

        const ind = document.getElementById('status-sync-indicator');
        if (ind) {
            ind.innerHTML = '<i class="fa-solid fa-check"></i> Status Updated!';
            ind.classList.remove('hidden', 'text-blue-600');
            ind.classList.add('text-emerald-600');
            setTimeout(() => ind.classList.add('hidden'), 3000);
        }

        // 2. Background sync
        try {
            await updateSupabasePrintOrder(orderId, updateData, orderNo);
        } catch (e) {
            console.warn('Partner print status sync error:', e);
        }
    };

    window.savePartnerPrintNote = async function (orderId, orderNo) {
        const noteEl = document.getElementById('portal-partner-notes');
        const noteVal = noteEl ? noteEl.value.trim() : '';
        const btn = document.getElementById('btn-save-partner-notes');
        const badge = document.getElementById('partner-note-saved-badge');

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        }

        if (window.currentPrintJobOrder) {
            window.currentPrintJobOrder.partnerNotes = noteVal;
        }

        try {
            await updateSupabasePrintOrder(orderId, { partnerNotes: noteVal }, orderNo);
        } catch (e) {
            console.warn('Partner note sync error:', e);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Note';
                }, 2000);
            }
            if (badge) {
                badge.classList.remove('hidden');
                setTimeout(() => badge.classList.add('hidden'), 3000);
            }
        }
    };

    // Global state for Vendor Workshop Hub
    window.vendorHubState = {
        vendorName: 'Fusion 3D',
        orders: [],
        currentFilter: 'all',
        searchQuery: ''
    };

    async function fetchVendorPrintOrders(vendorName) {
        const vClean = String(vendorName || 'Fusion 3D').trim();
        let rawOrders = null;

        // 1. Fetch from Supabase via fetchAllDocs
        try {
            const restOrders = await fetchAllDocs('kutuss_printOrders');
            if (Array.isArray(restOrders) && restOrders.length > 0) {
                rawOrders = restOrders;
            }
        } catch (e) {
            console.warn('fetchAllDocs print orders error:', e);
        }

        if (!Array.isArray(rawOrders)) rawOrders = [];

        // 2. Deduplicate orders by orderNo or id, and filter out any marked as deleted
        const seen = new Map();
        for (const o of rawOrders) {
            if (o._deleted === true || o.deleted === true || o.status === 'Deleted') continue;
            const key = (o.orderNo && String(o.orderNo).trim()) ? String(o.orderNo).trim() : String(o.id);
            if (!key) continue;

            if (!seen.has(key)) {
                seen.set(key, o);
            } else {
                const existing = seen.get(key);
                seen.set(key, { ...existing, ...o });
            }
        }
        const orders = Array.from(seen.values());

        // 3. Filter by vendor
        const vNorm = vClean.toLowerCase();
        const isShowAll = vNorm === 'all' || vNorm === 'portal' || vNorm === 'hub';

        const filtered = orders.filter(o => {
            if (isShowAll) return true;
            const ov = (o.vendor || '').toLowerCase().trim();
            if (ov.includes(vNorm) || vNorm.includes(ov)) return true;
            if (vNorm.includes('fusion') && (!ov || ov.includes('fusion'))) return true;
            return false;
        });

        // Sort descending by timestamp or id
        filtered.sort((a, b) => {
            const timeA = a.timestamp || (typeof a.id === 'number' ? a.id : 0);
            const timeB = b.timestamp || (typeof b.id === 'number' ? b.id : 0);
            return timeB - timeA;
        });

        return filtered;
    }

    window.refreshVendorHub = async function () {
        const refreshBtn = document.getElementById('btn-hub-refresh');
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Refreshing...';
        }
        try {
            const orders = await fetchVendorPrintOrders(window.vendorHubState.vendorName);
            window.vendorHubState.orders = orders;
        } finally {
            if (refreshBtn) {
                refreshBtn.disabled = false;
                refreshBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Refresh';
            }
            renderVendorHubContent();
        }
    };

    window.filterVendorHub = function (filter) {
        window.vendorHubState.currentFilter = filter;
        renderVendorHubContent();
    };

    window.searchVendorHub = function (q) {
        window.vendorHubState.searchQuery = (q || '').trim().toLowerCase();
        renderVendorHubContent();
    };

    window.updateVendorHubJobStatus = async function (orderId, orderNo, newStatus) {
        const updateData = {
            status: newStatus,
            completedAt: (newStatus === 'Finish' || newStatus === 'Finished') ? Date.now() : null
        };

        // 1. Immediate Optimistic UI update (Instant response, zero lag!)
        const order = (window.vendorHubState.orders || []).find(o => String(o.id) === String(orderId) || String(o.orderNo) === String(orderNo));
        if (order) {
            order.status = newStatus;
            if (updateData.completedAt) {
                order.completedAt = updateData.completedAt;
            } else {
                delete order.completedAt;
            }
        }

        renderVendorHubContent();

        // 2. Perform background sync to Supabase safely
        try {
            await updateSupabasePrintOrder(orderId, updateData, orderNo);
        } catch (err) {
            console.warn('Status sync error:', err);
        }

        // 3. Final re-render to ensure all state is in sync
        renderVendorHubContent();
    };

    window.saveVendorHubJobNote = async function (orderId, orderNo) {
        const noteEl = document.getElementById(`hub-partner-notes-${orderId}`);
        const noteVal = noteEl ? noteEl.value.trim() : '';
        const btn = document.getElementById(`btn-hub-save-notes-${orderId}`);
        const badge = document.getElementById(`badge-hub-notes-saved-${orderId}`);

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        }

        const order = (window.vendorHubState.orders || []).find(o => String(o.id) === String(orderId) || String(o.orderNo) === String(orderNo));
        if (order) {
            order.partnerNotes = noteVal;
        }

        try {
            await updateSupabasePrintOrder(orderId, { partnerNotes: noteVal }, orderNo);
        } catch (err) {
            console.warn('Vendor note save sync error:', err);
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Note';
                }, 2000);
            }
            if (badge) {
                badge.classList.remove('hidden');
                setTimeout(() => badge.classList.add('hidden'), 3000);
            }
        }
    };

    function renderVendorPrintHub(vendorName, orders) {
        window.vendorHubState.vendorName = vendorName || 'Fusion 3D';
        window.vendorHubState.orders = Array.isArray(orders) ? orders : [];
        window.vendorHubState.currentFilter = 'all';
        window.vendorHubState.searchQuery = '';
        renderVendorHubContent();
    }

    function renderVendorHubContent() {
        const portal = document.getElementById('customer-portal-section');
        if (!portal) return;

        const { vendorName, orders, currentFilter, searchQuery } = window.vendorHubState;

        // KPI Counts
        let pendingCount = 0;
        let printingCount = 0;
        let finishedCount = 0;

        orders.forEach(o => {
            const st = (o.status || 'Pending Printing').toLowerCase();
            if (st.includes('finish') || st.includes('complete')) {
                finishedCount++;
            } else if (st.includes('now') || st.includes('progress')) {
                printingCount++;
            } else {
                pendingCount++;
            }
        });
        const totalCount = orders.length;

        // Filter orders
        const filtered = orders.filter(o => {
            const st = (o.status || 'Pending Printing').toLowerCase();
            const isFin = st.includes('finish') || st.includes('complete');
            const isPrint = st.includes('now') || st.includes('progress');
            const isPend = !isFin && !isPrint;

            if (currentFilter === 'pending' && !isPend) return false;
            if (currentFilter === 'printing' && !isPrint) return false;
            if (currentFilter === 'finished' && !isFin) return false;

            if (searchQuery) {
                const s = searchQuery;
                const matchOrderNo = (o.orderNo || '').toLowerCase().includes(s);
                const matchPart = (o.partName || '').toLowerCase().includes(s);
                const matchProj = (o.projectName || '').toLowerCase().includes(s);
                const matchMat = (o.material || '').toLowerCase().includes(s);
                const matchColor = (o.color || '').toLowerCase().includes(s);
                if (!matchOrderNo && !matchPart && !matchProj && !matchMat && !matchColor) return false;
            }

            return true;
        });

        portal.innerHTML = `
        <div class="w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
            <!-- Header Brand Banner -->
            <div class="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                    <div class="w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-tr from-indigo-700 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-200 shrink-0">
                        <i class="fa-solid fa-cubes"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h2 class="font-black text-gray-900 text-lg sm:text-xl leading-tight">${COMPANY_INFO.name}</h2>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">Partner Hub</span>
                        </div>
                        <h1 class="text-xs sm:text-sm font-bold text-gray-500 mt-0.5">
                            <span class="text-indigo-600 font-extrabold">${vendorName}</span> · 3D Printing Production Dashboard
                        </h1>
                    </div>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto justify-end print-hidden">
                    <button type="button" id="btn-hub-refresh" onclick="window.refreshVendorHub()"
                        class="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
                        <i class="fa-solid fa-arrows-rotate"></i> Refresh
                    </button>
                    <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}?text=${encodeURIComponent(`Hi Kutuss Lab, this is ${vendorName} regarding our 3D print orders: `)}" target="_blank"
                        class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors shadow-md flex items-center gap-1.5">
                        <i class="fa-brands fa-whatsapp text-sm"></i> Contact Kutuss
                    </a>
                </div>
            </div>

            <!-- KPI Summary Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 print-hidden">
                <button type="button" onclick="window.filterVendorHub('all')"
                    class="p-4 rounded-2xl border text-left transition-all ${currentFilter === 'all' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200' : 'bg-white text-gray-800 border-gray-100 hover:border-indigo-200 shadow-sm'}">
                    <div class="text-[11px] font-bold uppercase tracking-wider ${currentFilter === 'all' ? 'text-indigo-100' : 'text-gray-400'}">All Assigned</div>
                    <div class="text-2xl sm:text-3xl font-black mt-1 font-mono">${totalCount}</div>
                    <div class="text-[10px] mt-0.5 ${currentFilter === 'all' ? 'text-indigo-200' : 'text-gray-400'}">Total 3D Orders</div>
                </button>

                <button type="button" onclick="window.filterVendorHub('pending')"
                    class="p-4 rounded-2xl border text-left transition-all ${currentFilter === 'pending' ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-200' : 'bg-white text-gray-800 border-gray-100 hover:border-amber-200 shadow-sm'}">
                    <div class="text-[11px] font-bold uppercase tracking-wider ${currentFilter === 'pending' ? 'text-amber-100' : 'text-amber-600'} flex items-center gap-1.5">
                        <i class="fa-solid fa-hourglass-half text-xs"></i> Pending
                    </div>
                    <div class="text-2xl sm:text-3xl font-black mt-1 font-mono">${pendingCount}</div>
                    <div class="text-[10px] mt-0.5 ${currentFilter === 'pending' ? 'text-amber-100' : 'text-gray-400'}">Awaiting Print</div>
                </button>

                <button type="button" onclick="window.filterVendorHub('printing')"
                    class="p-4 rounded-2xl border text-left transition-all ${currentFilter === 'printing' ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200' : 'bg-white text-gray-800 border-gray-100 hover:border-blue-200 shadow-sm'}">
                    <div class="text-[11px] font-bold uppercase tracking-wider ${currentFilter === 'printing' ? 'text-blue-100' : 'text-blue-600'} flex items-center gap-1.5">
                        <i class="fa-solid fa-spinner text-xs"></i> Printing
                    </div>
                    <div class="text-2xl sm:text-3xl font-black mt-1 font-mono">${printingCount}</div>
                    <div class="text-[10px] mt-0.5 ${currentFilter === 'printing' ? 'text-blue-100' : 'text-gray-400'}">In Progress Now</div>
                </button>

                <button type="button" onclick="window.filterVendorHub('finished')"
                    class="p-4 rounded-2xl border text-left transition-all ${currentFilter === 'finished' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200' : 'bg-white text-gray-800 border-gray-100 hover:border-emerald-200 shadow-sm'}">
                    <div class="text-[11px] font-bold uppercase tracking-wider ${currentFilter === 'finished' ? 'text-emerald-100' : 'text-emerald-600'} flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-check text-xs"></i> Finished
                    </div>
                    <div class="text-2xl sm:text-3xl font-black mt-1 font-mono">${finishedCount}</div>
                    <div class="text-[10px] mt-0.5 ${currentFilter === 'finished' ? 'text-emerald-100' : 'text-gray-400'}">Completed / Ready</div>
                </button>
            </div>

            <!-- Search Bar & Tab Filters -->
            <div class="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm space-y-3 print-hidden">
                <div class="flex flex-col sm:flex-row items-center gap-3">
                    <div class="relative w-full">
                        <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" placeholder="Search orders by Part name, Order #, Project, Material..."
                            value="${searchQuery}"
                            oninput="window.searchVendorHub(this.value)"
                            class="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        <button type="button" onclick="window.filterVendorHub('all')"
                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${currentFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                            All (${totalCount})
                        </button>
                        <button type="button" onclick="window.filterVendorHub('pending')"
                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${currentFilter === 'pending' ? 'bg-amber-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                            Pending (${pendingCount})
                        </button>
                        <button type="button" onclick="window.filterVendorHub('printing')"
                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${currentFilter === 'printing' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                            Printing (${printingCount})
                        </button>
                        <button type="button" onclick="window.filterVendorHub('finished')"
                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${currentFilter === 'finished' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                            Finished (${finishedCount})
                        </button>
                    </div>
                </div>
            </div>

            <!-- Orders List -->
            <div class="space-y-4">
                ${filtered.length === 0 ? `
                <div class="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                        <i class="fa-solid fa-cube"></i>
                    </div>
                    <h3 class="text-base font-bold text-gray-800">No 3D print orders found</h3>
                    <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        ${searchQuery ? `No jobs matched "${searchQuery}". Try clearing search keywords.` : `There are no print orders in this view for ${vendorName}.`}
                    </p>
                    ${searchQuery ? `
                    <button type="button" onclick="window.searchVendorHub('')" class="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-bold text-xs transition-colors">
                        Clear Search
                    </button>` : ''}
                </div>` : filtered.map((o, idx) => {
                    const orderNo = o.orderNo || `3DP-${o.id}`;
                    const st = (o.status || 'Pending Printing').trim();
                    const isFin = st.toLowerCase().includes('finish') || st.toLowerCase().includes('complete');
                    const isPrint = st.toLowerCase().includes('now') || st.toLowerCase().includes('progress');

                    let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
                    let badgeIcon = 'fa-hourglass-half';
                    let statusLabel = 'Pending Printing';

                    if (isFin) {
                        badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                        badgeIcon = 'fa-circle-check';
                        statusLabel = 'Finished';
                    } else if (isPrint) {
                        badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
                        badgeIcon = 'fa-spinner fa-spin';
                        statusLabel = 'Printing Now';
                    }

                    // Deadline & Overdue check
                    const targetDate = o.requiredDate || 'Not specified';
                    const targetTime = o.requiredTime || '';
                    const targetDateTime = targetTime ? `${targetDate} at ${targetTime}` : targetDate;

                    let overdueBadge = '';
                    if (o.requiredDate && !isFin) {
                        const dueObj = new Date(o.requiredTime ? `${o.requiredDate} ${o.requiredTime}` : o.requiredDate);
                        if (!isNaN(dueObj.getTime()) && dueObj < new Date()) {
                            overdueBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white uppercase ml-2 animate-pulse">OVERDUE</span>';
                        }
                    }

                    // Files array
                    const files = Array.isArray(o.files) && o.files.length > 0 ? o.files : (o.fileAttachment ? [{ name: o.fileName || `${orderNo}.stl`, data: o.fileAttachment }] : []);

                    return `
                    <div class="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                        <!-- Card Header -->
                        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-100">
                            <div>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono font-black">#${orderNo}</span>
                                    <h3 class="text-base sm:text-lg font-black text-gray-900">${o.partName || 'Custom 3D Part'}</h3>
                                    ${o.projectName ? `<span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-[10px] font-bold"><i class="fa-solid fa-diagram-project text-[9px] mr-1"></i>${o.projectName}</span>` : ''}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                <span id="hub-order-status-${o.id}" class="px-3 py-1 rounded-full text-xs font-black border ${badgeColor} flex items-center gap-1.5 shadow-sm">
                                    <i class="fa-solid ${badgeIcon}"></i> ${statusLabel}
                                </span>
                                <a href="?printjob=${o.id}" target="_blank" title="Open Single Job View"
                                    class="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-indigo-600 flex items-center justify-center text-xs transition-colors">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Target Completion Banner -->
                        <div class="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                            <div class="flex items-center gap-2.5">
                                <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm shadow-sm shrink-0">
                                    <i class="fa-regular fa-clock"></i>
                                </div>
                                <div>
                                    <div class="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center">
                                        Target Completion Deadline ${overdueBadge}
                                    </div>
                                    <div class="text-xs sm:text-sm font-black text-amber-950 font-mono mt-0.5">${targetDateTime}</div>
                                </div>
                            </div>
                            <div class="text-right text-[11px] font-bold text-amber-700 hidden sm:block">
                                ප්‍රින්ට් කර අවසන් විය යුතු වේලාව
                            </div>
                        </div>

                        <!-- Specs Grid -->
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                            <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quantity</div>
                                <div class="font-black text-indigo-600 text-sm mt-0.5 font-mono">${o.quantity || 1} pcs</div>
                            </div>
                            <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Material & Color</div>
                                <div class="font-bold text-gray-900 text-xs mt-0.5 truncate">${o.material || 'PLA'} • ${o.color || 'Standard'}</div>
                            </div>
                            <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Infill & Layer</div>
                                <div class="font-bold text-gray-900 text-xs mt-0.5 truncate">${o.infill || '20%'} | ${o.layerHeight || '0.2mm'}</div>
                            </div>
                            <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cost</div>
                                <div class="font-bold text-gray-900 text-xs mt-0.5 font-mono">${o.cost ? ('LKR ' + Number(o.cost).toLocaleString()) : '-'}</div>
                            </div>
                        </div>

                        <!-- 3D Files & Google Drive Links -->
                        ${(o.driveLink || files.length > 0) ? `
                        <div class="space-y-2 pt-1">
                            <div class="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                <i class="fa-solid fa-file-arrow-down text-indigo-600"></i> Download 3D Models & Files
                            </div>
                            <div class="flex flex-wrap gap-2">
                                ${o.driveLink ? `
                                <a href="${o.driveLink}" target="_blank" rel="noopener noreferrer"
                                    class="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm">
                                    <i class="fa-brands fa-google-drive text-amber-600 text-sm"></i>
                                    <span>Open Google Drive Folder</span>
                                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-amber-500"></i>
                                </a>` : ''}

                                ${files.map((f, fileIdx) => `
                                <a href="${f.data}" download="${f.name || `part_${fileIdx + 1}.stl`}"
                                    class="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm">
                                    <i class="fa-solid fa-cube text-indigo-600"></i>
                                    <span class="truncate max-w-[200px]">${f.name || `3D_Model_${fileIdx + 1}.stl`}</span>
                                    ${f.size ? `<span class="text-[10px] text-indigo-500 font-normal">(${f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : Math.round(f.size / 1024) + ' KB'})</span>` : ''}
                                    <i class="fa-solid fa-download text-[10px] text-indigo-500"></i>
                                </a>`).join('')}
                            </div>
                        </div>` : ''}

                        <!-- Notes Section: Kutuss Instructions & Fusion 3D Feedback -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                            ${o.adminNotes ? `
                            <div class="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                                <div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <i class="fa-solid fa-clipboard-list text-indigo-600"></i> Kutuss Instructions
                                </div>
                                <div class="text-xs text-gray-700 whitespace-pre-line">${o.adminNotes}</div>
                            </div>` : ''}

                            <div class="${o.adminNotes ? '' : 'md:col-span-2'} p-3 bg-indigo-50/30 rounded-2xl border border-indigo-100 space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="text-[10px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                                        <i class="fa-solid fa-comment-dots text-indigo-600"></i> ${vendorName} Notes / Feedback
                                    </div>
                                    <span id="badge-hub-notes-saved-${o.id}" class="hidden text-[10px] font-bold text-emerald-600">
                                        <i class="fa-solid fa-check"></i> Saved
                                    </span>
                                </div>
                                <textarea id="hub-partner-notes-${o.id}" rows="2" placeholder="Write printing status notes or feedback here..."
                                    class="w-full p-2.5 bg-white border border-indigo-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none">${o.partnerNotes || ''}</textarea>
                                <div class="flex justify-end">
                                    <button type="button" id="btn-hub-save-notes-${o.id}" onclick="window.saveVendorHubJobNote('${o.id}', '${orderNo}')"
                                        class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs transition-colors shadow-sm flex items-center gap-1">
                                        <i class="fa-solid fa-floppy-disk"></i> Save Note
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Real-Time Status Toggle Buttons -->
                        <div class="pt-2 border-t border-gray-100">
                            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Update Status for this Job:</div>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <button type="button" onclick="window.updateVendorHubJobStatus('${o.id}', '${orderNo}', 'Pending Printing')"
                                    class="p-2.5 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${st === 'Pending Printing' ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm ring-2 ring-amber-200' : 'border-gray-200 hover:border-amber-300 text-gray-600 bg-white'}">
                                    <i class="fa-solid fa-hourglass-half text-amber-500"></i> 🟡 Pending Printing
                                </button>
                                <button type="button" onclick="window.updateVendorHubJobStatus('${o.id}', '${orderNo}', 'Printing Now')"
                                    class="p-2.5 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${isPrint ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300 text-gray-600 bg-white'}">
                                    <i class="fa-solid fa-spinner text-blue-500"></i> 🔵 Printing Now
                                </button>
                                <button type="button" onclick="window.updateVendorHubJobStatus('${o.id}', '${orderNo}', 'Finish')"
                                    class="p-2.5 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${isFin ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-2 ring-emerald-200' : 'border-gray-200 hover:border-emerald-300 text-gray-600 bg-white'}">
                                    <i class="fa-solid fa-circle-check text-emerald-500"></i> 🟢 Finish
                                </button>
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>

            <!-- Footer -->
            <div class="text-center pt-4 pb-8 space-y-2 print-hidden">
                <p class="text-xs text-gray-500 font-bold">${COMPANY_INFO.name} · Warakapola</p>
                <p class="text-[11px] text-gray-400">Official Outsourced 3D Printing Hub · Real-Time Google Firestore Sync</p>
            </div>
        </div>`;
    }

    function renderPrintJobPortal(order) {
        window.currentPrintJobOrder = order;
        const portal = document.getElementById('customer-portal-section');
        if (!portal) return;

        const orderNo = order.orderNo || `3DP-${order.id}`;
        const st = (order.status || 'Pending Printing').trim();

        let badgeBg = 'bg-amber-100 text-amber-800 border-amber-300';
        let badgeIcon = 'fa-hourglass-half';
        let statusTitle = 'Pending Printing';

        if (st.toLowerCase().includes('finish') || st.toLowerCase().includes('complete')) {
            badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
            badgeIcon = 'fa-circle-check';
            statusTitle = 'Finished / Ready for Pickup';
        } else if (st.toLowerCase().includes('now') || st.toLowerCase().includes('progress')) {
            badgeBg = 'bg-blue-100 text-blue-800 border-blue-300';
            badgeIcon = 'fa-spinner fa-spin';
            statusTitle = 'Printing Now (In Progress)';
        }

        const targetDate = order.requiredDate || 'Not specified';
        const targetTime = order.requiredTime || '';
        const targetDateTime = targetTime ? `${targetDate} at ${targetTime}` : targetDate;

        let overdueBadge = '';
        if (order.requiredDate && !st.toLowerCase().includes('finish')) {
            const dueObj = new Date(order.requiredTime ? `${order.requiredDate} ${order.requiredTime}` : order.requiredDate);
            if (!isNaN(dueObj.getTime()) && dueObj < new Date()) {
                overdueBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white uppercase ml-2 animate-pulse">OVERDUE</span>';
            }
        }

        portal.innerHTML = `
        <div class="w-full max-w-3xl mx-auto px-4 py-6 space-y-6">
            <!-- Header Brand Bar -->
            <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-200">
                        <i class="fa-solid fa-cube text-white text-xl"></i>
                    </div>
                    <div>
                        <h2 class="font-black text-gray-900 text-base sm:text-lg leading-tight">${COMPANY_INFO.name}</h2>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-xs text-indigo-600 font-bold uppercase tracking-wider">3D Print Work Order</span>
                            <span class="text-gray-300">•</span>
                            <span class="text-xs text-gray-500 font-bold font-mono">Order #${orderNo}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                    <a href="?vendor=${encodeURIComponent(order.vendor || 'Fusion 3D')}" class="px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1.5 shadow-sm">
                        <i class="fa-solid fa-layer-group"></i> All ${order.vendor || 'Fusion 3D'} Jobs
                    </a>
                    <span class="px-3.5 py-1.5 rounded-full text-xs font-black border ${badgeBg} flex items-center gap-1.5 shadow-sm">
                        <i class="fa-solid ${badgeIcon}"></i>
                        <span id="portal-status-label">${statusTitle}</span>
                    </span>
                </div>
            </div>

            <!-- Target Completion Date & Time Highlight Box -->
            <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl shadow-amber-500/10">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">Target Completion Time</span>
                            <span class="text-xs text-amber-100">• ප්‍රින්ට් කර අවසන් විය යුතු වේලාව</span>
                            ${overdueBadge}
                        </div>
                        <h3 class="text-2xl sm:text-3xl font-black font-mono tracking-tight">${targetDateTime}</h3>
                        <p class="text-xs text-amber-100 mt-1">Please ensure the 3D model is completed and quality-checked before this deadline.</p>
                    </div>
                    <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0">
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </div>
            </div>

            <!-- Interactive Status Switch for Fusion 3D -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                            <i class="fa-solid fa-arrows-rotate text-indigo-600"></i> Update Job Status (Fusion 3D)
                        </h3>
                        <p class="text-xs text-gray-400 mt-0.5">Click a status below to update Kutuss Design Lab in real-time:</p>
                    </div>
                    <div id="status-sync-indicator" class="hidden text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-check"></i> Synced to Kutuss
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button type="button" onclick="window.updatePartnerPrintStatus('${order.id}', '${orderNo}', 'Pending Printing')"
                        class="p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${st === 'Pending Printing' ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-md ring-2 ring-amber-200' : 'border-gray-200 hover:border-amber-300 text-gray-700 bg-white'}">
                        <i class="fa-solid fa-hourglass-half text-amber-600"></i> 🟡 Pending Printing
                    </button>
                    <button type="button" onclick="window.updatePartnerPrintStatus('${order.id}', '${orderNo}', 'Printing Now')"
                        class="p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${st === 'Printing Now' ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300 text-gray-700 bg-white'}">
                        <i class="fa-solid fa-spinner text-blue-600"></i> 🔵 Printing Now
                    </button>
                    <button type="button" onclick="window.updatePartnerPrintStatus('${order.id}', '${orderNo}', 'Finish')"
                        class="p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${(st === 'Finish' || st === 'Finished') ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md ring-2 ring-emerald-200' : 'border-gray-200 hover:border-emerald-300 text-gray-700 bg-white'}">
                        <i class="fa-solid fa-circle-check text-emerald-600"></i> 🟢 Finish
                    </button>
                </div>
            </div>

            <!-- 3D Model & Files Download Box -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-file-code text-indigo-600"></i> 3D Models & Files
                    </h3>
                    ${(Array.isArray(order.files) ? order.files.length : (order.fileAttachment ? 1 : 0)) > 0 ? `
                    <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        ${(Array.isArray(order.files) && order.files.length > 0) ? order.files.length : 1} File${((Array.isArray(order.files) && order.files.length > 1) ? 's' : '')} Available
                    </span>` : ''}
                </div>
                
                <div class="space-y-3">
                    ${order.driveLink ? `
                    <a href="${order.driveLink}" target="_blank" rel="noopener noreferrer"
                        class="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center justify-between gap-3 transition-colors shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                                <i class="fa-brands fa-google-drive"></i>
                            </div>
                            <div class="text-left">
                                <div class="font-bold">Open Google Drive Folder</div>
                                <div class="text-[11px] text-amber-700 font-normal">Full Resolution 3D Models / Project Folder</div>
                            </div>
                        </div>
                        <i class="fa-solid fa-arrow-up-right-from-square text-base text-amber-600 shrink-0"></i>
                    </a>` : ''}

                    ${(() => {
                        const files = Array.isArray(order.files) && order.files.length > 0 ? order.files : (order.fileAttachment ? [{ name: order.fileName || (orderNo + '.stl'), data: order.fileAttachment }] : []);
                        if (files.length === 0) return '';
                        return files.map((f, i) => `
                        <a href="${f.data}" download="${f.name || `part_${i + 1}.stl`}"
                            class="p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm flex items-center justify-between gap-3 transition-colors shadow-sm">
                            <div class="flex items-center gap-3 min-w-0 pr-2">
                                <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                                    <i class="fa-solid fa-file-arrow-down"></i>
                                </div>
                                <div class="text-left truncate">
                                    <div class="font-bold truncate text-xs sm:text-sm" title="${(f.name || 'model.stl').replace(/"/g, '&quot;')}">${f.name || `3D Model ${i + 1}`}</div>
                                    <div class="text-[11px] text-blue-600 font-normal font-mono">${f.size ? (f.size / 1024).toFixed(1) + ' KB' : 'Direct 3D File'}</div>
                                </div>
                            </div>
                            <span class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm">
                                <i class="fa-solid fa-download text-xs"></i> Download
                            </span>
                        </a>`).join('');
                    })()}

                    ${(!order.driveLink && !(Array.isArray(order.files) && order.files.length > 0) && !order.fileAttachment) ? `
                    <div class="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center text-xs text-gray-500">
                        <i class="fa-solid fa-folder-open text-gray-400 text-xl mb-1.5"></i>
                        <p>No direct 3D file or link attached. Please check with Kutuss Design Lab.</p>
                    </div>` : ''}
                </div>
            </div>

            <!-- Print Technical Specifications Grid -->
            <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 class="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                    <i class="fa-solid fa-sliders text-indigo-600"></i> Print Specifications
                </h3>
                
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Part / Item</span>
                        <p class="font-bold text-gray-900 text-sm mt-0.5">${order.partName || '-'}</p>
                    </div>
                    <div class="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quantity</span>
                        <p class="font-black text-indigo-600 text-base mt-0.5 font-mono">${order.quantity || 1} pcs</p>
                    </div>
                    <div class="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Material & Color</span>
                        <p class="font-bold text-gray-900 text-sm mt-0.5">${order.material || 'PLA'} • ${order.color || 'Standard'}</p>
                    </div>
                    <div class="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Infill & Layer</span>
                        <p class="font-bold text-gray-900 text-sm mt-0.5">${order.infill || '20%'} | ${order.layerHeight || '0.2mm'}</p>
                    </div>
                </div>

                ${order.projectName ? `
                <div class="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                    <i class="fa-solid fa-diagram-project text-indigo-600"></i>
                    <span>Project: <strong>${order.projectName}</strong></span>
                </div>` : ''}
            </div>

            <!-- Two-Way Shared Notes Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Admin Notes (From Kutuss) -->
                <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-2.5">
                    <div class="flex items-center gap-2 text-gray-900 font-bold text-xs uppercase tracking-wider">
                        <i class="fa-solid fa-clipboard-list text-brand-600"></i> Kutuss Lab Instructions
                    </div>
                    <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-700 whitespace-pre-line min-h-[90px]">
                        ${order.adminNotes ? order.adminNotes : '<span class="text-gray-400 italic">No special instructions provided.</span>'}
                    </div>
                </div>

                <!-- Fusion 3D Partner Notes (Editable by Partner) -->
                <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-2.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-gray-900 font-bold text-xs uppercase tracking-wider">
                            <i class="fa-solid fa-comment-dots text-indigo-600"></i> Fusion 3D Feedback / Notes
                        </div>
                        <span id="partner-note-saved-badge" class="hidden text-[10px] font-bold text-emerald-600"><i class="fa-solid fa-check"></i> Saved</span>
                    </div>
                    <textarea id="portal-partner-notes" rows="3" placeholder="Enter printing notes, updates or issue details here..."
                        class="w-full p-3 bg-indigo-50/30 border border-indigo-100 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none">${order.partnerNotes || ''}</textarea>
                    <div class="flex justify-end">
                        <button type="button" id="btn-save-partner-notes" onclick="window.savePartnerPrintNote('${order.id}', '${orderNo}')"
                            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5">
                            <i class="fa-solid fa-floppy-disk"></i> Save Note
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer Details -->
            <div class="text-center pt-2 space-y-3 print-hidden">
                <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}?text=${encodeURIComponent(`Hi Kutuss Lab, regarding 3D Print Job #${orderNo} (${order.partName}): `)}" target="_blank"
                   class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors">
                    <i class="fa-brands fa-whatsapp text-base"></i> Contact Kutuss Lab on WhatsApp
                </a>
                <p class="text-[11px] text-gray-400">${COMPANY_INFO.name} · Warakapola</p>
                <p class="text-[10px] text-gray-300">Official 3D Print Outsourcing Portal · Real-Time Firestore Sync</p>
            </div>
        </div>`;
    }

    // Main initialization
    async function initCustomerPortal() {
        const { settlement, bill, member, printjob, vendorPortal } = getPortalParams();
        if (!settlement && !bill && !member && !printjob && !vendorPortal) return; // Normal admin mode

        // Enter Customer Portal Mode
        activatePortalMode();

        const portal = document.getElementById('customer-portal-section');
        if (portal) {
            portal.innerHTML = `
                <div class="p-12 text-center">
                    <div class="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <h3 class="text-lg font-bold text-gray-700">${vendorPortal ? 'Loading 3D Print Workshop Hub...' : (printjob ? 'Loading 3D Print Order...' : 'Loading Live Statement...')}</h3>
                    <p class="text-xs text-gray-400 mt-1">Retrieving official details from Kutuss Design Lab Cloud</p>
                </div>
            `;
        }

        if (vendorPortal) {
            const orders = await fetchVendorPrintOrders(vendorPortal);
            renderVendorPrintHub(vendorPortal, orders);
        } else if (settlement) {
            const proj = await fetchRecord('project', settlement);
            if (proj) {
                renderProjectSettlement(proj);
            } else {
                if (portal) {
                    portal.innerHTML = `
                        <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md">
                            <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <i class="fa-solid fa-triangle-exclamation"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800">Settlement Record Not Found</h3>
                            <p class="text-xs text-gray-500 mt-2">
                                We could not find a project settlement matching <strong>"${settlement}"</strong>. Please verify the link or contact Kutuss Design Lab.
                            </p>
                            <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}" class="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md">
                                <i class="fa-brands fa-whatsapp text-base"></i> Contact Us on WhatsApp
                            </a>
                        </div>
                    `;
                }
            }
        } else if (bill) {
            const sale = await fetchRecord('sale', bill);
            if (sale) {
                renderSaleBill(sale);
            } else {
                if (portal) {
                    portal.innerHTML = `
                        <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md">
                            <h3 class="text-lg font-bold text-gray-800">Receipt Not Found</h3>
                            <p class="text-xs text-gray-500 mt-2">Receipt record "${bill}" was not found.</p>
                        </div>
                    `;
                }
            }
        } else if (member) {
            const memberData = await fetchMemberRecord(member);
            if (memberData) {
                renderMemberPortal(memberData);
            } else {
                if (portal) {
                    portal.innerHTML = `
                        <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md mx-auto mt-8">
                            <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <i class="fa-solid fa-user-slash"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800">Member Not Found</h3>
                            <p class="text-xs text-gray-500 mt-2">
                                We could not find a team member matching <strong>"${member}"</strong>. Please verify the link or contact Kutuss Design Lab.
                            </p>
                            <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}" class="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md">
                                <i class="fa-brands fa-whatsapp text-base"></i> Contact Us on WhatsApp
                            </a>
                        </div>
                    `;
                }
            }
        } else if (printjob) {
            const printOrder = await fetchRecord('printOrder', printjob);
            if (printOrder) {
                renderPrintJobPortal(printOrder);
            } else {
                if (portal) {
                    portal.innerHTML = `
                        <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md mx-auto mt-8">
                            <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <i class="fa-solid fa-cube text-amber-500"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800">3D Print Order Not Found</h3>
                            <p class="text-xs text-gray-500 mt-2">
                                We could not find a 3D print work order matching <strong>"${printjob}"</strong>. Please check the order number or contact Kutuss Design Lab.
                            </p>
                            <a href="https://wa.me/${COMPANY_INFO.phoneIntl.replace('+', '')}" class="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md">
                                <i class="fa-brands fa-whatsapp text-base"></i> Contact Us on WhatsApp
                            </a>
                        </div>
                    `;
                }
            }
        }
    }

    // Auto-init on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomerPortal);
    } else {
        initCustomerPortal();
    }
})();
