/**
 * Kutuss POS - Admin Authentication System
 * ----------------------------------------
 * Protects the POS Admin Panel with credential authentication.
 * Public customer & member portals (?settlement=, ?bill=, ?member=) bypass this check.
 *
 * Credentials:
 *   Username: kutuss
 *   Password: 7P3C780A7D
 */

(function () {
    const ADMIN_USER = 'kutuss';
    const ADMIN_PASS = '7P3C780A7D';
    const AUTH_KEY = 'kutuss_admin_auth';

    // Helper: Determine if current request is a public Customer or Member Portal link
    function isPortalMode() {
        const p = new URLSearchParams(window.location.search);
        return Boolean(
            p.get('settlement') || p.get('quo') || p.get('project') || p.get('proj') || p.get('quotation') ||
            p.get('bill') || p.get('sale') || p.get('receipt') || p.get('rec') ||
            p.get('member') || p.get('memberbill') || p.get('team') ||
            p.get('printjob') || p.get('print') || p.get('fusion3d') || p.get('3dp') ||
            p.get('vendor') || p.get('partner') || p.get('hub') || p.get('printportal')
        );
    }

    // Helper: Check if admin is currently authenticated
    function isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'true' || sessionStorage.getItem(AUTH_KEY) === 'true';
    }

    // Helper: Unlock admin panel and remove lock state
    function unlockAdmin() {
        document.documentElement.classList.remove('admin-locked');
        if (document.body) document.body.classList.remove('admin-locked');
        const overlay = document.getElementById('kutuss-admin-login-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.25s ease';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 300);
        }

        // Initialize dashboard if available
        if (typeof window.loadDashboard === 'function') {
            try { window.loadDashboard(); } catch (e) { }
        }
    }

    // Toggle Password Visibility
    window.toggleAdminPasswordVisibility = function () {
        const pwdInput = document.getElementById('admin-login-password');
        const icon = document.getElementById('admin-pwd-toggle-icon');
        if (!pwdInput || !icon) return;

        if (pwdInput.type === 'password') {
            pwdInput.type = 'text';
            icon.className = 'fa-solid fa-eye-slash text-sm';
        } else {
            pwdInput.type = 'password';
            icon.className = 'fa-solid fa-eye text-sm';
        }
    };

    // Handle Login Form Submit
    window.handleAdminLogin = function () {
        const uInput = document.getElementById('admin-login-username');
        const pInput = document.getElementById('admin-login-password');
        const remember = document.getElementById('admin-login-remember')?.checked;
        const errorDiv = document.getElementById('admin-login-error');
        const errorText = document.getElementById('admin-login-error-text');

        const u = (uInput?.value || '').trim();
        const p = (pInput?.value || '').trim();

        if (u === ADMIN_USER && p === ADMIN_PASS) {
            if (remember) {
                localStorage.setItem(AUTH_KEY, 'true');
            } else {
                sessionStorage.setItem(AUTH_KEY, 'true');
            }
            unlockAdmin();
        } else {
            if (errorDiv && errorText) {
                errorDiv.classList.remove('hidden');
                errorText.textContent = 'Invalid username or password. Please try again.';
                if (pInput) {
                    pInput.value = '';
                    pInput.focus();
                }
            }
        }
    };

    // Logout
    window.adminLogout = function () {
        if (confirm('Are you sure you want to log out of Kutuss Admin Panel?')) {
            localStorage.removeItem(AUTH_KEY);
            sessionStorage.removeItem(AUTH_KEY);
            window.location.reload();
        }
    };

    // Create & Show Login Overlay
    function showLoginOverlay() {
        if (document.getElementById('kutuss-admin-login-overlay')) return;

        document.documentElement.classList.add('admin-locked');
        if (document.body) document.body.classList.add('admin-locked');

        const overlay = document.createElement('div');
        overlay.id = 'kutuss-admin-login-overlay';
        overlay.className = 'fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md';
        overlay.innerHTML = `
            <div class="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-6">
                <!-- Brand Header -->
                <div class="text-center space-y-2">
                    <div class="w-14 h-14 bg-gradient-to-tr from-sky-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-sky-500/30 text-white text-2xl font-black">
                        K
                    </div>
                    <h2 class="text-xl font-black text-gray-900 tracking-tight">KUTUSS DESIGN LAB</h2>
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-[11px] font-bold">
                        <i class="fa-solid fa-lock text-[10px]"></i> POS Admin Portal
                    </div>
                </div>

                <!-- Form -->
                <form id="kutuss-admin-login-form" class="space-y-4" onsubmit="event.preventDefault(); window.handleAdminLogin();">
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Username</label>
                        <div class="relative">
                            <i class="fa-solid fa-user absolute left-3.5 top-3.5 text-gray-400 text-sm"></i>
                            <input type="text" id="admin-login-username" required autocomplete="username" placeholder="Username"
                                class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
                        <div class="relative">
                            <i class="fa-solid fa-key absolute left-3.5 top-3.5 text-gray-400 text-sm"></i>
                            <input type="password" id="admin-login-password" required autocomplete="current-password" placeholder="Password"
                                class="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all">
                            <button type="button" onclick="window.toggleAdminPasswordVisibility()" class="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer">
                                <i id="admin-pwd-toggle-icon" class="fa-solid fa-eye text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between text-xs pt-0.5">
                        <label class="flex items-center gap-2 cursor-pointer select-none text-gray-600 font-medium">
                            <input type="checkbox" id="admin-login-remember" checked class="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-gray-300">
                            <span>Remember this device</span>
                        </label>
                    </div>

                    <div id="admin-login-error" class="hidden bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-rose-500 text-sm flex-shrink-0"></i>
                        <span id="admin-login-error-text">Invalid username or password.</span>
                    </div>

                    <button type="submit" id="admin-login-btn"
                        class="w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer">
                        <span>Sign In to Dashboard</span>
                        <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    </button>
                </form>

                <div class="text-center pt-2 border-t border-gray-100">
                    <p class="text-[11px] text-gray-400">Authorized Personnel Only • Kutuss POS</p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Autofocus username field
        setTimeout(() => {
            const uInput = document.getElementById('admin-login-username');
            if (uInput) uInput.focus();
        }, 100);
    }

    // Main Init
    function initAdminAuth() {
        // If public customer or member portal, bypass completely
        if (isPortalMode()) {
            document.documentElement.classList.remove('admin-locked');
            if (document.body) document.body.classList.remove('admin-locked');
            return;
        }

        // If authenticated, allow through
        if (isAuthenticated()) {
            unlockAdmin();
            return;
        }

        // Not authenticated: Show login overlay
        showLoginOverlay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdminAuth);
    } else {
        initAdminAuth();
    }
})();
