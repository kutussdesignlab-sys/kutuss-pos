/**
 * Kutuss POS - Supabase Configuration & Client Provider
 * ------------------------------------------------------
 * Manages Supabase PostgreSQL credentials and client instance.
 * Credentials can be set in code below OR pasted directly in the UI under:
 * Sidebar -> "Database & Settings" -> "Supabase Cloud Sync".
 */

window.DEFAULT_SUPABASE_CONFIG = {
    url: "",      // e.g. "https://xxxxxxxxxxxxxxxxxxxx.supabase.co"
    anonKey: ""  // e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

// Retrieve config from localStorage (UI configured) or fallback to DEFAULT_SUPABASE_CONFIG
window.getSupabaseConfig = function () {
    try {
        const saved = localStorage.getItem('kutuss_supabase_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.url && parsed.anonKey && parsed.url.trim() !== '' && parsed.anonKey.trim() !== '') {
                return parsed;
            }
        }
    } catch (e) {
        console.warn('Error reading saved Supabase config:', e);
    }
    return window.DEFAULT_SUPABASE_CONFIG;
};

// Save config to localStorage
window.saveSupabaseConfig = function (cfg) {
    if (!cfg || typeof cfg !== 'object') return false;
    const cleanUrl = (cfg.url || '').trim().replace(/\/+$/, '');
    const cleanKey = (cfg.anonKey || cfg.key || '').trim();
    localStorage.setItem('kutuss_supabase_config', JSON.stringify({
        url: cleanUrl,
        anonKey: cleanKey
    }));
    window._supabaseClientInstance = null; // Reset cached client instance
    return true;
};

// Check if Supabase has been configured with valid credentials
window.isSupabaseConfigured = function () {
    const cfg = window.getSupabaseConfig();
    return !!(cfg && cfg.url && cfg.url.trim() !== '' && cfg.anonKey && cfg.anonKey.trim() !== '');
};

// Get or create singleton Supabase client instance
window.getSupabaseClient = function () {
    if (window._supabaseClientInstance) {
        return window._supabaseClientInstance;
    }
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        console.warn('Supabase JS library not loaded yet.');
        return null;
    }
    const cfg = window.getSupabaseConfig();
    if (!cfg.url || !cfg.anonKey) {
        return null;
    }
    try {
        window._supabaseClientInstance = window.supabase.createClient(cfg.url, cfg.anonKey, {
            auth: { persistSession: false },
            realtime: { params: { eventsPerSecond: 10 } }
        });
        return window._supabaseClientInstance;
    } catch (e) {
        console.error('Failed to instantiate Supabase client:', e);
        return null;
    }
};

// Populate Settings UI Form with current config
window.populateSupabaseUI = function () {
    const cfg = window.getSupabaseConfig();
    const urlInput = document.getElementById('sb-project-url');
    const keyInput = document.getElementById('sb-anon-key');
    if (urlInput && cfg.url) urlInput.value = cfg.url;
    if (keyInput && cfg.anonKey) keyInput.value = cfg.anonKey;
};

// Parse raw pasted credentials (JSON object, URL/Key string, or JS snippet)
window.parsePastedSupabaseSnippet = function (rawText) {
    if (!rawText || typeof rawText !== 'string') return null;
    const text = rawText.trim();

    // 1. Try JSON.parse
    try {
        const obj = JSON.parse(text);
        if (obj.url && (obj.anonKey || obj.key)) {
            return { url: obj.url, anonKey: obj.anonKey || obj.key };
        }
    } catch (e) { }

    // 2. Extract key-value pairs using regex
    const extract = (key) => {
        const regexes = [
            new RegExp(`['"]?${key}['"]?\\s*[:=]\\s*['"\`]([^'"\`]+)['"\`]`, 'i'),
            new RegExp(`${key}\\s*[:=]\\s*([a-zA-Z0-9._-]+)`, 'i')
        ];
        for (const rx of regexes) {
            const m = text.match(rx);
            if (m && m[1]) return m[1].trim();
        }
        return '';
    };

    const url = extract('url') || extract('supabaseUrl') || extract('projectUrl');
    const anonKey = extract('anonKey') || extract('supabaseKey') || extract('apiKey') || extract('anon_key') || extract('key');

    if (url && anonKey) {
        return { url, anonKey };
    }

    // 3. Fallback: match URL starting with https://*.supabase.co and JWT token
    const urlMatch = text.match(/https:\/\/[a-z0-9-]+\.supabase\.co/i);
    const jwtMatch = text.match(/eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/);
    if (urlMatch && jwtMatch) {
        return { url: urlMatch[0], anonKey: jwtMatch[0] };
    }

    return null;
};

// Save config directly from Settings UI form
window.saveSupabaseFromUI = async function () {
    const snippetInput = document.getElementById('sb-snippet-paste');
    let cfg = null;

    if (snippetInput && snippetInput.value.trim() !== '') {
        cfg = window.parsePastedSupabaseSnippet(snippetInput.value.trim());
        if (!cfg) {
            alert('Could not parse the pasted Supabase credentials snippet.\nPlease check the format or enter Project URL and Anon Key manually below.');
            return;
        }
    } else {
        const urlInput = document.getElementById('sb-project-url');
        const keyInput = document.getElementById('sb-anon-key');
        cfg = {
            url: urlInput ? urlInput.value.trim() : '',
            anonKey: keyInput ? keyInput.value.trim() : ''
        };
    }

    if (!cfg.url || !cfg.anonKey) {
        alert('Please fill in both Supabase Project URL and Public Anon Key.');
        return;
    }

    window.saveSupabaseConfig(cfg);
    window.populateSupabaseUI();
    if (snippetInput) snippetInput.value = '';

    alert('✅ Supabase credentials saved successfully!\n\nTesting connection now...');
    if (typeof window.testSupabaseConnection === 'function') {
        const success = await window.testSupabaseConnection();
        if (success && typeof window.uploadAllDataToSupabase === 'function') {
            if (confirm('Connection successful! Do you want to sync your existing local data to Supabase now?')) {
                window.uploadAllDataToSupabase();
            }
        }
    }
};

// Backward-compatible aliases for any legacy code calling Firebase UI functions
window.populateFirebaseUI = window.populateSupabaseUI;
window.saveFirebaseFromUI = window.saveSupabaseFromUI;
window.testFirebaseConnection = window.testSupabaseConnection;
window.uploadAllDataToFirestore = window.uploadAllDataToSupabase;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.populateSupabaseUI);
} else {
    window.populateSupabaseUI();
}
