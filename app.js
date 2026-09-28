// --- 1. Database Initialization (Dexie.js) ---
const db = new Dexie('KutussPOSDB');
window.db = db;

// Upgrade to Version 11 for inquiries
db.version(11).stores({
    sales: '++id, receiptNo, date, customerName, invoiceNo, projectId, paymentMethod, amount, status, timestamp, monthYear',
    expenses: '++id, date, invoiceNo, category, personName, paymentMethod, amount, description, attachment, timestamp, monthYear',
    projects: '++id, name, customerName, startDate, endDate, registrationDate, status, budget, description, items, teamPayments, clientPayments, components, agreementAttachment, timestamp, monthYear',
    inquiries: '++id, date, customerName, phone, projectName, status, notes, timestamp',
    settings: 'key, value'
});

// Upgrade to Version 12 for suppliers
db.version(12).stores({
    sales: '++id, receiptNo, date, customerName, invoiceNo, projectId, paymentMethod, amount, status, timestamp, monthYear',
    expenses: '++id, date, invoiceNo, category, personName, paymentMethod, amount, description, attachment, timestamp, monthYear',
    projects: '++id, name, customerName, startDate, endDate, registrationDate, status, budget, description, items, teamPayments, clientPayments, components, agreementAttachment, timestamp, monthYear',
    inquiries: '++id, date, customerName, phone, projectName, status, notes, timestamp',
    suppliers: '++id, name, shopName, phone, equipmentName, address, description, timestamp',
    settings: 'key, value'
});

// Upgrade to Version 13 for salary paysheets (isolated feature)
db.version(13).stores({
    sales: '++id, receiptNo, date, customerName, invoiceNo, projectId, paymentMethod, amount, status, timestamp, monthYear',
    expenses: '++id, date, invoiceNo, category, personName, paymentMethod, amount, description, attachment, timestamp, monthYear',
    projects: '++id, name, customerName, startDate, endDate, registrationDate, status, budget, description, items, teamPayments, clientPayments, components, agreementAttachment, timestamp, monthYear',
    inquiries: '++id, date, customerName, phone, projectName, status, notes, timestamp',
    suppliers: '++id, name, shopName, phone, equipmentName, address, description, timestamp',
    salaryPaysheets: '++id, date, employeeName, salaryMonth, amount, paymentMethod, notes, timestamp',
    settings: 'key, value'
});

// Upgrade to Version 14 for team members registry
db.version(14).stores({
    sales: '++id, receiptNo, date, customerName, invoiceNo, projectId, paymentMethod, amount, status, timestamp, monthYear',
    expenses: '++id, date, invoiceNo, category, personName, paymentMethod, amount, description, attachment, timestamp, monthYear',
    projects: '++id, name, customerName, startDate, endDate, registrationDate, status, budget, description, items, teamPayments, clientPayments, components, agreementAttachment, timestamp, monthYear',
    inquiries: '++id, date, customerName, phone, projectName, status, notes, timestamp',
    suppliers: '++id, name, shopName, phone, equipmentName, address, description, timestamp',
    salaryPaysheets: '++id, date, employeeName, salaryMonth, amount, paymentMethod, notes, timestamp',
    teamMembers: '++id, name, phone, role, nicNo, bankAccount, bankName, monthlyRate, joinDate, notes, timestamp',
    settings: 'key, value'
});

// Upgrade to Version 15 for member project payments and payable bills
db.version(15).stores({
    sales: '++id, receiptNo, date, customerName, invoiceNo, projectId, paymentMethod, amount, status, timestamp, monthYear',
    expenses: '++id, date, invoiceNo, category, personName, paymentMethod, amount, description, attachment, timestamp, monthYear',
    projects: '++id, name, customerName, startDate, endDate, registrationDate, status, budget, description, items, teamPayments, clientPayments, components, agreementAttachment, timestamp, monthYear',
    inquiries: '++id, date, customerName, phone, projectName, status, notes, timestamp',
    suppliers: '++id, name, shopName, phone, equipmentName, address, description, timestamp',
    salaryPaysheets: '++id, date, employeeName, salaryMonth, amount, paymentMethod, notes, timestamp',
    teamMembers: '++id, name, phone, role, nicNo, bankAccount, bankName, monthlyRate, joinDate, notes, timestamp',
    memberProjectPayments: '++id, memberId, memberName, projectName, quoNumber, agreedAmount, paidAmount, date, notes, timestamp',
    payableBills: '++id, title, vendor, invoiceNo, category, totalAmount, dueDate, billDate, status, attachment, notes, payments, timestamp',
    settings: 'key, value'
});

// Upgrade to Version 16 for 3D Print Orders (Fusion 3D outsourcing)
db.version(16).stores({
    sales: '++id, receiptNo, date, customerName, invoiceNo, projectId, paymentMethod, amount, status, timestamp, monthYear',
    expenses: '++id, date, invoiceNo, category, personName, paymentMethod, amount, description, attachment, timestamp, monthYear',
    projects: '++id, name, customerName, startDate, endDate, registrationDate, status, budget, description, items, teamPayments, clientPayments, components, agreementAttachment, timestamp, monthYear',
    inquiries: '++id, date, customerName, phone, projectName, status, notes, timestamp',
    suppliers: '++id, name, shopName, phone, equipmentName, address, description, timestamp',
    salaryPaysheets: '++id, date, employeeName, salaryMonth, amount, paymentMethod, notes, timestamp',
    teamMembers: '++id, name, phone, role, nicNo, bankAccount, bankName, monthlyRate, joinDate, notes, timestamp',
    memberProjectPayments: '++id, memberId, memberName, projectName, quoNumber, agreedAmount, paidAmount, date, notes, timestamp',
    payableBills: '++id, title, vendor, invoiceNo, category, totalAmount, dueDate, billDate, status, attachment, notes, payments, timestamp',
    printOrders: '++id, orderNo, projectId, projectName, partName, vendor, vendorPhone, material, color, quantity, infill, layerHeight, status, driveLink, fileAttachment, fileName, requiredDate, requiredTime, adminNotes, partnerNotes, completedAt, cost, timestamp, monthYear',
    settings: 'key, value'
});

// --- 1.5 Translations ---
const translations = {
    en: {
        nav_dashboard: "Dashboard",
        nav_sale: "New Sale",
        nav_history: "History",
        nav_expenses: "Expenses",
        nav_payable_bills: "Payable Bills",
        nav_print_orders: "3D Print Jobs",
        nav_projects: "Projects",
        nav_inquiries: "Inquiries",
        nav_suppliers: "Suppliers",
        nav_reports: "Reports",
        nav_database: "Database",
        nav_salary_paysheet: "Salary Paysheet",
        salary_paysheet_title: "Salary Paysheet Generator",
        nav_backup: "Backup All Data",
        nav_home: "Home",
        nav_menu: "Menu"
    },
    si: {
        nav_dashboard: "ඩෑෂ්බෝඩ්",
        nav_sale: "නව විකුණුම්",
        nav_history: "ඉතිහාසය",
        nav_expenses: "වියදම්",
        nav_payable_bills: "ණය බිල්පත්",
        nav_print_orders: "3D ප්‍රින්ට් ජොබ්ස්",
        nav_projects: "ව්‍යාපෘති",
        nav_inquiries: "විමසීම්",
        nav_suppliers: "සැපයුම්කරුවන්",
        nav_reports: "වාර්තා",
        nav_database: "දත්ත ගබඩාව",
        nav_salary_paysheet: "සැලරි පේෂීට්",
        salary_paysheet_title: "සැලරි පේෂීට් යන්ත්‍රය",
        nav_backup: "දත්ත බැකප්",
        nav_home: "මුල් පිටුව",
        nav_menu: "මෙනුව"
    }
};

let currentLang = 'en';

window.formatItemAmount = function(val, minFractionDigits = 2) {
    if (!val) return '0.00';
    const str = String(val).trim();
    if (/^\d+(\.\d+)?$/.test(str)) {
        return parseFloat(str).toLocaleString('en-LK', { minimumFractionDigits: minFractionDigits });
    }
    if (str.includes('-')) {
        const parts = str.split('-');
        const min = parseFloat(parts[0].trim());
        const max = parseFloat(parts[1].trim());
        if (!isNaN(min) && !isNaN(max)) {
            return `${min.toLocaleString('en-LK', { minimumFractionDigits: minFractionDigits })} - ${max.toLocaleString('en-LK', { minimumFractionDigits: minFractionDigits })}`;
        }
    }
    return str;
};

// Client-side image compressor for fast Cloud Sync and Firestore <1MB compliance
window.compressImageFile = async function(file, maxWidth = 1200, maxHeight = 1200, quality = 0.75) {
    if (!file) return '';
    if (!file.type || !file.type.startsWith('image/')) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result || '');
            reader.onerror = () => resolve('');
            reader.readAsDataURL(file);
        });
    }

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                try {
                    let { width, height } = img;
                    if (width > maxWidth || height > maxHeight) {
                        if (width / height > maxWidth / maxHeight) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        } else {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressed = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressed);
                } catch (err) {
                    resolve(e.target.result || '');
                }
            };
            img.onerror = () => resolve(e.target.result || '');
            img.src = e.target.result;
        };
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
    });
};

window.toggleLanguage = async function() {
    currentLang = currentLang === 'en' ? 'si' : 'en';
    const toggleBtns = document.querySelectorAll('#lang-toggle-mobile, #lang-toggle-desktop');
    toggleBtns.forEach(btn => {
        btn.textContent = currentLang === 'en' ? 'සිංහල' : 'English';
    });
    applyTranslations();
    await db.settings.put({ key: 'language', value: currentLang });
};

function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// --- 2. Global State & Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    // Load language preference
    db.settings.get('language').then(lang => {
        if (lang && lang.value === 'si') {
            currentLang = 'si';
            const toggleBtns = document.querySelectorAll('#lang-toggle-mobile, #lang-toggle-desktop');
            toggleBtns.forEach(btn => {
                btn.textContent = 'English';
            });
            applyTranslations();
        }
    });

    // Set default date to today
    const today = new Date();
    document.getElementById('sale-date').valueAsDate = today;
    document.getElementById('expense-date').valueAsDate = today;

    // Set project dates
    const projectRegDate = document.getElementById('project-reg-date');
    if (projectRegDate) projectRegDate.valueAsDate = today;
    const projectStartDate = document.getElementById('project-start-date');
    if (projectStartDate) projectStartDate.valueAsDate = today;

    const inquiryDate = document.getElementById('inquiry-date');
    if (inquiryDate) inquiryDate.valueAsDate = today;

    const salaryDate = document.getElementById('salary-date');
    if (salaryDate) salaryDate.valueAsDate = today;

    // Initial Loads
    loadDashboard();
    loadHistory();
    loadExpenses();
    loadProjects();
    loadBranding(); // Keep loadBranding
    generateReceiptNo();
    generateProjectID();
    generateExpenseNo();
    initAllAutocomplete();
    setupAutocompleteListeners();

    // Setup navigation listeners
    setupNavigation();

    // Setup Project form listener
    const projectForm = document.getElementById('project-form');
    if (projectForm) projectForm.addEventListener('submit', handleProjectSubmit);
});

window.handleLogoUpload = function (input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const base64 = e.target.result;
            await db.settings.put({ key: 'company_logo', value: base64 });
            loadBranding();
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.loadBranding = async function () {
    try {
        const logoSetting = await db.settings.get('company_logo');
        if (logoSetting && logoSetting.value) {
            // Update all logo instances
            document.querySelectorAll('.app-logo').forEach(img => {
                img.src = logoSetting.value;
            });
            // Hide branding setup if logo exists
            const setup = document.getElementById('branding-setup');
            if (setup) setup.classList.add('hidden');
        }
    } catch (e) {
        console.error("Error loading branding:", e);
    }
};

function setupNavigation() {
    // Mobile sidebar functions
    window.openSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (!sidebar) return;
        sidebar.classList.remove('hidden');
        sidebar.classList.add('flex', 'z-50');
        if (overlay) overlay.classList.remove('hidden');
    };

    window.closeSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (!sidebar) return;
        if (window.innerWidth < 768) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex', 'z-50');
        }
        if (overlay) overlay.classList.add('hidden');
    };

    window.toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.classList.contains('hidden')) {
            window.closeSidebar();
        } else {
            window.openSidebar();
        }
    };
}

function showSection(sectionId) {
    // Automatically close mobile sidebar when navigating
    if (window.innerWidth < 768 && typeof window.closeSidebar === 'function') {
        window.closeSidebar();
    }

    // Hide all sections
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));

    // Show target section
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');

    // Update Sidebar Active State
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-brand-50', 'text-brand-600', 'border-l-4', 'border-brand-600');
        btn.classList.add('text-gray-600', 'hover:bg-gray-50');
    });

    const activeBtn = document.getElementById(`nav-${sectionId}`);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-50');
        activeBtn.classList.add('bg-brand-50', 'text-brand-600', 'border-l-4', 'border-brand-600');
    }

    // Update Bottom Nav Active State (Mobile)
    const bottomNavButtons = document.querySelectorAll('div.fixed.bottom-0 button');
    bottomNavButtons.forEach(btn => {
        btn.classList.remove('text-brand-600');
        btn.classList.add('text-gray-400');
    });

    // Match sectionId to bottom nav button text or similar logic
    // Simplified: find by index or adding special IDs to bottom nav
    const bottomNavIds = {
        'dashboard': 0,
        'new-sale': 1,
        'history': 2,
        'expenses': 3,
        'projects': 4,
        'inquiries': 5,
        'suppliers': 6
    };
    if (bottomNavIds[sectionId] !== undefined) {
        const btn = bottomNavButtons[bottomNavIds[sectionId]];
        if (btn) {
            btn.classList.remove('text-gray-400');
            btn.classList.add('text-brand-600');
        }
    }

    // Refresh data based on section
    if (sectionId === 'dashboard') loadDashboard();
    if (sectionId === 'history') loadHistory();
    if (sectionId === 'new-sale') {
        resetSaleForm();
        generateReceiptNo();
        toggleSaleSlipField();
        updateSaleAutocomplete();
    }
    if (sectionId === 'expenses') {
        resetExpenseForm();
        loadExpenses();
        updateExpenseAutocomplete();
    }
    if (sectionId === 'projects') {
        resetProjectForm();
        loadProjects();
        updateProjectAutocomplete();
    }
    if (sectionId === 'inquiries') {
        resetInquiryForm();
        loadInquiries();
        updateInquiryAutocomplete();
    }
    if (sectionId === 'suppliers') {
        resetSupplierForm();
        loadSuppliers();
    }
    if (sectionId === 'salary-paysheet') {
        resetSalaryForm();
        loadSalaryPaysheets();
        loadSalarySummaryFromExpenses();
    }
    if (sectionId === 'reports') {
        // Set default month to current month
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        document.getElementById('report-month').value = `${yyyy}-${mm}`;
        generateReport(); // Load initially
    }
    if (sectionId === 'database') {
        loadOpeningBalances();
        if (typeof window.populateFirebaseUI === 'function') window.populateFirebaseUI();
    }
    if (sectionId === 'team-members') {
        resetTeamMemberForm();
        loadTeamMembers();
    }
    if (sectionId === 'payable-bills') {
        resetPayableBillForm();
        loadPayableBills();
    }
    if (sectionId === 'print-orders') {
        if (typeof window.loadPrintOrders === 'function') window.loadPrintOrders();
    }
}

window.toggleSaleSlipField = function () {
    const method = document.getElementById('payment-method').value;
    const container = document.getElementById('sale-slip-container');
    if (method === 'Bank Transfer') {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
        // Clear the file input if it's hidden
        const slipInput = document.getElementById('sale-slip');
        if (slipInput) slipInput.value = '';
    }
}

function togglePersonField() {
    const category = document.getElementById('expense-category').value;
    const personContainer = document.getElementById('person-field-container');
    const phoneContainer = document.getElementById('person-phone-container');

    if (category === 'Salary' || category === 'Salary Advance') {
        personContainer.classList.remove('hidden');
        phoneContainer.classList.remove('hidden');
        document.getElementById('expense-person').setAttribute('required', 'required');
    } else {
        personContainer.classList.add('hidden');
        phoneContainer.classList.add('hidden');
        document.getElementById('expense-person').removeAttribute('required');
    }
}

// --- 3. Dashboard Logic ---
async function loadDashboard() {
    try {
        const todayStr = new Date().toISOString().split('T')[0];
        const currentMonthYear = todayStr.substring(0, 7); // YYYY-MM

        // Fetch Projects for filtering
        const allProjectsData = await db.projects.toArray();
        const inactiveProjectIDs = allProjectsData
            .filter(p => p.status === 'On Hold' || p.status === 'Cancelled' || p.status === 'Not Confirmed')
            .map(p => p.projectID)
            .filter(id => id); // Remove empty/null

        // Fetch Sales Data
        const todaysSalesRaw = await db.sales.where('date').equals(todayStr).toArray();
        const monthSalesRaw = await db.sales.where('monthYear').equals(currentMonthYear).toArray();
        const allSalesCount = await db.sales.count();
        const unpaidSalesRaw = await db.sales.where('status').equals('UNPAID').toArray();

        // Filter Sales based on Project Status
        const todaysSales = todaysSalesRaw.filter(s => !inactiveProjectIDs.includes(s.projectId));
        const monthSales = monthSalesRaw.filter(s => !inactiveProjectIDs.includes(s.projectId));
        const unpaidSales = unpaidSalesRaw.filter(s => !inactiveProjectIDs.includes(s.projectId));

        // Fetch Expenses Data
        const monthExpenses = await db.expenses.where('monthYear').equals(currentMonthYear).toArray();

        // Fetch Projects Data
        const activeProjectsCount = await db.projects.where('status').equals('In Progress').count();

        // --- NEW: Calculate Live Balances (Current Month + Opening) ---
        // Use monthSalesRaw here because paid transactions in Quotations or Completed projects 
        // still represent money in the bank/cash box, they shouldn't be excluded!
        const currentMonthSales = monthSalesRaw.filter(s => s.status === 'PAID');

        // Get Opening Balances from settings
        const opCash = await db.settings.get('opening_cash_box');
        const opBank = await db.settings.get('opening_bank');

        let cashBoxBalance = parseFloat(opCash ? opCash.value : 0) || 0;
        let bankAccountBalance = parseFloat(opBank ? opBank.value : 0) || 0;

        currentMonthSales.forEach(s => {
            const amt = parseFloat(s.amount) || 0;
            if (s.paymentMethod === 'Cash') {
                cashBoxBalance += amt;
            } else {
                bankAccountBalance += amt; // Bank Transfer, Cheque
            }
        });

        monthExpenses.forEach(e => {
            const amt = parseFloat(e.amount) || 0;
            if (e.category === 'Bank to Cash - Transfer') {
                bankAccountBalance -= amt;
                cashBoxBalance += amt;
            } else if (e.category === 'Cash to Bank - Transfer') {
                cashBoxBalance -= amt;
                bankAccountBalance += amt;
            } else {
                // Regular Expense
                if (e.paymentMethod === 'Cash') {
                    cashBoxBalance -= amt;
                } else {
                    bankAccountBalance -= amt;
                }
            }
        });

        // Calculate Totals for Dashboard Cards
        const todayTotal = todaysSales
            .filter(s => s.status === 'PAID')
            .reduce((sum, s) => sum + parseFloat(s.amount), 0);

        const monthTotal = monthSales
            .filter(s => s.status === 'PAID')
            .reduce((sum, s) => sum + parseFloat(s.amount), 0);

        const expensesTotal = monthExpenses
            .filter(e => !e.category.includes('- Transfer'))
            .reduce((sum, e) => sum + parseFloat(e.amount), 0);

        // Update UI
        const formatLKR = (num) => 'LKR ' + num.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const cashEl = document.getElementById('cash-box-balance');
        const bankEl = document.getElementById('bank-balance');
        if (cashEl) cashEl.textContent = formatLKR(cashBoxBalance);
        if (bankEl) bankEl.textContent = formatLKR(bankAccountBalance);

        document.getElementById('today-total').textContent = formatLKR(todayTotal);
        document.getElementById('today-count').textContent = todaysSales.length;

        document.getElementById('month-total').textContent = formatLKR(monthTotal);

        // Month Name
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        document.getElementById('month-name').textContent = monthNames[new Date().getMonth()];

        document.getElementById('total-orders').textContent = allSalesCount;

        const expensesEl = document.getElementById('expenses-total');
        if (expensesEl) expensesEl.textContent = formatLKR(expensesTotal);

        const activeProjEl = document.getElementById('active-projects-count');
        if (activeProjEl) activeProjEl.textContent = activeProjectsCount;

        // --- NEW: Calculate Project Balances & Profit ---
        const allProjects = await db.projects.toArray();
        let totalPendingBalance = 0;
        let newProjectProfit = 0;
        const currentMonthPrefix = new Date().toISOString().substring(0, 7);

        allProjects.forEach(proj => {
            // Profit for new projects registered this month
            if (proj.monthYear === currentMonthPrefix || (proj.registrationDate && proj.registrationDate.startsWith(currentMonthPrefix))) {
                if (proj.status !== 'Cancelled' && proj.status !== 'Not Confirmed') {
                    const componentProfit = (proj.components || []).reduce((sum, c) => {
                        const sp = parseFloat(c.sellingPrice) || parseFloat(c.unitPrice) || 0;
                        const cp = parseFloat(c.costPrice) || parseFloat(c.unitPrice) || 0;
                        const qty = parseFloat(c.qty) || 0;
                        return sum + (qty * (sp - cp));
                    }, 0);
                    const discount = parseFloat(proj.discount) || 0;
                    const teamPayments = (proj.teamPayments || []).reduce((sum, t) => sum + (parseFloat(t.agreed) || 0), 0);
                    if (proj.isFullQuotation) {
                        newProjectProfit += (componentProfit - teamPayments - discount);
                    } else {
                        const budget = parseFloat(proj.budget) || 0;
                        newProjectProfit += (budget - teamPayments - discount + componentProfit);
                    }
                }
            }

            // Don't count pending budget for On Hold, Cancelled or Not Confirmed projects
            if (proj.status === 'On Hold' || proj.status === 'Cancelled' || proj.status === 'Not Confirmed') return;

            const serviceRevenue = parseFloat(proj.budget) || 0;
            let componentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
            if (proj.isFullQuotation) componentCost = 0;
            const discount = parseFloat(proj.discount) || 0;
            const revenue = (serviceRevenue + componentCost) - discount;
            const received = (proj.clientPayments || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            const balance = revenue - received;
            if (balance > 1) {
                totalPendingBalance += balance;
            }
        });

        // Calculate Total Material Profit across active projects
        let totalMaterialProfit = 0;
        allProjects.forEach(proj => {
            if (proj.status !== 'Cancelled' && proj.status !== 'Not Confirmed') {
                const compProf = (proj.components || []).reduce((sum, c) => {
                    const sp = parseFloat(c.sellingPrice) || parseFloat(c.unitPrice) || 0;
                    const cp = parseFloat(c.costPrice) || parseFloat(c.unitPrice) || 0;
                    const qty = parseFloat(c.qty) || 0;
                    return sum + (qty * (sp - cp));
                }, 0);
                totalMaterialProfit += compProf;
            }
        });

        const matProfitTotalEl = document.getElementById('total-material-profit');
        if (matProfitTotalEl) matProfitTotalEl.textContent = formatLKR(totalMaterialProfit);

        const pendingTotalEl = document.getElementById('pending-payments-total');
        if (pendingTotalEl) pendingTotalEl.textContent = formatLKR(totalPendingBalance);

        const newProjProfitEl = document.getElementById('monthly-project-profit');
        if (newProjProfitEl) newProjProfitEl.textContent = formatLKR(newProjectProfit);

        // Load Urgent Project Deadlines (<= 2 days remaining)
        await loadUrgentDeadlinesWidget(allProjects, todayStr);

        // Load Recent Transactions (Limit 5)
        loadRecentTransactions();

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

async function loadRecentTransactions() {
    const tableBody = document.getElementById('recent-transactions-body');
    try {
        const recentSales = await db.sales.orderBy('timestamp').reverse().limit(5).toArray();

        if (recentSales.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">No transactions found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = recentSales.map(sale => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-mono text-xs font-medium text-gray-900">${sale.receiptNo}</td>
                <td class="px-6 py-4">${sale.date}</td>
                <td class="px-6 py-4 font-medium text-gray-800">${sale.customerName}</td>
                <td class="px-6 py-4 font-mono font-bold text-gray-700">LKR ${parseFloat(sale.amount).toFixed(2)}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${sale.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                        ${sale.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <button onclick="reprintReceipt(${sale.id})" class="text-brand-600 hover:text-brand-800 text-sm font-medium hover:underline p-1" title="Print 80mm">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    <button onclick="downloadReceiptPDF(${sale.id})" class="text-gray-500 hover:text-blue-600 text-sm font-medium hover:underline p-1" title="Download A4 PDF">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        console.error("Error loading recent:", e);
    }
}

window.showPendingPayments = async function () {
    const section = document.getElementById('pending-projects-section');
    const tableBody = document.getElementById('pending-projects-body');

    const newProjSection = document.getElementById('new-projects-section');
    if (newProjSection) newProjSection.classList.add('hidden');

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });

    try {
        const allProjects = await db.projects.toArray();
        const pending = allProjects.map(proj => {
            const serviceRevenue = parseFloat(proj.budget) || 0;
            let componentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
            if (proj.isFullQuotation) componentCost = 0;
            const discount = parseFloat(proj.discount) || 0;
            const revenue = (serviceRevenue + componentCost) - discount;
            const received = (proj.clientPayments || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            const balance = revenue - received;
            return { ...proj, revenue, received, balance };
        }).filter(p => p.balance > 1 && p.status !== 'On Hold' && p.status !== 'Cancelled' && p.status !== 'Not Confirmed');

        if (pending.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">No pending payments. All projects settled!</td></tr>`;
            return;
        }

        tableBody.innerHTML = pending.map(proj => `
            <tr class="hover:bg-gray-50 border-b border-gray-50">
                <td class="px-6 py-4 font-mono text-xs text-gray-400">${proj.projectID}</td>
                <td class="px-6 py-4 font-bold text-gray-800">${proj.name}</td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-700">${proj.customerName}</div>
                    <div class="text-[10px] text-gray-400">${proj.customerPhone || ''}</div>
                </td>
                <td class="px-6 py-4 text-right font-mono text-gray-600">LKR ${proj.revenue.toLocaleString()}</td>
                <td class="px-6 py-4 text-right font-mono text-blue-600">LKR ${proj.received.toLocaleString()}</td>
                <td class="px-6 py-4 text-right font-mono font-bold text-red-600">LKR ${proj.balance.toLocaleString()}</td>
                <td class="px-6 py-4 text-center">
                    <div class="flex justify-center gap-2">
                        <button onclick="showSection('projects'); setTimeout(() => editProject(${proj.id}), 100)" 
                                class="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all">
                            Collect Payment
                        </button>
                        <button onclick="shareSettlementLink(${proj.id})" 
                                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all flex items-center gap-1 border border-blue-200"
                                title="Send Live Settlement Link via WhatsApp">
                            <i class="fa-solid fa-share-nodes"></i> Live Bill
                        </button>
                        <button onclick="sendPaymentReminder(${proj.id})" 
                                class="bg-brand-50 text-brand-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-100 transition-all flex items-center gap-1 border border-brand-200"
                                title="Send WhatsApp Reminder">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

    } catch (e) {
        console.error("Error loading pending projects:", e);
    }
}

window.showNewProjectsMonth = async function () {
    const section = document.getElementById('new-projects-section');
    const tableBody = document.getElementById('new-projects-body');

    const pendingSection = document.getElementById('pending-projects-section');
    if (pendingSection) pendingSection.classList.add('hidden');

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });

    try {
        const allProjects = await db.projects.toArray();
        const currentMonthPrefix = new Date().toISOString().substring(0, 7);

        const newProjects = allProjects.filter(proj => {
            if (proj.status === 'Cancelled' || proj.status === 'Not Confirmed') return false;
            return proj.monthYear === currentMonthPrefix || (proj.registrationDate && proj.registrationDate.startsWith(currentMonthPrefix));
        }).map(proj => {
            const componentProfit = (proj.components || []).reduce((sum, c) => {
                const sp = parseFloat(c.sellingPrice) || parseFloat(c.unitPrice) || 0;
                const cp = parseFloat(c.costPrice) || parseFloat(c.unitPrice) || 0;
                const qty = parseFloat(c.qty) || 0;
                return sum + (qty * (sp - cp));
            }, 0);
            const discount = parseFloat(proj.discount) || 0;
            const teamPayments = (proj.teamPayments || []).reduce((sum, t) => sum + (parseFloat(t.agreed) || 0), 0);
            let profit = 0;
            if (proj.isFullQuotation) {
                profit = componentProfit - teamPayments - discount;
            } else {
                const budget = parseFloat(proj.budget) || 0;
                profit = budget - teamPayments - discount + componentProfit;
            }
            return { ...proj, profit };
        });

        if (newProjects.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">No new projects registered this month.</td></tr>`;
            return;
        }

        tableBody.innerHTML = newProjects.map(proj => `
            <tr class="hover:bg-gray-50 border-b border-emerald-50">
                <td class="px-6 py-4 font-mono text-xs text-emerald-600/70">${proj.projectID || 'PERSONAL'}</td>
                <td class="px-6 py-4 font-bold text-gray-800">${proj.name}</td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-700">${proj.customerName}</div>
                    <div class="text-[10px] text-gray-400">${proj.customerPhone || ''}</div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">${proj.registrationDate}</td>
                <td class="px-6 py-4 text-right font-mono font-bold text-emerald-600">LKR ${proj.profit.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-6 py-4 text-center">
                    <button onclick="showSection('projects'); setTimeout(() => editProject(${proj.id}), 100)" 
                            class="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all border border-emerald-200 shadow-sm">
                        View Project
                    </button>
                </td>
            </tr>
        `).join('');

    } catch (e) {
        console.error("Error loading new projects:", e);
    }
}

window.showMaterialProfitReport = async function () {
    const section = document.getElementById('material-profit-section');
    const tableBody = document.getElementById('material-profit-body');

    const pendingSection = document.getElementById('pending-projects-section');
    if (pendingSection) pendingSection.classList.add('hidden');

    const newProjSection = document.getElementById('new-projects-section');
    if (newProjSection) newProjSection.classList.add('hidden');

    if (section) section.classList.remove('hidden');
    if (section) section.scrollIntoView({ behavior: 'smooth' });

    try {
        const allProjects = await db.projects.toArray();
        let grandSelling = 0;
        let grandCost = 0;
        let grandProfit = 0;

        const matProjects = allProjects.filter(proj => {
            if (proj.status === 'Cancelled' || proj.status === 'Not Confirmed') return false;
            return proj.components && proj.components.length > 0;
        }).map(proj => {
            let sellingTotal = 0;
            let costTotal = 0;

            proj.components.forEach(c => {
                const qty = parseFloat(c.qty) || 0;
                const sp = parseFloat(c.sellingPrice) || parseFloat(c.unitPrice) || 0;
                const cp = parseFloat(c.costPrice) || parseFloat(c.unitPrice) || 0;
                sellingTotal += (qty * sp);
                costTotal += (qty * cp);
            });

            const matProfit = sellingTotal - costTotal;
            grandSelling += sellingTotal;
            grandCost += costTotal;
            grandProfit += matProfit;

            return { ...proj, sellingTotal, costTotal, matProfit };
        });

        const sellEl = document.getElementById('mat-summary-selling');
        if (sellEl) sellEl.textContent = `LKR ${grandSelling.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
        const costEl = document.getElementById('mat-summary-cost');
        if (costEl) costEl.textContent = `LKR ${grandCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
        const profEl = document.getElementById('mat-summary-profit');
        if (profEl) profEl.textContent = `LKR ${grandProfit.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;

        if (!tableBody) return;

        if (matProjects.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">No project material component invoices found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = matProjects.map(proj => `
            <tr class="hover:bg-gray-50 border-b border-purple-50">
                <td class="px-6 py-4 font-mono text-xs text-purple-600 font-bold">${proj.projectID || 'PERSONAL'}</td>
                <td class="px-6 py-4 font-bold text-gray-800">${proj.name}</td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-700">${proj.customerName}</div>
                    <div class="text-[10px] text-gray-400">${proj.customerPhone || ''}</div>
                </td>
                <td class="px-6 py-4 text-right font-mono text-gray-700">LKR ${proj.sellingTotal.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-6 py-4 text-right font-mono text-red-600">LKR ${proj.costTotal.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-6 py-4 text-right font-mono font-bold text-emerald-600">LKR ${proj.matProfit.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-6 py-4 text-center">
                    <div class="flex justify-center gap-2">
                        <button onclick="showComponentProfitModal(${proj.id})" 
                                class="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-700 transition-all shadow-sm flex items-center gap-1">
                            <i class="fa-solid fa-list-check"></i> Item Breakdown
                        </button>
                        <button onclick="showSection('projects'); setTimeout(() => editProject(${proj.id}), 100)" 
                                class="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-100 transition-all border border-purple-200">
                            Edit Project
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

    } catch (e) {
        console.error("Error loading material profit breakdown:", e);
    }
};

window.showComponentProfitModal = async function (id) {
    try {
        const proj = await db.projects.get(parseInt(id));
        if (!proj) return alert('Project not found!');

        document.getElementById('modal-mat-title').innerHTML = `<i class="fa-solid fa-boxes-packing mr-2"></i> Material Invoice Itemized Profit`;
        document.getElementById('modal-mat-subtitle').textContent = `${proj.projectID || 'PERSONAL'} - ${proj.name} (${proj.customerName})`;

        const itemsBody = document.getElementById('modal-mat-items-body');
        let totalSelling = 0;
        let totalCost = 0;
        let totalProfit = 0;

        if (proj.components && proj.components.length > 0) {
            itemsBody.innerHTML = proj.components.map((c, idx) => {
                const qty = parseFloat(c.qty) || 0;
                const sp = parseFloat(c.sellingPrice) || parseFloat(c.unitPrice) || 0;
                const cp = parseFloat(c.costPrice) || parseFloat(c.unitPrice) || 0;

                const totCost = qty * cp;
                const totSelling = qty * sp;
                const itemProfit = totSelling - totCost;

                totalSelling += totSelling;
                totalCost += totCost;
                totalProfit += itemProfit;

                return `
                    <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-purple-50/20'} border-b border-gray-50">
                        <td class="px-4 py-3 font-bold text-gray-800">${c.name}</td>
                        <td class="px-4 py-3 text-center font-mono font-semibold">${qty}</td>
                        <td class="px-4 py-3 text-right font-mono text-gray-500">LKR ${cp.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                        <td class="px-4 py-3 text-right font-mono text-gray-700">LKR ${sp.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                        <td class="px-4 py-3 text-right font-mono text-red-600 font-semibold">LKR ${totCost.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                        <td class="px-4 py-3 text-right font-mono text-purple-600 font-semibold">LKR ${totSelling.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                        <td class="px-4 py-3 text-right font-mono font-bold ${itemProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}">LKR ${itemProfit.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                    </tr>
                `;
            }).join('');
        } else {
            itemsBody.innerHTML = `<tr><td colspan="7" class="px-4 py-6 text-center text-gray-400 italic">No component items found for this project.</td></tr>`;
        }

        document.getElementById('modal-mat-selling').textContent = `LKR ${totalSelling.toLocaleString('en-LK', {minimumFractionDigits: 2})}`;
        document.getElementById('modal-mat-cost').textContent = `LKR ${totalCost.toLocaleString('en-LK', {minimumFractionDigits: 2})}`;
        document.getElementById('modal-mat-profit').textContent = `LKR ${totalProfit.toLocaleString('en-LK', {minimumFractionDigits: 2})}`;

        const modal = document.getElementById('component-profit-modal');
        if (modal) modal.classList.remove('hidden');
    } catch (e) {
        console.error("Error opening component profit modal:", e);
    }
};

window.closeComponentProfitModal = function () {
    const modal = document.getElementById('component-profit-modal');
    if (modal) modal.classList.add('hidden');
};


async function generateProjectID() {
    try {
        const projects = await db.projects.toArray();
        let maxNum = 1400;
        projects.forEach(p => {
            if (!p.isPersonal && p.projectID && p.projectID.startsWith('QUO-')) {
                const numStr = p.projectID.replace('QUO-', '');
                const num = parseInt(numStr, 10);
                if (!isNaN(num) && num > maxNum) {
                    maxNum = num;
                }
            }
        });
        const nextId = maxNum + 1;
        const paddedId = String(nextId).padStart(5, '0');
        const idField = document.getElementById('project-custom-id');
        if (idField && !document.getElementById('project-is-personal').checked) {
            idField.value = `QUO-${paddedId}`;
        }
    } catch (e) {
        console.error("Error generating project ID:", e);
        const idField = document.getElementById('project-custom-id');
        if (idField) idField.value = `QUO-014XX`;
    }
}

window.togglePersonalProject = function(isPersonal, isEdit = false) {
    const idField = document.getElementById('project-custom-id');
    if (isPersonal) {
        idField.value = '';
        idField.disabled = true;
        idField.required = false;
        idField.placeholder = "Personal Project (No Code)";
        idField.classList.add('bg-gray-50', 'text-gray-400');
    } else {
        idField.disabled = false;
        idField.required = true;
        idField.placeholder = "QUO-01401";
        idField.classList.remove('bg-gray-50', 'text-gray-400');
        if (!isEdit) {
            generateProjectID();
        }
    }
};

// --- 4. Sales Logic ---
// Helper: Get next Sequential Receipt No (Unified for Sales & Project Payments)
async function getNextReceiptNo() {
    try {
        const allSales = await db.sales.toArray();
        let maxNum = 99; // So the next one is 100
        allSales.forEach(s => {
            if (s.receiptNo && s.receiptNo.startsWith('REC ')) {
                const num = parseInt(s.receiptNo.replace('REC ', ''));
                if (!isNaN(num) && num > maxNum) maxNum = num;
            }
        });
        return `REC ${String(maxNum + 1).padStart(4, '0')}`;
    } catch (e) {
        console.error("Error calculating next receipt no:", e);
        return "REC ????";
    }
}

async function generateReceiptNo() {
    const nextNo = await getNextReceiptNo();
    document.getElementById('receipt-no').value = nextNo;
}

document.getElementById('sale-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('sale-id').value;
        const receiptNo = document.getElementById('receipt-no').value;
        const date = document.getElementById('sale-date').value;
        const customerName = document.getElementById('customer-name').value;
        const invoiceNo = document.getElementById('invoice-no').value || '-';
        const paymentMethod = document.getElementById('payment-method').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const status = document.getElementById('payment-status').value;
        const slipInput = document.getElementById('sale-slip');

        let slip = '';
        if (id) {
            const oldSale = await db.sales.get(parseInt(id));
            if (oldSale) slip = oldSale.slip;
        }

        if (paymentMethod === 'Bank Transfer' && slipInput.files && slipInput.files[0]) {
            slip = await window.compressImageFile(slipInput.files[0]);
        }

        if (!date || !customerName || isNaN(amount)) {
            alert('Please fill in all required fields correctly.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        let oldSale = null;
        if (id) {
            try {
                oldSale = await db.sales.get(parseInt(id));
            } catch (e) { }
            if (!slip && oldSale && oldSale.slip) {
                slip = oldSale.slip;
            }
        }

        const saleData = {
            receiptNo,
            date,
            customerName,
            invoiceNo,
            paymentMethod,
            amount: amount || 0,
            status,
            slip,
            monthYear: date.substring(0, 7),
            timestamp: (oldSale && oldSale.timestamp) ? oldSale.timestamp : Date.now()
        };

        if (id) {
            saleData.id = parseInt(id);
            await db.sales.put(saleData);
            alert('Sale updated successfully!');
        } else {
            const newId = await db.sales.add(saleData);
            saleData.id = newId;
            try {
                await printReceipt(saleData);
            } catch (printError) {
                console.error("Printing failed:", printError);
                alert('Data saved successfully, but printing failed.');
            }
        }

        resetSaleForm();
        showSection('dashboard');

    } catch (error) {
        console.error("Error saving sale:", error);
        alert('Error saving data. Please try again.');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// --- 5. Printing Logic (80mm) ---
async function printReceipt(saleData) {
    document.getElementById('print-receipt-no').textContent = saleData.receiptNo;
    document.getElementById('print-date').textContent = saleData.date;
    document.getElementById('print-customer').textContent = saleData.customerName;
    document.getElementById('print-invoice').textContent = saleData.invoiceNo || '-';
    // Use projectId if available, otherwise hide or show dash
    const projEl = document.getElementById('print-project-id');
    if (projEl) {
        const displayID = (saleData.projectId && saleData.projectId.startsWith('PERSONAL-')) ? 'PERSONAL' : (saleData.projectId || saleData.invoiceNo || '-');
        projEl.textContent = displayID;
    }

    document.getElementById('print-method').textContent = saleData.paymentMethod.toUpperCase();
    document.getElementById('print-status').textContent = saleData.status;
    document.getElementById('print-amount').textContent = parseFloat(saleData.amount).toFixed(2);

    return new Promise((resolve) => {
        document.body.classList.add('printing-receipt');
        setTimeout(() => {
            window.print();
            document.body.classList.remove('printing-receipt');
            resolve();
        }, 500);
    });
}

async function reprintReceipt(id) {
    try {
        const sale = await db.sales.get(id);
        if (sale) {
            await printReceipt(sale);
        } else {
            alert('Receipt not found!');
        }
    } catch (e) {
        console.error(e);
    }
}

window.shareSaleBillLink = async function (id) {
    try {
        const sale = await db.sales.get(parseInt(id));
        if (!sale) return alert('Sale not found!');
        let origin = window.location.origin;
        if (!origin || origin === 'null' || origin.includes('localhost') || origin.includes('127.0.0.1')) {
            origin = 'https://kutuss-665c6.web.app';
        }
        const liveUrl = `${origin}/?bill=${encodeURIComponent(sale.receiptNo || sale.id)}`;
        const message = `*PAYMENT RECEIPT* 🧾\n` +
            `*Kutuss Design Lab (Pvt) Ltd*\n\n` +
            `Hi *${sale.customerName}*,\n` +
            `Receipt No: *${sale.receiptNo}*\n` +
            `Amount: *LKR ${parseFloat(sale.amount).toFixed(2)}*\n` +
            `Payment Method: *${sale.paymentMethod}*\n` +
            `Status: *${sale.status}*\n\n` +
            `👉 *View Official Digital Receipt Online:*\n${liveUrl}\n\n` +
            `Thank you for your business! 🖌️\n*Kutuss Design Lab*`;
        shareToWhatsApp(sale.customerPhone || '', message);
    } catch (e) {
        console.error(e);
    }
};

window.copySaleBillLink = async function (id) {
    try {
        const sale = await db.sales.get(parseInt(id));
        if (!sale) return alert('Sale not found!');
        let origin = window.location.origin;
        if (!origin || origin === 'null' || origin.includes('localhost') || origin.includes('127.0.0.1')) {
            origin = 'https://kutuss-665c6.web.app';
        }
        const liveUrl = `${origin}/?bill=${encodeURIComponent(sale.receiptNo || sale.id)}`;
        await navigator.clipboard.writeText(liveUrl);
        alert(`✅ Live Receipt Link copied to clipboard!\n\n${liveUrl}`);
    } catch (e) {
        console.error(e);
    }
};

// --- 6. History Logic ---
async function loadHistory() {
    const tableBody = document.getElementById('history-table-body');
    const searchTerm = document.getElementById('search-history').value.toLowerCase();

    try {
        let sales = await db.sales.orderBy('timestamp').reverse().toArray();

        if (searchTerm) {
            sales = sales.filter(s =>
                s.receiptNo.toLowerCase().includes(searchTerm) ||
                s.customerName.toLowerCase().includes(searchTerm)
            );
        }

        if (sales.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="8" class="px-6 py-8 text-center text-gray-400">No history found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = sales.map(sale => `
            <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50">
                <td class="px-6 py-4 font-mono text-xs font-medium text-gray-900">${sale.receiptNo}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${sale.date}</td>
                <td class="px-6 py-4 font-medium text-gray-800">${sale.customerName}</td>
                <td class="px-6 py-4 text-xs text-gray-400">${sale.invoiceNo}</td>
                <td class="px-6 py-4 text-center">
                    <span class="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">${sale.paymentMethod}</span>
                </td>
                <td class="px-6 py-4 text-right font-mono font-bold text-gray-700">
                    ${parseFloat(sale.amount).toFixed(2)}
                </td>
                <td class="px-6 py-4 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${sale.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                        ${sale.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <button onclick="editSale(${sale.id})" class="p-1 text-gray-400 hover:text-brand-600 transition-colors" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="shareSaleBillLink(${sale.id})" class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors" title="Send Live Bill to Customer via WhatsApp">
                        <i class="fa-solid fa-share-nodes"></i>
                    </button>
                    <button onclick="copySaleBillLink(${sale.id})" class="p-1 text-blue-500 hover:text-blue-700 transition-colors" title="Copy Live Bill Link">
                        <i class="fa-solid fa-link"></i>
                    </button>
                    <button onclick="reprintReceipt(${sale.id})" class="p-1 text-gray-500 hover:text-brand-600 transition-colors" title="Print Again">
                        <i class="fa-solid fa-print"></i>
                    </button>
                     <button onclick="downloadReceiptPDF(${sale.id})" class="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="Download A4 PDF">
                        <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    ${sale.slip ? `
                        <button onclick="viewSaleSlip(${sale.id})" class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors" title="View Slip">
                            <i class="fa-solid fa-image"></i>
                        </button>
                    ` : ''}
                    <button onclick="deleteSale(${sale.id})" class="p-1 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

    } catch (e) {
        console.error("Error loading history:", e);
    }
}

document.getElementById('search-history').addEventListener('input', () => {
    loadHistory();
});

const searchInquiries = document.getElementById('search-inquiries');
if (searchInquiries) {
    searchInquiries.addEventListener('input', () => {
        loadInquiries();
    });
}

const searchSuppliers = document.getElementById('search-suppliers');
if (searchSuppliers) {
    searchSuppliers.addEventListener('input', () => {
        loadSuppliers();
    });
}

async function deleteSale(id) {
    if (confirm('Are you sure you want to delete this record? This cannot be undone.')) {
        try {
            const numId = parseInt(id, 10);
            await db.sales.delete(!isNaN(numId) ? numId : id);
            loadHistory();
            loadDashboard();
        } catch (e) {
            console.error(e);
            alert('Error deleting record');
        }
    }
}

window.viewSaleSlip = async function (id) {
    try {
        const sale = await db.sales.get(id);
        if (sale && sale.slip) {
            const win = window.open();
            win.document.write(`
                <html>
                <body style="margin:0; background:#1a1a1a; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                    <img src="${sale.slip}" style="max-width:90%; max-height:90vh; box-shadow:0 0 50px rgba(0,0,0,0.5); cursor:pointer;" onclick="window.close()">
                </body>
                </html>
            `);
        }
    } catch (e) {
        console.error(e);
    }
}

window.editSale = async function (id) {
    try {
        const sale = await db.sales.get(id);
        if (!sale) return;

        showSection('new-sale');
        document.getElementById('sale-id').value = sale.id;
        document.getElementById('receipt-no').value = sale.receiptNo;
        document.getElementById('sale-date').value = sale.date;
        document.getElementById('customer-name').value = sale.customerName;
        document.getElementById('invoice-no').value = sale.invoiceNo === '-' ? '' : sale.invoiceNo;
        document.getElementById('payment-method').value = sale.paymentMethod;
        document.getElementById('amount').value = sale.amount;
        document.getElementById('payment-status').value = sale.status;

        toggleSaleSlipField();

        document.getElementById('sale-form-title').textContent = 'Edit Sale';
        document.getElementById('sale-submit-btn').innerHTML = '<i class="fa-solid fa-save"></i> Update Sale';
    } catch (e) {
        console.error(e);
    }
};

window.resetSaleForm = function () {
    document.getElementById('sale-form').reset();
    document.getElementById('sale-id').value = '';
    document.getElementById('sale-form-title').textContent = 'New Sale';
    document.getElementById('sale-submit-btn').innerHTML = '<i class="fa-solid fa-print"></i> Save & Print Receipt';
    const today = new Date();
    document.getElementById('sale-date').valueAsDate = today;
    generateReceiptNo();
};

// --- 7. Expenses Logic ---
async function generateExpenseNo() {
    try {
        const expenses = await db.expenses.toArray();
        let maxNum = 0;
        expenses.forEach(e => {
            if (e.invoiceNo && e.invoiceNo.startsWith('EX ')) {
                const num = parseInt(e.invoiceNo.replace('EX ', ''));
                if (!isNaN(num) && num > maxNum) maxNum = num;
            }
        });
        const paddedId = String(maxNum + 1).padStart(4, '0');
        document.getElementById('expense-invoice').value = `EX ${paddedId}`;
    } catch (e) {
        console.error("Error generating expense no:", e);
    }
}

async function loadExpenses() {
    const tableBody = document.getElementById('expense-table-body');
    try {
        const expenses = await db.expenses.orderBy('timestamp').reverse().toArray();

        if (expenses.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">No expenses recorded.</td></tr>`;
            return;
        }

        tableBody.innerHTML = expenses.map(exp => {
            const isSalary = exp.category === 'Salary' || exp.category === 'Salary Advance';
            const isTransfer = exp.category.includes('- Transfer');
            return `
            <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">${exp.date}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-lg bg-gray-100 text-xs font-semibold text-gray-700">${exp.category}</span>
                    ${exp.personName ? `<div class="text-xs text-gray-500 mt-1"><i class="fa-solid fa-user"></i> ${exp.personName}</div>` : ''}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                    ${exp.description}
                    ${exp.invoiceNo ? `<div class="text-xs text-gray-400 mt-1">Ref: ${exp.invoiceNo}</div>` : ''}
                </td>
                <td class="px-6 py-4 text-center text-xs text-gray-500">${exp.paymentMethod}</td>
                <td class="px-6 py-4 text-right font-mono font-bold ${isTransfer ? 'text-blue-600' : 'text-red-600'}">
                    ${isTransfer ? 'â‡…' : '-'} LKR ${parseFloat(exp.amount).toFixed(2)}
                </td>
                <td class="px-6 py-4 text-center">
                    ${exp.attachment ? `
                        <button onclick="viewAttachment('${exp.id}')" class="text-brand-600 hover:text-brand-800 transition-colors" title="View Invoice">
                            <i class="fa-solid ${exp.attachment.startsWith('data:application/pdf') ? 'fa-file-pdf' : 'fa-image'} text-lg"></i>
                        </button>
                    ` : '<span class="text-gray-300">-</span>'}
                </td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <button onclick="editExpense(${exp.id})" class="p-1 text-gray-400 hover:text-brand-600 transition-colors" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    ${isSalary ? `
                        <button onclick="sendSalaryWA(${exp.id})" class="p-1 text-emerald-500 hover:text-emerald-700 transition-colors" title="Send WhatsApp">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                        </button>
                        <button onclick="printPayslip(${exp.id})" class="p-1 text-gray-500 hover:text-brand-600 transition-colors" title="Print Slip">
                            <i class="fa-solid fa-print"></i>
                        </button>
                        <button onclick="downloadPayslipPDF(${exp.id})" class="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="Download PDF">
                            <i class="fa-solid fa-file-pdf"></i>
                        </button>
                    ` : ''}
                    <button onclick="deleteExpense(${exp.id})" class="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `}).join('');
    } catch (e) {
        console.error("Error loading expenses:", e);
    }
}

window.viewAttachment = async function (id) {
    try {
        const exp = await db.expenses.get(Number(id));
        if (exp && exp.attachment) {
            const win = window.open();
            if (exp.attachment.startsWith('data:application/pdf')) {
                win.document.write(`
                    <title>Invoice - ${exp.invoiceNo || exp.id}</title>
                    <body style="margin:0; height:100vh;">
                        <embed src="${exp.attachment}" type="application/pdf" width="100%" height="100%" />
                    </body>
                `);
            } else {
                win.document.write(`
                    <title>Invoice - ${exp.invoiceNo || exp.id}</title>
                    <body style="margin:0; background:#f3f4f6; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                        <img src="${exp.attachment}" style="max-width:95%; max-height:95vh; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); border-radius:8px;">
                    </body>
                `);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // UI Loading State
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('expense-id').value;
        const date = document.getElementById('expense-date').value;
        const invoiceNo = document.getElementById('expense-invoice').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        const personName = document.getElementById('expense-person').value;
        const paymentMethod = document.getElementById('expense-method').value;
        const description = document.getElementById('expense-desc').value;
        const fileInput = document.getElementById('expense-file');

        let attachment = '';
        if (id) {
            const oldExp = await db.expenses.get(parseInt(id));
            if (oldExp) attachment = oldExp.attachment;
        }

        if (fileInput.files && fileInput.files[0]) {
            attachment = await window.compressImageFile(fileInput.files[0]);
        }

        if (!date || !amount || !category) {
            alert('Please fill in required fields');
            return;
        }

        const expenseData = {
            date,
            invoiceNo,
            amount,
            category,
            personName: (category.includes('Salary')) ? personName : '',
            personPhone: (category.includes('Salary')) ? document.getElementById('expense-person-phone').value : '',
            paymentMethod,
            description,
            attachment,
            monthYear: date.substring(0, 7),
            timestamp: (oldExp && oldExp.timestamp) ? oldExp.timestamp : Date.now()
        };

        if (id) {
            expenseData.id = parseInt(id);
            await db.expenses.put(expenseData);
            alert('Expense updated successfully!');
        } else {
            // Find highest existing ID to prevent any collision across devices or WebKit auto-increment bugs
            const lastExp = await db.expenses.orderBy('id').last();
            const nextId = (lastExp && typeof lastExp.id === 'number' && !isNaN(lastExp.id)) ? lastExp.id + 1 : 1;
            expenseData.id = nextId;
            const newId = await db.expenses.put(expenseData);
            alert('Expense added successfully!');

            // If it's a salary, ask to send WhatsApp
            if (category.includes('Salary') && expenseData.personPhone) {
                if (confirm('Do you want to send a WhatsApp message for this payment?')) {
                    sendSalaryWA(newId);
                }
            }
        }

        resetExpenseForm();
        loadExpenses();
        loadDashboard();

    } catch (e) {
        console.error("Error saving expense:", e);
        alert('Failed to save expense');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

window.editExpense = async function (id) {
    try {
        const exp = await db.expenses.get(id);
        if (!exp) return;

        document.getElementById('expense-id').value = exp.id;
        document.getElementById('expense-date').value = exp.date;
        document.getElementById('expense-invoice').value = exp.invoiceNo || '';
        document.getElementById('expense-amount').value = exp.amount;
        document.getElementById('expense-category').value = exp.category;
        document.getElementById('expense-person').value = exp.personName || '';
        document.getElementById('expense-person-phone').value = exp.personPhone || '';
        document.getElementById('expense-method').value = exp.paymentMethod;
        document.getElementById('expense-desc').value = exp.description || '';

        togglePersonField();

        document.getElementById('expense-form-title').textContent = 'Edit Expense';
        document.getElementById('expense-submit-btn').innerHTML = '<i class="fa-solid fa-save"></i> Update Expense';
        document.getElementById('cancel-expense-btn').classList.remove('hidden');

        document.getElementById('expenses-section').scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
        console.error(e);
    }
};

window.resetExpenseForm = function () {
    document.getElementById('expense-form').reset();
    document.getElementById('expense-id').value = '';
    document.getElementById('expense-form-title').textContent = 'Add New Expense';
    document.getElementById('expense-submit-btn').innerHTML = '<i class="fa-solid fa-plus"></i> Add Expense';
    document.getElementById('cancel-expense-btn').classList.add('hidden');
    const today = new Date();
    document.getElementById('expense-date').valueAsDate = today;
    document.getElementById('expense-person-phone').value = '';
    togglePersonField();
    generateExpenseNo();
};

async function deleteExpense(id) {
    if (confirm('Delete this expense record?')) {
        const numId = parseInt(id, 10);
        await db.expenses.delete(!isNaN(numId) ? numId : id);
        loadExpenses();
        loadDashboard();
    }
}

// --- 8. Reporting Logic ---
// --- 8. Reporting Logic ---
async function generateReport() {
    const monthInput = document.getElementById('report-month');
    const monthStr = monthInput ? monthInput.value : ''; // YYYY-MM
    if (!monthStr) return;

    const [year, month] = monthStr.split('-');
    const labelEl = document.getElementById('report-period-label');
    const dateEl = document.getElementById('report-gen-date');
    const methodFilter = document.getElementById('report-method-filter')?.value || 'ALL';

    const dateObj = new Date(year, month - 1);
    const monthName = dateObj.toLocaleString('default', { month: 'long' });
    if (labelEl) labelEl.textContent = `Period: ${monthName.toUpperCase()} ${year}`;
    if (dateEl) dateEl.textContent = new Date().toLocaleString('en-LK');

    try {
        // Fetch Projects for inactive filter
        const allProjectsData = await db.projects.toArray();
        const inactiveProjectIDs = allProjectsData
            .filter(p => p.status === 'On Hold' || p.status === 'Cancelled' || p.status === 'Not Confirmed')
            .map(p => p.projectID)
            .filter(Boolean);

        // Fetch all sales & expenses matching month
        const allSales = await db.sales.toArray();
        const allExpenses = await db.expenses.toArray();

        const monthSalesRaw = allSales.filter(s => s.monthYear === monthStr || (s.date && s.date.startsWith(monthStr)));
        const monthExpensesRaw = allExpenses.filter(e => e.monthYear === monthStr || (e.date && e.date.startsWith(monthStr)));

        // Filter Sales: Active projects only and status === 'PAID'
        const activeSales = monthSalesRaw.filter(s => !s.projectId || !inactiveProjectIDs.includes(s.projectId));
        const paidSales = activeSales.filter(s => (s.status || '').toUpperCase() === 'PAID');

        // Filter Expenses: Exclude internal transfers for operating calculations
        const operatingExpenses = monthExpensesRaw.filter(e => !e.category || !e.category.includes('- Transfer'));

        // Helper: Check payment method
        const isCash = m => !m || String(m).toLowerCase().includes('cash');
        const isBank = m => Boolean(m && (String(m).toLowerCase().includes('bank') || String(m).toLowerCase().includes('transfer')));

        // 1. Calculate Inflows (Sales)
        let totalSales = 0, cashSales = 0, bankSales = 0;
        let cashSalesCount = 0, bankSalesCount = 0;
        paidSales.forEach(s => {
            const amt = parseFloat(s.amount) || 0;
            totalSales += amt;
            if (isCash(s.paymentMethod)) {
                cashSales += amt;
                cashSalesCount++;
            } else {
                bankSales += amt;
                bankSalesCount++;
            }
        });

        // 2. Calculate Outflows (Operating Expenses) & Group by Category
        let totalExpenses = 0, cashExpenses = 0, bankExpenses = 0;
        let cashExpCount = 0, bankExpCount = 0;
        const categoryMap = {};

        operatingExpenses.forEach(e => {
            const amt = parseFloat(e.amount) || 0;
            totalExpenses += amt;
            const inCash = isCash(e.paymentMethod);
            if (inCash) {
                cashExpenses += amt;
                cashExpCount++;
            } else {
                bankExpenses += amt;
                bankExpCount++;
            }

            const cat = (e.category || 'Other').trim();
            if (!categoryMap[cat]) categoryMap[cat] = { cash: 0, bank: 0, total: 0, count: 0 };
            if (inCash) categoryMap[cat].cash += amt;
            else categoryMap[cat].bank += amt;
            categoryMap[cat].total += amt;
            categoryMap[cat].count += 1;
        });

        // 3. Net Calculations
        const netProfit = totalSales - totalExpenses;
        const netCashFlow = cashSales - cashExpenses;
        const netBankFlow = bankSales - bankExpenses;
        const marginPct = totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : 0;

        // Render Summary Cards (Top)
        const summaryCardsEl = document.getElementById('report-summary-cards');
        if (summaryCardsEl) {
            summaryCardsEl.innerHTML = `
                <!-- Total Sales Card -->
                <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-gray-500 mb-1">
                            <span class="text-[11px] font-black uppercase tracking-wider">Total Sales (Inflow)</span>
                            <i class="fa-solid fa-arrow-down-left text-emerald-500"></i>
                        </div>
                        <p class="text-xl font-black font-mono text-gray-900">LKR ${totalSales.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div class="mt-3 pt-2 border-t border-gray-200/70 text-[11px] text-gray-500 space-y-1">
                        <div class="flex justify-between font-mono"><span>Cash (${cashSalesCount}):</span> <strong class="text-gray-800">LKR ${cashSales.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</strong></div>
                        <div class="flex justify-between font-mono"><span>Bank (${bankSalesCount}):</span> <strong class="text-gray-800">LKR ${bankSales.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</strong></div>
                    </div>
                </div>

                <!-- Total Expenses Card -->
                <div class="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-rose-600 mb-1">
                            <span class="text-[11px] font-black uppercase tracking-wider">Total Expenses</span>
                            <i class="fa-solid fa-arrow-up-right text-rose-500"></i>
                        </div>
                        <p class="text-xl font-black font-mono text-rose-600">LKR ${totalExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div class="mt-3 pt-2 border-t border-rose-200/60 text-[11px] text-rose-700/80 space-y-1">
                        <div class="flex justify-between font-mono"><span>Cash (${cashExpCount}):</span> <strong class="text-rose-900">LKR ${cashExpenses.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</strong></div>
                        <div class="flex justify-between font-mono"><span>Bank (${bankExpCount}):</span> <strong class="text-rose-900">LKR ${bankExpenses.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</strong></div>
                    </div>
                </div>

                <!-- Net Profit / Loss Card -->
                <div class="${netProfit >= 0 ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'} p-4 rounded-2xl border flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'} mb-1">
                            <span class="text-[11px] font-black uppercase tracking-wider">Net Operating Profit</span>
                            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white font-mono">${marginPct}% Margin</span>
                        </div>
                        <p class="text-xl font-black font-mono ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-600'}">LKR ${netProfit.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div class="mt-3 pt-2 border-t ${netProfit >= 0 ? 'border-emerald-200/60 text-emerald-800/80' : 'border-red-200/60 text-red-800/80'} text-[11px] space-y-1">
                        <div class="flex justify-between font-mono"><span>Result:</span> <strong>${netProfit >= 0 ? 'Profitable ✓' : 'Net Loss ⚠'}</strong></div>
                        <div class="flex justify-between font-mono"><span>Activity:</span> <strong>${paidSales.length + operatingExpenses.length} Records</strong></div>
                    </div>
                </div>

                <!-- Cash vs Bank Net Flow Card -->
                <div class="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-sky-700 mb-1">
                            <span class="text-[11px] font-black uppercase tracking-wider">Channel Net Flow</span>
                            <i class="fa-solid fa-scale-balanced text-sky-600"></i>
                        </div>
                        <div class="space-y-1.5 mt-2">
                            <div class="flex justify-between items-center text-xs font-mono">
                                <span class="text-gray-500 font-sans font-bold text-[11px]">Net Cash:</span>
                                <strong class="${netCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-black">LKR ${netCashFlow.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</strong>
                            </div>
                            <div class="flex justify-between items-center text-xs font-mono">
                                <span class="text-gray-500 font-sans font-bold text-[11px]">Net Bank:</span>
                                <strong class="${netBankFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-black">LKR ${netBankFlow.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</strong>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2.5 pt-1.5 border-t border-sky-200/60 text-[10px] text-sky-600/80 font-medium">
                        Cash & Bank liquidity reconciled
                    </div>
                </div>
            `;
        }

        // Render Liquidity Table
        const liqTbody = document.getElementById('report-liquidity-tbody');
        if (liqTbody) {
            liqTbody.innerHTML = `
                <tr class="hover:bg-gray-50/60">
                    <td class="px-4 py-3 font-bold text-gray-800 flex items-center gap-2">
                        <i class="fa-solid fa-circle-arrow-down text-emerald-500 text-xs"></i> Gross Sales Revenue (Inflow)
                    </td>
                    <td class="px-4 py-3 text-right font-mono font-bold text-gray-800">LKR ${cashSales.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-bold text-gray-800">LKR ${bankSales.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-black text-emerald-600">LKR ${totalSales.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr class="hover:bg-gray-50/60">
                    <td class="px-4 py-3 font-bold text-gray-800 flex items-center gap-2">
                        <i class="fa-solid fa-circle-arrow-up text-rose-500 text-xs"></i> Total Operational Expenses (Outflow)
                    </td>
                    <td class="px-4 py-3 text-right font-mono font-bold text-rose-600">LKR ${cashExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-bold text-rose-600">LKR ${bankExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-black text-rose-600">LKR ${totalExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr class="bg-gray-50/70 font-black">
                    <td class="px-4 py-3 text-gray-900 font-black uppercase text-[11px] tracking-wider">
                        Net Operating Flow Balance
                    </td>
                    <td class="px-4 py-3 text-right font-mono ${netCashFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-black">
                        LKR ${netCashFlow.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                    </td>
                    <td class="px-4 py-3 text-right font-mono ${netBankFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'} font-black">
                        LKR ${netBankFlow.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                    </td>
                    <td class="px-4 py-3 text-right font-mono ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'} text-sm font-black">
                        LKR ${netProfit.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                    </td>
                </tr>
            `;
        }

        // Render Category Breakdown Table
        const catTbody = document.getElementById('report-category-tbody');
        const catTfoot = document.getElementById('report-category-tfoot');
        const catCountEl = document.getElementById('report-cat-count');

        const sortedCats = Object.entries(categoryMap).sort((a, b) => b[1].total - a[1].total);
        if (catCountEl) catCountEl.textContent = `${sortedCats.length} Categories`;

        if (catTbody) {
            if (sortedCats.length === 0) {
                catTbody.innerHTML = `<tr><td colspan="6" class="px-4 py-6 text-center text-gray-400">No operational expenses recorded for this month.</td></tr>`;
            } else {
                catTbody.innerHTML = sortedCats.map(([catName, data]) => {
                    const pct = totalExpenses > 0 ? ((data.total / totalExpenses) * 100).toFixed(1) : 0;
                    return `
                        <tr class="hover:bg-gray-50/60 border-b border-gray-100">
                            <td class="px-4 py-3">
                                <span class="font-bold text-gray-900 text-xs sm:text-sm">${catName}</span>
                                <span class="text-[10px] text-gray-400 ml-1.5 font-mono">(${data.count} items)</span>
                            </td>
                            <td class="px-4 py-3 text-right font-mono text-gray-700 font-medium">LKR ${data.cash.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                            <td class="px-4 py-3 text-right font-mono text-gray-700 font-medium">LKR ${data.bank.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                            <td class="px-4 py-3 text-right font-mono font-black text-gray-900">LKR ${data.total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                            <td class="px-4 py-3 text-right font-mono font-bold text-gray-600">${pct}%</td>
                            <td class="px-4 py-3">
                                <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner p-0.5">
                                    <div class="h-full rounded-full bg-rose-500" style="width: ${Math.max(2, parseFloat(pct) || 0)}%; background-color: #f43f5e;"></div>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }

        if (catTfoot) {
            catTfoot.innerHTML = `
                <tr>
                    <td class="px-4 py-3 font-black uppercase text-[11px] tracking-wider text-gray-900">Total Operating Expenses</td>
                    <td class="px-4 py-3 text-right font-mono font-black text-rose-700">LKR ${cashExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-black text-rose-700">LKR ${bankExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-black text-rose-700 text-sm">LKR ${totalExpenses.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                    <td class="px-4 py-3 text-right font-mono font-black text-rose-700">100%</td>
                    <td class="px-4 py-3"></td>
                </tr>
            `;
        }

        // Apply Payment Method Filter to Transactions tables if selected
        const filterSales = paidSales.filter(s => {
            if (methodFilter === 'Cash') return isCash(s.paymentMethod);
            if (methodFilter === 'Bank Transfer') return isBank(s.paymentMethod);
            return true;
        });

        const filterExpenses = operatingExpenses.filter(e => {
            if (methodFilter === 'Cash') return isCash(e.paymentMethod);
            if (methodFilter === 'Bank Transfer') return isBank(e.paymentMethod);
            return true;
        });

        // Render Sales Transactions Table
        const salesTbody = document.getElementById('report-sales-tbody');
        const salesCountEl = document.getElementById('report-sales-count');
        if (salesCountEl) salesCountEl.textContent = `${filterSales.length} Transactions`;

        if (salesTbody) {
            if (filterSales.length === 0) {
                salesTbody.innerHTML = `<tr><td colspan="5" class="px-4 py-6 text-center text-gray-400">No sales transactions found for this selection.</td></tr>`;
            } else {
                salesTbody.innerHTML = filterSales.map(s => {
                    const inCash = isCash(s.paymentMethod);
                    return `
                        <tr class="hover:bg-gray-50/60 border-b border-gray-100">
                            <td class="px-3.5 py-2.5 font-mono text-gray-500">${s.date}</td>
                            <td class="px-3.5 py-2.5 font-mono text-xs font-bold text-gray-700">${s.receiptNo || '-'}</td>
                            <td class="px-3.5 py-2.5 font-medium text-gray-900">${s.customerName || 'Walk-in'}</td>
                            <td class="px-3.5 py-2.5">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${inCash ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                                    <i class="fa-solid ${inCash ? 'fa-money-bill-1' : 'fa-building-columns'} mr-1"></i>${inCash ? 'Cash' : 'Bank'}
                                </span>
                            </td>
                            <td class="px-3.5 py-2.5 text-right font-mono font-bold text-emerald-600">LKR ${parseFloat(s.amount).toFixed(2)}</td>
                        </tr>
                    `;
                }).join('');
            }
        }

        // Render Expense Transactions Table
        const expensesTbody = document.getElementById('report-expenses-tbody');
        const expensesCountEl = document.getElementById('report-expenses-count');
        if (expensesCountEl) expensesCountEl.textContent = `${filterExpenses.length} Transactions`;

        if (expensesTbody) {
            if (filterExpenses.length === 0) {
                expensesTbody.innerHTML = `<tr><td colspan="6" class="px-4 py-6 text-center text-gray-400">No expense transactions found for this selection.</td></tr>`;
            } else {
                expensesTbody.innerHTML = filterExpenses.map(e => {
                    const inCash = isCash(e.paymentMethod);
                    return `
                        <tr class="hover:bg-gray-50/60 border-b border-gray-100">
                            <td class="px-3.5 py-2.5 font-mono text-gray-500">${e.date}</td>
                            <td class="px-3.5 py-2.5">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">${e.category}</span>
                            </td>
                            <td class="px-3.5 py-2.5 text-gray-800">${e.description || '-'}</td>
                            <td class="px-3.5 py-2.5 text-gray-500 text-xs">${e.personName || '-'}</td>
                            <td class="px-3.5 py-2.5">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${inCash ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                                    <i class="fa-solid ${inCash ? 'fa-money-bill-1' : 'fa-building-columns'} mr-1"></i>${inCash ? 'Cash' : 'Bank'}
                                </span>
                            </td>
                            <td class="px-3.5 py-2.5 text-right font-mono font-bold text-rose-600">LKR ${parseFloat(e.amount).toFixed(2)}</td>
                        </tr>
                    `;
                }).join('');
            }
        }

    } catch (e) {
        console.error("Error generating report:", e);
    }
}

async function exportReportPDF(btnElement) {
    const origHtml = btnElement ? btnElement.innerHTML : '';
    if (btnElement) {
        btnElement.disabled = true;
        btnElement.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Generating A4 PDF...';
    }

    let sandbox = null;
    try {
        const monthInput = document.getElementById('report-month');
        const month = monthInput?.value || 'Report';
        if (!monthInput || !monthInput.value) {
            alert('Please select a month first.');
            return;
        }

        const element = document.getElementById('report-content');
        if (!element) return;

        // If report has not been generated yet, generate it first
        const salesCount = document.getElementById('report-sales-count');
        if (!salesCount || salesCount.textContent === '0 Transactions') {
            await generateReport();
        }

        // Clone report content into an exact A4 styled container
        const clone = element.cloneNode(true);
        clone.id = 'report-content-a4-pdf-clone';

        // Strip web card layout classes and set exact printable A4 width (210mm)
        clone.classList.remove('border', 'border-gray-200', 'rounded-3xl', 'p-6', 'sm:p-8', 'max-w-5xl', 'mx-auto', 'space-y-8');
        clone.style.width = '210mm';
        clone.style.minWidth = '210mm';
        clone.style.maxWidth = '210mm';
        clone.style.padding = '12mm';
        clone.style.margin = '0 auto';
        clone.style.background = '#ffffff';
        clone.style.boxSizing = 'border-box';
        clone.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";

        // Remove scrolling and height restrictions from all tables so all rows are rendered
        clone.querySelectorAll('.overflow-x-auto, .overflow-y-auto, .max-h-96').forEach(el => {
            el.classList.remove('overflow-x-auto', 'overflow-y-auto', 'max-h-96');
            el.style.overflow = 'visible';
            el.style.maxHeight = 'none';
            el.style.width = '100%';
            el.style.boxSizing = 'border-box';
        });

        // Ensure all tables and cells stay strictly within bounds
        clone.querySelectorAll('table').forEach(tbl => {
            tbl.style.width = '100%';
            tbl.style.maxWidth = '100%';
            tbl.style.boxSizing = 'border-box';
        });
        clone.querySelectorAll('th, td').forEach(cell => {
            cell.style.boxSizing = 'border-box';
        });

        // Remove sticky header positioning in clone to prevent canvas overlap
        clone.querySelectorAll('.sticky').forEach(el => {
            el.classList.remove('sticky', 'top-0');
            el.style.position = 'static';
        });

        // Add page break rules to all table rows and sections
        clone.querySelectorAll('tr').forEach(tr => {
            tr.style.breakInside = 'avoid';
            tr.style.pageBreakInside = 'avoid';
        });

        clone.querySelectorAll('.report-section-block').forEach(blk => {
            blk.style.breakInside = 'avoid';
            blk.style.pageBreakInside = 'avoid';
            blk.style.marginBottom = '20px';
            blk.style.width = '100%';
            blk.style.boxSizing = 'border-box';
        });

        // Format header row to stay side-by-side without overflowing
        const header = clone.querySelector('.report-section-block');
        if (header) {
            header.style.display = 'flex';
            header.style.flexDirection = 'row';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'flex-start';
            header.style.width = '100%';
            header.style.boxSizing = 'border-box';
            if (header.children[1]) {
                header.children[1].style.textAlign = 'right';
            }
        }

        // Clean 4-column layout for summary cards
        const summaryCards = clone.querySelector('#report-summary-cards');
        if (summaryCards) {
            summaryCards.className = 'grid grid-cols-4 gap-2';
            summaryCards.style.display = 'grid';
            summaryCards.style.gridTemplateColumns = 'repeat(4, minmax(0, 1fr))';
            summaryCards.style.gap = '8px';
            summaryCards.style.width = '100%';
            summaryCards.style.boxSizing = 'border-box';

            summaryCards.querySelectorAll('.p-4').forEach(c => {
                c.style.padding = '10px 8px';
            });
            summaryCards.querySelectorAll('.text-xl').forEach(c => {
                c.style.fontSize = '14px';
                c.style.whiteSpace = 'nowrap';
            });
            summaryCards.querySelectorAll('.text-xs, .text-\\[11px\\]').forEach(c => {
                c.style.fontSize = '10px';
            });
        }

        // Sanitize all gradients to eliminate html2canvas createPattern 0-width bugs
        clone.querySelectorAll('*').forEach(el => {
            Array.from(el.classList).forEach(cls => {
                if (cls.startsWith('bg-gradient-') || cls.startsWith('from-') || cls.startsWith('to-') || cls.startsWith('via-')) {
                    el.classList.remove(cls);
                }
            });
            if (el.style.backgroundImage && el.style.backgroundImage.toLowerCase().includes('gradient')) {
                el.style.backgroundImage = 'none';
            }
        });

        // Render clone in offscreen container with exact 210mm width
        sandbox = document.createElement('div');
        sandbox.style.cssText = 'position:fixed; left:-9999px; top:0; width:210mm; z-index:-9999; display:block; background:#ffffff;';
        sandbox.appendChild(clone);
        document.body.appendChild(sandbox);

        // Wait two frames for browser layout computation
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const opt = {
            margin: 0, // Element already has 12mm padding inside 210mm width
            filename: `Kutuss_Financial_Report_${month}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                letterRendering: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: {
                mode: ['css', 'legacy'],
                avoid: ['tr', '.report-section-block', '#report-summary-cards']
            }
        };

        await html2pdf().set(opt).from(clone).save();
    } catch (e) {
        console.error("A4 Report PDF Export Error:", e);
        alert('Error generating A4 PDF: ' + e.message);
    } finally {
        if (sandbox && sandbox.parentNode) {
            sandbox.parentNode.removeChild(sandbox);
        }
        if (btnElement) {
            btnElement.disabled = false;
            btnElement.innerHTML = origHtml;
        }
    }
}

function printReport() {
    let styleEl = document.getElementById('report-print-page-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'report-print-page-style';
        styleEl.innerHTML = `
            @media print {
                @page {
                    size: A4 portrait !important;
                    margin: 10mm !important;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }

    document.body.classList.add('printing-report');
    window.print();
    setTimeout(() => {
        document.body.classList.remove('printing-report');
        if (styleEl && styleEl.parentNode) {
            styleEl.parentNode.removeChild(styleEl);
        }
    }, 1000);
}

window.exportReportPDF = exportReportPDF;
window.printReport = printReport;

// --- 9. Payslip Logic ---
async function printPayslip(id) {
    try {
        const exp = await db.expenses.get(id);
        if (!exp) return alert('Record not found');

        // Populate 80mm
        document.getElementById('slip-date').textContent = exp.date;
        document.getElementById('slip-ref').textContent = exp.invoiceNo || 'EXP-' + exp.id; // Fallback
        document.getElementById('slip-name').textContent = exp.personName || 'N/A';
        document.getElementById('slip-cat').textContent = exp.category;
        document.getElementById('slip-method').textContent = exp.paymentMethod;
        document.getElementById('slip-desc').textContent = exp.description;
        document.getElementById('slip-amount').textContent = parseFloat(exp.amount).toFixed(2);

        document.body.classList.add('printing-payslip');
        window.print();

        // Clean up class after print dialog closes
        // Note: window.print() is blocking in some browsers but not others. 
        // Using a timeout or 'afterprint' event is safer, but timeout is simpler for this context.
        setTimeout(() => {
            document.body.classList.remove('printing-payslip');
        }, 500);

    } catch (e) {
        console.error(e);
    }
}

async function downloadPayslipPDF(id) {
    try {
        const exp = await db.expenses.get(id);
        if (!exp) return alert('Record not found');

        // Populate A4
        document.getElementById('a4-date').textContent = exp.date;
        document.getElementById('a4-name').textContent = exp.personName;
        document.getElementById('a4-ref').textContent = exp.invoiceNo || 'EXP-' + id;
        document.getElementById('a4-cat').textContent = exp.category;
        document.getElementById('a4-desc').textContent = exp.description || 'Salary Payment';
        document.getElementById('a4-method').textContent = exp.paymentMethod;
        document.getElementById('a4-amount').textContent = 'LKR ' + exp.amount.toLocaleString('en-LK', { minimumFractionDigits: 2 });

        const element = document.getElementById('payslip-a4-content');
        const container = document.getElementById('payslip-a4-container');

        // Temporarily show container for capture
        // We clone the content to avoid messing with the DOM if we were to display it
        // But html2pdf needs it in the DOM.

        // Technique: Make container visible but absolute positioned off-screen
        container.classList.remove('hidden');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.display = 'block';
        container.style.zIndex = '-9999';

        const opt = {
            margin: 0,
            filename: `Payslip_${exp.personName}_${exp.date}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(element).save();

    } catch (e) {
        console.error(e);
        alert('Error generating PDF');
    } finally {
        // Hide again
        container.style.display = 'none';
        container.classList.add('hidden');
        container.style.position = '';
        container.style.left = '';
        container.style.top = '';
    }
}

async function downloadReceiptPDF(id) {
    try {
        const sale = await db.sales.get(id);
        if (!sale) return alert('Record not found');

        // Populate A4 Receipt
        document.getElementById('a4-r-no').textContent = sale.receiptNo;
        document.getElementById('a4-r-date').textContent = sale.date;
        document.getElementById('a4-r-customer').textContent = sale.customerName;
        document.getElementById('a4-r-invoice').textContent = sale.invoiceNo || '-';
        const a4Proj = document.getElementById('a4-r-project-id');
        if (a4Proj) {
            const displayID = (sale.projectId && sale.projectId.startsWith('PERSONAL-')) ? 'PERSONAL' : (sale.projectId || sale.invoiceNo || '-');
            a4Proj.textContent = displayID;
        }

        document.getElementById('a4-r-method').textContent = sale.paymentMethod.toUpperCase();
        document.getElementById('a4-r-status').textContent = sale.status;

        // Formating
        const amountStr = parseFloat(sale.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 });
        document.getElementById('a4-r-amount').textContent = amountStr;
        document.getElementById('a4-r-total').textContent = amountStr;

        const element = document.getElementById('receipt-a4-content');
        const container = document.getElementById('receipt-a4-container');

        // Technique: Make container visible but absolute positioned off-screen
        container.classList.remove('hidden');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.display = 'block';
        container.style.zIndex = '-9999';

        const opt = {
            margin: 0,
            filename: `Receipt_${sale.receiptNo}_${sale.customerName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(element).save();

    } catch (e) {
        console.error(e);
        alert('Error generating Receipt PDF');
    } finally {
        // Hide again
        container.style.display = 'none';
        container.classList.add('hidden');
        container.style.position = '';
        container.style.left = '';
        container.style.top = '';
    }
}

// --- 10. Projects Logic ---

window.loadUrgentDeadlinesWidget = async function (projectsList = null, todayStr = null) {
    const container = document.getElementById('urgent-deadlines-container');
    const listEl = document.getElementById('urgent-deadlines-list');
    const badgeEl = document.getElementById('urgent-deadlines-badge');
    if (!container || !listEl) return;

    try {
        if (!todayStr) todayStr = new Date().toISOString().split('T')[0];
        if (!projectsList) projectsList = await db.projects.toArray();

        // Find active 'In Progress' projects that have an endDate
        const urgentProjects = [];
        projectsList.forEach(p => {
            if (p.status !== 'In Progress' || !p.endDate) return;
            const diffDays = Math.ceil((new Date(p.endDate) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
            if (diffDays <= 2) {
                urgentProjects.push({ ...p, diffDays });
            }
        });

        // Sort: overdue first, then today, then 1 day, then 2 days
        urgentProjects.sort((a, b) => a.diffDays - b.diffDays);

        if (urgentProjects.length === 0) {
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');
        if (badgeEl) {
            badgeEl.textContent = `${urgentProjects.length} Urgent`;
        }

        listEl.innerHTML = urgentProjects.map(p => {
            let urgencyBadge = '';
            let borderClass = 'border-amber-200 bg-amber-50/30';
            if (p.diffDays < 0) {
                urgencyBadge = `<span class="text-[10px] font-black text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation"></i> Overdue by ${Math.abs(p.diffDays)}d</span>`;
                borderClass = 'border-red-200 bg-red-50/40';
            } else if (p.diffDays === 0) {
                urgencyBadge = `<span class="text-[10px] font-black text-orange-700 bg-orange-100 border border-orange-300 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1"><i class="fa-solid fa-clock"></i> Due Today!</span>`;
                borderClass = 'border-orange-300 bg-orange-50/40';
            } else if (p.diffDays === 1) {
                urgencyBadge = `<span class="text-[10px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1"><i class="fa-solid fa-hourglass-half"></i> Due Tomorrow (1d)</span>`;
                borderClass = 'border-amber-200 bg-amber-50/40';
            } else {
                urgencyBadge = `<span class="text-[10px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1"><i class="fa-solid fa-hourglass-half"></i> Due in 2 Days</span>`;
                borderClass = 'border-yellow-200 bg-yellow-50/30';
            }

            const cleanPhone = (p.customerPhone || '').replace(/[^0-9]/g, '');

            return `
            <div class="p-4 rounded-2xl border ${borderClass} bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                    <div class="flex items-start justify-between gap-2 mb-2">
                        <span class="text-[10px] font-black text-brand-600 font-mono bg-brand-50 px-2 py-0.5 rounded">
                            ${p.projectID || 'PROJ'}
                        </span>
                        ${urgencyBadge}
                    </div>
                    <h4 class="font-bold text-gray-900 text-sm line-clamp-1">${p.name}</h4>
                    <div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <i class="fa-solid fa-user text-[10px] text-gray-400"></i>
                        <span class="font-medium">${p.customerName || 'No Customer'}</span>
                    </div>
                </div>

                <div class="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div class="font-mono text-gray-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-flag-checkered text-red-500 text-[10px]"></i>
                        <span>${p.endDate}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        ${cleanPhone ? `
                        <a href="https://wa.me/94${cleanPhone.replace(/^0/, '')}?text=Hi%20${encodeURIComponent(p.customerName || '')},%20regarding%20project%20${encodeURIComponent(p.name)}%20(Deadline:%20${p.endDate})" target="_blank"
                            class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors" title="Message on WhatsApp">
                            <i class="fa-brands fa-whatsapp text-sm"></i>
                        </a>` : ''}
                        <button onclick="showSection('projects'); editProject(${p.id});" class="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1">
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Open
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('');

    } catch (e) {
        console.error('Error loading urgent deadlines widget:', e);
    }
};

window.filterProjectsByDeadlineSort = function () {
    const sel = document.getElementById('project-sort-by');
    if (sel) sel.value = 'deadline_asc';
    loadProjects('Deadlines');
};

async function loadProjects(statusFilter = null) {
    if (!statusFilter) {
        const activeBtn = Array.from(document.querySelectorAll('.project-filter-btn')).find(b => b.classList.contains('bg-gray-800'));
        statusFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'All';
    }

    // Update Filter UI
    document.querySelectorAll('.project-filter-btn').forEach(btn => {
        const f = btn.getAttribute('data-filter');
        if (f === statusFilter) {
            btn.classList.add('bg-gray-800', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-600', 'bg-blue-50', 'text-blue-600', 'bg-green-50', 'text-green-600', 'bg-yellow-50', 'text-yellow-600', 'bg-red-50', 'text-red-600', 'bg-orange-50', 'text-orange-600', 'bg-amber-50', 'text-amber-800');
        } else {
            btn.classList.remove('bg-gray-800', 'text-white');
            if (f === 'All') btn.classList.add('bg-gray-100', 'text-gray-600');
            if (f === 'Deadlines') btn.classList.add('bg-amber-50', 'text-amber-800');
            if (f === 'In Progress') btn.classList.add('bg-blue-50', 'text-blue-600');
            if (f === 'Completed') btn.classList.add('bg-green-50', 'text-green-600');
            if (f === 'On Hold') btn.classList.add('bg-yellow-50', 'text-yellow-600');
            if (f === 'Cancelled') btn.classList.add('bg-red-50', 'text-red-600');
            if (f === 'Not Confirmed') btn.classList.add('bg-orange-50', 'text-orange-600');
        }
    });

    const tableBody = document.getElementById('projects-table-body');
    const searchInput = document.getElementById('search-projects');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const sortBy = document.getElementById('project-sort-by')?.value || 'timestamp_desc';

    if (!tableBody) return;
    try {
        let projects = await db.projects.toArray();

        // Filtering
        if (statusFilter === 'Deadlines') {
            // Show only 'In Progress' projects sorted by deadline
            projects = projects.filter(p => p.status === 'In Progress' && p.endDate);
            projects.sort((a, b) => (a.endDate || '9999').localeCompare(b.endDate || '9999'));
        } else if (statusFilter !== 'All') {
            projects = projects.filter(p => p.status === statusFilter);
        }

        if (searchTerm) {
            projects = projects.filter(p => {
                const term = searchTerm;
                return (p.name && p.name.toLowerCase().includes(term)) ||
                       (p.customerName && p.customerName.toLowerCase().includes(term)) ||
                       (p.customerPhone && p.customerPhone.toLowerCase().includes(term)) ||
                       (p.projectID && p.projectID.toLowerCase().includes(term));
            });
        }

        // Sorting if not already sorted by Deadlines filter
        if (statusFilter !== 'Deadlines') {
            if (sortBy === 'deadline_asc') {
                projects.sort((a, b) => {
                    if (!a.endDate) return 1;
                    if (!b.endDate) return -1;
                    return a.endDate.localeCompare(b.endDate);
                });
            } else if (sortBy === 'deadline_desc') {
                projects.sort((a, b) => {
                    if (!a.endDate) return 1;
                    if (!b.endDate) return -1;
                    return b.endDate.localeCompare(a.endDate);
                });
            } else if (sortBy === 'budget_desc') {
                projects.sort((a, b) => (parseFloat(b.budget) || 0) - (parseFloat(a.budget) || 0));
            } else if (sortBy === 'name_asc') {
                projects.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            } else {
                // Newest registered timestamp
                projects.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            }
        }

        if (projects.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">No projects found.</td></tr>`;
            return;
        }

        const todayStr = new Date().toISOString().split('T')[0];

        tableBody.innerHTML = projects.map(proj => {
            let statusColor = 'bg-blue-100 text-blue-700';
            if (proj.status === 'Completed') statusColor = 'bg-green-100 text-green-700';
            if (proj.status === 'Cancelled') statusColor = 'bg-red-100 text-red-700';
            if (proj.status === 'On Hold') statusColor = 'bg-yellow-100 text-yellow-700';
            if (proj.status === 'Not Confirmed') statusColor = 'bg-orange-100 text-orange-700';

            const totalAgreedToTeam = (proj.teamPayments || []).reduce((sum, p) => sum + (parseFloat(p.agreed) || 0), 0);
            const totalComponentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
            const discount = parseFloat(proj.discount) || 0;
            
            let totalCustomerOwes = 0;
            if (proj.isFullQuotation) {
                totalCustomerOwes = (parseFloat(proj.budget) || 0) - discount;
            } else {
                totalCustomerOwes = (parseFloat(proj.budget) || 0) + totalComponentCost - discount;
            }
            const totalReceived = (proj.clientPayments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
            const balance = totalCustomerOwes - totalReceived;
            
            const componentProfit = (proj.components || []).reduce((sum, c) => {
                const sp = parseFloat(c.sellingPrice) || parseFloat(c.unitPrice) || 0;
                const cp = parseFloat(c.costPrice) || parseFloat(c.unitPrice) || 0;
                const qty = parseFloat(c.qty) || 0;
                return sum + (qty * (sp - cp));
            }, 0);
            
            let netProfit = 0;
            if (proj.isFullQuotation) {
                netProfit = componentProfit - totalAgreedToTeam - discount;
            } else {
                netProfit = (parseFloat(proj.budget) || 0) - totalAgreedToTeam - discount + componentProfit;
            }

            const idBadge = proj.isPersonal ? 
                `<div class="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded w-fit mb-1 flex items-center gap-1"><i class="fa-solid fa-user-lock"></i> PERSONAL</div>` :
                `<div class="text-[10px] font-black text-brand-600 bg-brand-50 px-2 py-0.5 rounded w-fit mb-1">${proj.projectID || 'N/A'}</div>`;

            // Enhanced Deadline Badge Calculation
            let deadlineBadge = '';
            if (proj.status === 'Completed') {
                deadlineBadge = `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit border border-emerald-200">✓ Completed</span>`;
            } else if (proj.status === 'Cancelled') {
                deadlineBadge = `<span class="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded w-fit">Cancelled</span>`;
            } else if (proj.endDate) {
                const diffDays = Math.ceil((new Date(proj.endDate) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) {
                    deadlineBadge = `<span class="text-[10px] font-black text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full w-fit animate-pulse flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation"></i> Overdue ${Math.abs(diffDays)}d</span>`;
                } else if (diffDays === 0) {
                    deadlineBadge = `<span class="text-[10px] font-black text-orange-700 bg-orange-100 border border-orange-300 px-2 py-0.5 rounded-full w-fit animate-pulse flex items-center gap-1"><i class="fa-solid fa-clock"></i> Due Today!</span>`;
                } else if (diffDays === 1) {
                    deadlineBadge = `<span class="text-[10px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full w-fit flex items-center gap-1"><i class="fa-solid fa-hourglass-half"></i> Due Tomorrow (1d)</span>`;
                } else if (diffDays === 2) {
                    deadlineBadge = `<span class="text-[10px] font-black text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full w-fit flex items-center gap-1"><i class="fa-solid fa-hourglass-half"></i> Due in 2 days</span>`;
                } else {
                    deadlineBadge = `<span class="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit">${diffDays} days left</span>`;
                }
            }

            return `
            <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50 text-sm">
                <td class="px-6 py-4">
                    ${idBadge}
                    <div class="font-bold text-gray-900">${proj.name}</div>
                    <div class="text-xs text-gray-400">Reg: ${proj.registrationDate}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="font-medium text-gray-800">${proj.customerName}</div>
                    ${proj.customerPhone ? `<div class="text-[10px] text-gray-500 font-bold"><i class="fa-solid fa-phone text-[8px] mr-1"></i> ${proj.customerPhone}</div>` : ''}
                    
                    ${proj.customerTeam && proj.customerTeam.length > 0 ? `
                        <div class="mt-2 space-y-1">
                            <p class="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Team Members:</p>
                            ${proj.customerTeam.map(m => `
                                <div class="text-[10px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 flex justify-between">
                                    <span>${m.name}</span>
                                    <span class="font-mono text-[9px] text-gray-400">${m.phone || ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </td>
                <td class="px-6 py-4">
                    <div class="flex flex-col gap-1.5">
                        <span class="text-xs text-gray-500 flex items-center gap-1"><i class="fa-solid fa-play text-[9px] text-green-500"></i> Start: ${proj.startDate || '-'}</span>
                        <span class="text-xs font-bold text-gray-800 font-mono flex items-center gap-1"><i class="fa-solid fa-flag-checkered text-[9px] text-red-500"></i> End: ${proj.endDate || '-'}</span>
                        ${deadlineBadge}
                    </div>
                </td>
                <td class="px-6 py-4 text-right">
                    <div class="text-[10px] text-gray-400 uppercase font-bold">Total Due:</div>
                    <div class="font-mono font-bold text-gray-900">LKR ${totalCustomerOwes.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</div>
                    
                    <div class="mt-2 space-y-1">
                        <div class="flex justify-between text-[10px]">
                            <span class="text-gray-400">Received:</span>
                            <span class="font-bold text-emerald-600">LKR ${totalReceived.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between text-[10px]">
                            <span class="text-gray-400">Balance:</span>
                            <span class="font-bold ${balance > 0 ? 'text-red-500' : 'text-emerald-600'}">LKR ${balance.toLocaleString()}${balance < 0 ? ' (Overpaid)' : ''}</span>
                        </div>
                    </div>
                    
                    <div class="text-[10px] uppercase font-bold text-purple-600 mt-2 border-t border-gray-100 pt-1 flex justify-end items-center gap-1">
                        <span>Material Profit: LKR ${componentProfit.toLocaleString('en-LK', { minimumFractionDigits: 0 })}</span>
                        ${proj.components && proj.components.length > 0 ? `
                        <button onclick="showComponentProfitModal(${proj.id})" class="p-0.5 text-purple-500 hover:text-purple-700 transition-colors" title="View Material Items Profit Breakdown">
                            <i class="fa-solid fa-circle-info text-[11px]"></i>
                        </button>
                        ` : ''}
                    </div>
                    <div class="text-[10px] uppercase font-bold ${netProfit >= 0 ? 'text-brand-600' : 'text-red-600'} mt-1">
                        Internal Profit: LKR ${netProfit.toLocaleString('en-LK', { minimumFractionDigits: 0 })}
                    </div>
                </td>
                <td class="px-6 py-4 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusColor}">
                        ${proj.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <div class="group relative inline-block">
                        <button onclick="downloadQuotationPDF(${proj.id})" class="p-1 text-blue-500 hover:text-blue-700 transition-colors" title="Download Quotation">
                            <i class="fa-solid fa-file-invoice"></i>
                        </button>
                        <button onclick="printQuotation80mm(${proj.id})" class="p-1 text-blue-600 hover:text-blue-800 transition-colors" title="Print Quotation (80mm)">
                            <i class="fa-solid fa-print"></i>
                        </button>
                        <button onclick="sendQuotationWA(${proj.id})" class="p-1 text-emerald-500 hover:text-emerald-700 transition-colors" title="Send Quotation via WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>

                    <div class="group relative inline-block">
                        <button onclick="downloadAgreementPDF(${proj.id})" class="p-1 text-orange-500 hover:text-orange-700 transition-colors" title="Download Blank Agreement">
                            <i class="fa-solid fa-file-signature"></i>
                        </button>
                        <button onclick="sendAgreementWA(${proj.id})" class="p-1 text-emerald-500 hover:text-emerald-700 transition-colors" title="Send Agreement via WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>

                    ${proj.agreementAttachment ? `
                    <button onclick="viewAgreementAttachment(${proj.id})" class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors" title="View Signed Agreement">
                        <i class="fa-solid fa-file-contract"></i>
                    </button>
                    ` : ''}
                    <button onclick="downloadCostSheetPDF(${proj.id})" class="p-1 text-purple-500 hover:text-purple-700 transition-colors" title="Download Material Invoice">
                        <i class="fa-solid fa-file-invoice-dollar"></i>
                    </button>
                    <button onclick="printCostSheet80mm(${proj.id})" class="p-1 text-purple-600 hover:text-purple-800 transition-colors" title="Print Material Invoice (80mm)">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    <button onclick="downloadFinalInvoicePDF(${proj.id})" class="p-1 text-emerald-500 hover:text-emerald-700 transition-colors" title="Download Final Settlement (PDF)">
                        <i class="fa-solid fa-money-check-dollar"></i>
                    </button>
                    <button onclick="printFinalSettlement80mm(${proj.id})" class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors" title="Print Final Settlement (80mm)">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    <button onclick="shareSettlementLink(${proj.id})" class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors" title="Send Live Settlement Link via WhatsApp">
                        <i class="fa-solid fa-share-nodes"></i>
                    </button>
                    <button onclick="copySettlementLink(${proj.id})" class="p-1 text-blue-500 hover:text-blue-700 transition-colors" title="Copy Live Settlement Link">
                        <i class="fa-solid fa-link"></i>
                    </button>
                    <button onclick="sendPaymentReminder(${proj.id})" class="p-1 text-brand-600 hover:text-brand-800 transition-colors" title="Send Payment Reminder">
                        <i class="fa-brands fa-whatsapp"></i>
                    </button>
                    <button onclick="sendAdvancePaymentRequestWA(${proj.id})" class="p-1 text-purple-600 hover:text-purple-800 transition-colors" title="Request Advance Payment via WhatsApp">
                        <i class="fa-solid fa-hand-holding-dollar"></i>
                    </button>
                    <button onclick="sendProjectCompletionWA(${proj.id})" class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors" title="Send Completion WhatsApp">
                        <i class="fa-solid fa-circle-check"></i>
                    </button>
                    <button onclick="editProject(${proj.id})" class="p-1 text-brand-600 hover:text-brand-800 transition-colors" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="cloneProject(${proj.id})" class="p-1 text-blue-500 hover:text-blue-700 transition-colors" title="Clone / Duplicate">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                    ${(proj.driveLink || proj.googleDriveLink) ? `
                        <a href="${(proj.driveLink || proj.googleDriveLink).startsWith('http') ? (proj.driveLink || proj.googleDriveLink) : 'https://' + (proj.driveLink || proj.googleDriveLink)}" target="_blank" rel="noopener noreferrer" class="p-1 text-amber-500 hover:text-amber-700 transition-colors inline-block" title="Open Google Drive Files">
                            <i class="fa-brands fa-google-drive"></i>
                        </a>
                    ` : ''}
                    ${proj.folderPath ? `
                        <button onclick="copyFolderPath('${proj.folderPath.replace(/\\/g, '\\\\')}')" class="p-1 text-gray-500 hover:text-gray-800 transition-colors" title="Copy Folder Path: ${proj.folderPath}">
                            <i class="fa-solid fa-folder-open"></i>
                        </button>
                    ` : ''}
                    <button onclick="deleteProject(${proj.id})" class="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `}).join('');
    } catch (e) {
        console.error("Error loading projects:", e);
    }
}

async function handleProjectSubmit(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving Project...';
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('project-id').value;
        const isPersonal = document.getElementById('project-is-personal').checked;
        let projectID = document.getElementById('project-custom-id').value;
        const name = document.getElementById('project-name').value;
        const customerName = document.getElementById('project-customer').value;
        const customerPhone = document.getElementById('project-customer-phone').value;
        const registrationDate = document.getElementById('project-reg-date').value;
        const startDate = document.getElementById('project-start-date').value;
        const endDate = document.getElementById('project-end-date').value;
        const budget = document.getElementById('project-budget').value;
        const discount = parseFloat(document.getElementById('project-discount').value) || 0;
        const estimatedCompCost = document.getElementById('project-estimated-comp-cost') ? document.getElementById('project-estimated-comp-cost').value.trim() : '';
        const status = document.getElementById('project-status').value;
        const description = document.getElementById('project-desc').value;
        const conditions = document.getElementById('project-conditions').value;
        const includeComponentsNote = document.getElementById('project-note-components').checked;
        const isFullQuotation = document.getElementById('project-is-full-quotation') ? document.getElementById('project-is-full-quotation').checked : false;
        const isInvoiceMode = document.getElementById('project-is-invoice-mode') ? document.getElementById('project-is-invoice-mode').checked : false;
        const isRange = document.getElementById('project-is-range') ? document.getElementById('project-is-range').checked : false;
        const budgetMax = document.getElementById('project-budget-max') ? parseFloat(document.getElementById('project-budget-max').value) || 0 : 0;
        const folderPath = document.getElementById('project-folder-path').value;
        const driveLink = document.getElementById('project-drive-link') ? document.getElementById('project-drive-link').value.trim() : '';

        // Collect Client Payments (Inbound Income)
        const clientPayments = [];
        const rows = document.querySelectorAll('.client-payment-row');
        for (const row of rows) {
            const amount = parseFloat(row.querySelector('.payment-amount').value) || 0;
            const date = row.querySelector('.payment-date').value;
            const method = row.querySelector('.payment-method').value;
            const note = row.querySelector('.payment-note').value;
            const receiptNo = row.querySelector('.payment-receipt-no') ? row.querySelector('.payment-receipt-no').value : '';
            const saleId = row.querySelector('.payment-sale-id').value;

            let attachment = row.querySelector('.existing-attachment') ? row.querySelector('.existing-attachment').value : '';
            const fileInput = row.querySelector('.payment-slip-file');

            if (fileInput && fileInput.files && fileInput.files[0]) {
                attachment = await window.compressImageFile(fileInput.files[0]);
            }

            if (amount > 0) {
                clientPayments.push({ amount, date, method, note, receiptNo, saleId, attachment });
            }
        }

        // Collect Customer Team Members
        const customerTeam = [];
        document.querySelectorAll('.customer-member-row').forEach(row => {
            const memberName = row.querySelector('.member-name').value;
            const memberPhone = row.querySelector('.member-phone').value;
            if (memberName) {
                customerTeam.push({ name: memberName, phone: memberPhone });
            }
        });

        // Collect Items
        const items = [];
        document.querySelectorAll('.project-item-row').forEach(row => {
            const desc = row.querySelector('.item-desc').value;
            const noteInput = row.querySelector('.item-note');
            const note = noteInput ? noteInput.value : '';
            const amount = row.querySelector('.item-amount').value;
            const showPrice = row.querySelector('.item-show-price').checked;
            if (desc && amount !== '') {
                items.push({ desc, note, amount, showPrice });
            }
        });

        // Collect Team Payments
        const teamPayments = [];
        document.querySelectorAll('.team-payment-row').forEach(row => {
            const name = row.querySelector('.team-name').value.trim();
            const agreed = parseFloat(row.querySelector('.team-agreed').value) || 0;
            const paid = parseFloat(row.querySelector('.team-paid').value) || 0;
            const date = row.querySelector('.team-date').value;
            const reason = row.querySelector('.team-reason').value;
            const isLinked = row.querySelector('.team-link-checkbox') ? row.querySelector('.team-link-checkbox').checked : false;

            if (name) {
                teamPayments.push({ name, agreed, paid, date, reason, isLinked });
            }
        });

        // Collect Components
        const components = [];
        document.querySelectorAll('.project-component-row').forEach(row => {
            const name = row.querySelector('.comp-name').value;
            const qty = parseFloat(row.querySelector('.comp-qty').value) || 0;
            const costPrice = parseFloat(row.querySelector('.comp-cost-price').value) || 0;
            const sellingPrice = parseFloat(row.querySelector('.comp-selling-price').value) || 0;
            const showPrice = row.querySelector('.comp-show-price') ? row.querySelector('.comp-show-price').checked : true;
            const total = qty * sellingPrice;
            if (name) {
                components.push({ name, qty, costPrice, sellingPrice, unitPrice: sellingPrice, total, showPrice });
            }
        });

        // Signed Agreement Attachment
        const agreementFile = document.getElementById('project-agreement-file');
        let agreementAttachment = null;
        if (agreementFile && agreementFile.files && agreementFile.files[0]) {
            agreementAttachment = await window.compressImageFile(agreementFile.files[0]);
        } else if (id) {
            const oldProj = await db.projects.get(parseInt(id));
            if (oldProj) agreementAttachment = oldProj.agreementAttachment;
        }

        if (!name || !customerName || isNaN(parseFloat(budget)) || (!isPersonal && !projectID)) {
            alert('Please fill in required fields (Name, Customer, Budget, Project ID)');
            return;
        }

        // Ensure personal projects have a unique internal ID for linking
        if (isPersonal && (!projectID || projectID === 'PERSONAL')) {
            const existingProj = id ? await db.projects.get(parseInt(id)) : null;
            if (existingProj && existingProj.isPersonal && existingProj.projectID.startsWith('PERSONAL-')) {
                projectID = existingProj.projectID;
            } else {
                projectID = `PERSONAL-${Date.now()}`;
            }
        }

        const projectData = {
            projectID,
            isPersonal,
            isFullQuotation,
            isInvoiceMode,
            isRange,
            budgetMax,
            name,
            customerName,
            customerPhone,
            customerTeam,
            clientPayments,
            registrationDate,
            startDate,
            endDate,
            budget,
            discount, // Added discount
            estimatedCompCost, // Added estimated component cost for agreement
            status,
            description,
            conditions,
            includeComponentsNote,
            folderPath,
            driveLink, // Added Google Drive link
            googleDriveLink: driveLink, // Alias for convenience
            items,
            teamPayments,
            components, // Added components
            agreementAttachment, // Added signed agreement
            isFullQuotation, // Added Full Quotation mode
            timestamp: Date.now(),
            monthYear: registrationDate.substring(0, 7)
        };

        // Sync Payments to Sales Table (for Total Income)
        const newPaymentIds = [];
        for (let i = 0; i < clientPayments.length; i++) {
            const p = clientPayments[i];

            // Assign a fresh sequential Receipt No if it's a new payment
            let finalReceiptNo = p.receiptNo;
            if (!finalReceiptNo || finalReceiptNo.includes('XXXX')) {
                finalReceiptNo = await getNextReceiptNo();
            }

            const saleData = {
                receiptNo: finalReceiptNo,
                date: p.date,
                customerName: `${customerName} (Project: ${name})`,
                invoiceNo: isPersonal ? 'PERSONAL' : projectID,
                projectId: isPersonal ? 'PERSONAL' : projectID,
                paymentMethod: p.method,
                amount: p.amount,
                status: 'PAID',
                timestamp: Date.now(),
                monthYear: p.date.substring(0, 7)
            };

            if (p.saleId) {
                // Update existing sale
                await db.sales.update(parseInt(p.saleId), saleData);
            } else {
                // BUG FIX: Try to find existing sale by receiptNo if saleId is missing (from old saves)
                const existingSale = await db.sales.where('receiptNo').equals(saleData.receiptNo).first();
                if (existingSale && existingSale.invoiceNo === projectID) {
                    await db.sales.update(existingSale.id, saleData);
                    clientPayments[i].saleId = existingSale.id;
                    clientPayments[i].receiptNo = existingSale.receiptNo;
                } else {
                    // Create new sale
                    const sId = await db.sales.add(saleData);
                    clientPayments[i].saleId = sId;
                    clientPayments[i].receiptNo = saleData.receiptNo;
                    newPaymentIds.push(sId);
                }
            }
        }

        // Now save or update the project with properly linked sale IDs
        let savedProjectId = id ? parseInt(id) : null;
        const finalProjectData = { ...projectData, ...(savedProjectId ? { id: savedProjectId } : {}), clientPayments };
        if (id) {
            await db.projects.update(parseInt(id), finalProjectData);
        } else {
            savedProjectId = await db.projects.add(finalProjectData);
        }

        // Auto-print receipts for new payments
        if (newPaymentIds.length > 0) {
            if (confirm('Payment(s) recorded successfully! Do you want to print the receipt(s) now?')) {
                for (const sId of newPaymentIds) {
                    await reprintReceipt(sId);
                }
            }
            if (customerPhone && confirm('Do you want to send a WhatsApp payment confirmation message?')) {
                const lastPayment = clientPayments[clientPayments.length - 1];
                sendProjectPaymentWA(isPersonal ? 'PERSONAL' : projectID, lastPayment.amount, lastPayment.date, customerName, customerPhone, name, lastPayment.receiptNo);
            }
        }

        // Auto completion WhatsApp prompt when project is Completed
        if (status === 'Completed' && customerPhone) {
            if (confirm('Project is marked as COMPLETED! Do you want to send a WhatsApp completion notification to the customer now?')) {
                await sendProjectCompletionWA(savedProjectId || finalProjectData);
            }
        }

        // Sync any checked team payments to memberProjectPayments table
        if (db.memberProjectPayments) {
            for (const tp of teamPayments) {
                if (tp.isLinked && tp.name) {
                    try {
                        const member = db.teamMembers ? await db.teamMembers.where('name').equalsIgnoreCase(tp.name).first() : null;
                        const memberId = member ? member.id : null;
                        const existing = await db.memberProjectPayments.filter(p =>
                            p.projectName.toLowerCase() === name.toLowerCase() &&
                            p.memberName.toLowerCase() === tp.name.toLowerCase()
                        ).first();
                        if (existing) {
                            await db.memberProjectPayments.update(existing.id, {
                                memberId: memberId || existing.memberId,
                                memberName: tp.name,
                                projectName: name,
                                quoNumber: projectID || existing.quoNumber || '',
                                agreedAmount: tp.agreed,
                                paidAmount: tp.paid,
                                date: tp.date || new Date().toISOString().split('T')[0],
                                notes: tp.reason || '',
                                timestamp: Date.now()
                            });
                        } else {
                            await db.memberProjectPayments.add({
                                memberId,
                                memberName: tp.name,
                                projectName: name,
                                quoNumber: projectID || '',
                                agreedAmount: tp.agreed,
                                paidAmount: tp.paid,
                                date: tp.date || new Date().toISOString().split('T')[0],
                                notes: tp.reason || '',
                                timestamp: Date.now()
                            });
                        }
                    } catch (err) {
                        console.error('Error syncing team payment to member registry:', err);
                    }
                }
            }
        }

        // Reset and Reload
        resetProjectForm();
        loadProjects();

    } catch (e) {
        console.error("Error saving project:", e);
        alert('Failed to save project');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Helper: Add dynamic item row
window.addProjectItemRow = function (desc = '', note = '', amount = '', showPrice = true) {
    const container = document.getElementById('project-items-container');
    const row = document.createElement('div');
    row.className = 'grid grid-cols-12 gap-3 items-center project-item-row relative';
    row.innerHTML = `
        <div class="col-span-4 relative">
            <input type="text" placeholder="Item Description" value="${desc}" class="item-desc w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-500 outline-none text-sm" oninput="handleItemDescInput(this)" onfocus="handleItemDescInput(this)">
            <div class="autocomplete-list absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 hidden max-h-48 overflow-y-auto"></div>
        </div>
        <div class="col-span-3">
            <input type="text" placeholder="Note (Optional)" value="${note}" class="item-note w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-500 outline-none text-sm text-gray-500">
        </div>
        <div class="col-span-2">
            <input type="text" placeholder="Amount (e.g. 2000-3000)" value="${amount}" class="item-amount w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-500 outline-none text-sm font-mono" oninput="calculateProjectBudget()">
        </div>
        <div class="col-span-2 flex items-center gap-2">
            <input type="checkbox" class="item-show-price w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500" ${showPrice ? 'checked' : ''}>
            <label class="text-[10px] font-bold text-gray-500 uppercase">Show Price</label>
        </div>
        <div class="col-span-1 text-center">
            <button type="button" onclick="this.closest('.project-item-row').remove(); calculateProjectBudget();" class="text-gray-400 hover:text-red-500">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;
    container.appendChild(row);
};

// Handle auto-suggest for Project Items
window.handleItemDescInput = async function (inputElem) {
    const val = inputElem.value.toLowerCase().trim();
    const listWrapper = inputElem.nextElementSibling;

    if (!val) {
        listWrapper.classList.add('hidden');
        listWrapper.innerHTML = '';
        return;
    }

    try {
        const projects = await db.projects.toArray();
        let suggestions = [];

        // collect items from past projects
        projects.forEach(p => {
            if (p.items && p.items.length) {
                p.items.forEach(item => {
                    // search desc
                    if (item.desc && item.desc.toLowerCase().includes(val)) {
                        suggestions.push({
                            desc: item.desc,
                            amount: item.amount || ''
                        });
                    }
                });
            }
        });

        // Remove duplicates by desc
        const uniqueSuggestions = [];
        const seen = new Set();
        for (const s of suggestions) {
            if (!seen.has(s.desc)) {
                seen.add(s.desc);
                uniqueSuggestions.push(s);
            }
        }

        if (uniqueSuggestions.length === 0) {
            listWrapper.classList.add('hidden');
            listWrapper.innerHTML = '';
            return;
        }

        // Render Dropdown
        listWrapper.innerHTML = uniqueSuggestions.map(s => {
            const safeDesc = s.desc.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            return `
            <div class="px-4 py-2 hover:bg-brand-50 cursor-pointer text-sm flex justify-between items-center transition-colors border-b border-gray-50 last:border-0" 
                 onclick="selectItemDesc(this, '${safeDesc}', '${s.amount}')">
                <span class="font-medium text-gray-800">${s.desc}</span>
                <span class="text-xs text-brand-600 font-bold bg-brand-50 px-2 py-0.5 rounded">LKR ${formatItemAmount(s.amount, 2)}</span>
            </div>
            `;
        }).join('');
        listWrapper.classList.remove('hidden');

    } catch (e) {
        console.error("Error fetching suggestions:", e);
    }
};

window.selectItemDesc = function (elem, desc, amount) {
    const row = elem.closest('.project-item-row');
    const descInput = row.querySelector('.item-desc');
    const amountInput = row.querySelector('.item-amount');
    const listWrapper = elem.closest('.autocomplete-list');

    descInput.value = desc;
    amountInput.value = amount || '';

    listWrapper.classList.add('hidden');
    listWrapper.innerHTML = '';

    // trigger budget calculate if needed
    if (typeof calculateProjectBudget === 'function') {
        calculateProjectBudget();
    }
};

// Global click listener to close dropdowns when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.project-item-row') && !e.target.closest('.project-component-row')) {
        document.querySelectorAll('.autocomplete-list').forEach(list => {
            list.classList.add('hidden');
        });
    }
});

// Helper: Add dynamic client payment row
window.addProjectPaymentRow = async function (amount = '', date = '', method = 'Cash', note = '', saleId = '', receiptNo = '', attachment = '') {
    const container = document.getElementById('project-payments-container');
    const row = document.createElement('div');
    row.className = 'bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-3 client-payment-row relative group';

    if (!date) date = new Date().toISOString().split('T')[0];

    // Auto-generate next REC number for UI if it's a new row
    if (!receiptNo && !saleId) {
        const existingRows = document.querySelectorAll('.client-payment-row').length;
        const nextBase = await getNextReceiptNo();
        const baseNum = parseInt(nextBase.replace('REC ', '')) || 100;
        receiptNo = `REC ${String(baseNum + existingRows).padStart(4, '0')}`;
    }

    row.innerHTML = `
        <input type="hidden" class="payment-sale-id" value="${saleId}">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
             <div class="md:col-span-1">
                <label class="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Receipt No</label>
                <input type="text" placeholder="PAY-001" value="${receiptNo}" class="payment-receipt-no w-full px-3 py-2 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none text-xs font-mono" ${saleId ? 'readonly' : ''}>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Amount (LKR)</label>
                <input type="number" placeholder="0.00" value="${amount}" class="payment-amount w-full px-3 py-2 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none text-sm font-mono" ${saleId ? 'readonly' : ''}>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Date</label>
                <input type="date" value="${date}" class="payment-date w-full px-3 py-2 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none text-xs" ${saleId ? 'readonly' : ''}>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Method</label>
                <select class="payment-method w-full px-3 py-2 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none text-sm bg-white" ${saleId ? 'disabled' : ''} onchange="toggleRowSlipField(this)">
                    <option value="Cash" ${method === 'Cash' ? 'selected' : ''}>Cash</option>
                    <option value="Bank Transfer" ${method === 'Bank Transfer' ? 'selected' : ''}>Bank Transfer</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
            <div class="payment-slip-container ${method === 'Bank Transfer' ? '' : 'hidden'}">
                <label class="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Bank Slip (Image)</label>
                <div class="flex gap-2 items-center">
                    <input type="file" accept="image/*" class="payment-slip-file w-full px-3 py-1.5 rounded-lg border border-emerald-100 bg-white text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-emerald-50 file:text-emerald-700" ${saleId ? 'disabled' : ''}>
                    ${attachment ? `
                        <button type="button" onclick="viewBase64Slip('${attachment}')" class="text-emerald-600 hover:text-emerald-800" title="View Currently Saved Slip">
                            <i class="fa-solid fa-image text-sm"></i>
                        </button>
                    ` : ''}
                </div>
                <input type="hidden" class="existing-attachment" value="${attachment}">
            </div>
            <div class="${method === 'Bank Transfer' ? '' : 'md:col-span-2'}">
                <label class="block text-[10px] font-bold text-emerald-600 uppercase mb-1">Note (e.g. Advance)</label>
                <div class="flex gap-2">
                    <input type="text" placeholder="Note" value="${note}" class="payment-note w-full px-3 py-2 rounded-lg border border-emerald-200 focus:border-emerald-500 outline-none text-sm" ${saleId ? 'readonly' : ''}>
                    ${saleId ? `
                        <div class="flex gap-1">
                            <button type="button" onclick="sendProjectPaymentWARow(this)" class="bg-emerald-50 text-emerald-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 border border-emerald-200" title="Send WhatsApp">
                                <i class="fa-brands fa-whatsapp text-[10px]"></i>
                            </button>
                            <button type="button" onclick="reprintReceipt(${saleId})" class="bg-brand-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-brand-700" title="Print 80mm">
                                <i class="fa-solid fa-print text-[10px]"></i>
                            </button>
                            <button type="button" onclick="downloadReceiptPDF(${saleId})" class="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-700" title="Download A4 PDF">
                                <i class="fa-solid fa-file-pdf text-[10px]"></i>
                            </button>
                            <button type="button" onclick="deleteClientPayment(this, ${saleId})" class="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-200" title="Delete Payment">
                                <i class="fa-solid fa-trash text-[10px]"></i>
                            </button>
                        </div>
                    ` : `
                        <button type="button" onclick="this.closest('.client-payment-row').remove();" class="bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;
    container.appendChild(row);
};

window.toggleRowSlipField = function (el) {
    const row = el.closest('.client-payment-row');
    const container = row.querySelector('.payment-slip-container');
    const noteCol = row.querySelector('div:has(.payment-note)');

    if (el.value === 'Bank Transfer') {
        container.classList.remove('hidden');
        if (noteCol && noteCol.parentElement) noteCol.parentElement.classList.remove('md:col-span-2');
    } else {
        container.classList.add('hidden');
        if (noteCol && noteCol.parentElement) noteCol.parentElement.classList.add('md:col-span-2');
    }
}

window.deleteClientPayment = async function (btn, saleId) {
    if (!confirm('Are you sure you want to delete this payment? This will remove the transaction and update account balances.')) return;
    try {
        const row = btn.closest('.client-payment-row');
        await db.sales.delete(parseInt(saleId));

        const projectIdInput = document.getElementById('project-id');
        if (projectIdInput && projectIdInput.value) {
            const pId = parseInt(projectIdInput.value);
            const proj = await db.projects.get(pId);
            if (proj && proj.clientPayments) {
                proj.clientPayments = proj.clientPayments.filter(p => parseInt(p.saleId) !== parseInt(saleId));
                await db.projects.update(pId, { clientPayments: proj.clientPayments });
            }
        }
        
        row.remove();
        alert('Payment deleted successfully.');
        if (typeof calculateProjectProfit === 'function') {
            calculateProjectProfit();
        }
    } catch (e) {
        console.error(e);
        alert('Failed to delete payment.');
    }
};

window.viewBase64Slip = function (base64) {
    const win = window.open();
    win.document.write(`
        <html>
        <body style="margin:0; background:#1a1a1a; display:flex; justify-content:center; align-items:center; min-height:100vh;">
            <img src="${base64}" style="max-width:90%; max-height:90vh; box-shadow:0 0 50px rgba(0,0,0,0.5); cursor:pointer;" onclick="window.close()">
        </body>
        </html>
    `);
}

// Helper: Add dynamic customer member row
window.addCustomerMemberRow = function (name = '', phone = '') {
    const container = document.getElementById('customer-team-container');
    const row = document.createElement('div');
    row.className = 'grid grid-cols-12 gap-3 items-center customer-member-row bg-white p-2 rounded-lg border border-dashed border-gray-200';
    row.innerHTML = `
        <div class="col-span-6">
            <input type="text" placeholder="Member Name" value="${name}" class="member-name w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 outline-none text-xs">
        </div>
        <div class="col-span-5">
            <input type="text" placeholder="Phone" value="${phone}" class="member-phone w-full px-3 py-1.5 rounded border border-gray-200 focus:border-emerald-500 outline-none text-xs">
        </div>
        <div class="col-span-1 text-center">
            <button type="button" onclick="this.closest('.customer-member-row').remove();" class="text-gray-300 hover:text-red-500">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(row);
};

// Helper: Calculate Budget from items ONLY (Quotation Total)
window.calculateProjectBudget = function () {
    // First, update all component line totals (for internal tracking/material invoice)
    document.querySelectorAll('.project-component-row').forEach(row => {
        const qty = parseFloat(row.querySelector('.comp-qty').value) || 0;
        const sellingPrice = parseFloat(row.querySelector('.comp-selling-price').value) || 0;
        row.querySelector('.comp-total').value = (qty * sellingPrice).toFixed(2);
    });

    let minTotal = 0;
    let maxTotal = 0;
    let hasRange = false;

    const isFullQuotation = document.getElementById('project-is-full-quotation') ? document.getElementById('project-is-full-quotation').checked : false;

    // Sum Quotation Items (Services)
    if (!isFullQuotation) {
        document.querySelectorAll('.item-amount').forEach(input => {
            const valStr = String(input.value).trim();
            if (!valStr) return;
            
            if (valStr.includes('-')) {
                const parts = valStr.split('-');
                const min = parseFloat(parts[0]) || 0;
                const max = parseFloat(parts[1]) || 0;
                minTotal += min;
                maxTotal += max;
                hasRange = true;
            } else {
                const val = parseFloat(valStr) || 0;
                minTotal += val;
                maxTotal += val;
            }
        });

        if (hasRange && maxTotal > minTotal) {
            document.getElementById('project-budget').value = `${minTotal} - ${maxTotal}`;
        } else {
            document.getElementById('project-budget').value = minTotal.toFixed(2);
        }
    } else {
        let compTotal = 0;
        document.querySelectorAll('.project-component-row').forEach(row => {
            const qty = parseFloat(row.querySelector('.comp-qty').value) || 0;
            const sellingPrice = parseFloat(row.querySelector('.comp-selling-price').value) || 0;
            compTotal += (qty * sellingPrice);
        });
        
        const isRange = document.getElementById('project-is-range') ? document.getElementById('project-is-range').checked : false;
        if (isRange) {
            const maxVal = document.getElementById('project-budget-max') ? parseFloat(document.getElementById('project-budget-max').value) || 0 : 0;
            if (maxVal > compTotal) {
                document.getElementById('project-budget').value = `${compTotal.toFixed(2)} - ${maxVal.toFixed(2)}`;
            } else {
                document.getElementById('project-budget').value = `${compTotal.toFixed(2)} - ${compTotal.toFixed(2)}`;
            }
        } else {
            document.getElementById('project-budget').value = compTotal.toFixed(2);
        }
    }
    
    // Make budget NEVER readonly, so user can edit range/fixed price anytime
    document.getElementById('project-budget').readOnly = false;
    
    calculateProjectProfit();
};

window.toggleProjectRange = function(isRange) {
    const maxInput = document.getElementById('project-budget-max');
    if (maxInput) {
        if (isRange) {
            maxInput.classList.remove('hidden');
        } else {
            maxInput.classList.add('hidden');
        }
    }
    calculateProjectBudget();
};

window.toggleFullQuotation = function(isFull) {
    const section = document.getElementById('project-items-section-container');
    const rangeToggleContainer = document.getElementById('project-range-toggle-container');
    
    if (section) {
        if (isFull) {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
        }
    }
    if (rangeToggleContainer) rangeToggleContainer.classList.remove('hidden');
    calculateProjectBudget(); // Recalculate budget to reflect changes
};

// Helper: Calculate Internal Profit
window.calculateProjectProfit = function () {
    const budgetRaw = document.getElementById('project-budget').value;
    const budget = parseFloat(budgetRaw) || 0;
    let totalPaidToTeam = 0;
    let componentProfit = 0;

    // Calculate Team Payments
    document.querySelectorAll('.team-payment-row').forEach(row => {
        const agreed = parseFloat(row.querySelector('.team-agreed').value) || 0;
        const paid = parseFloat(row.querySelector('.team-paid').value) || 0;
        const balance = agreed - paid;
        row.querySelector('.team-balance').value = balance.toFixed(2);
        totalPaidToTeam += agreed;
    });

    // Calculate Component Profit (Selling Price - Cost Price)
    document.querySelectorAll('.project-component-row').forEach(row => {
        const qty = parseFloat(row.querySelector('.comp-qty').value) || 0;
        const costPrice = parseFloat(row.querySelector('.comp-cost-price').value) || 0;
        const sellingPrice = parseFloat(row.querySelector('.comp-selling-price').value) || 0;
        componentProfit += (qty * (sellingPrice - costPrice));
    });

    const isFullQuotation = document.getElementById('project-is-full-quotation') ? document.getElementById('project-is-full-quotation').checked : false;

    // Components cost is separate and paid by customer, so profit = budget - team payments - discount + component profit
    const totalExpense = totalPaidToTeam;
    const discount = parseFloat(document.getElementById('project-discount').value) || 0;
    
    let profit = 0;
    if (isFullQuotation) {
        // In Full Quotation, the budget IS the total selling price of components.
        // So profit is just the component profit minus any other expenses/discounts.
        profit = componentProfit - totalExpense - discount;
    } else {
        profit = budget - totalExpense - discount + componentProfit;
    }

    document.getElementById('summary-revenue').textContent = `LKR ${formatItemAmount(budgetRaw, 2)}`;
    document.getElementById('summary-expenses').textContent = `LKR ${totalExpense.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
    // Show discount in summary if you want, but for now just subtract from profit
    document.getElementById('summary-profit').textContent = `LKR ${profit.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;

    const profitEl = document.getElementById('summary-profit');
    profitEl.className = `text-xl font-bold font-mono ${profit >= 0 ? 'text-brand-600' : 'text-red-600'}`;
};

// Helper: Add Project Component Row
window.addProjectComponentRow = function (name = '', qty = '', costPrice = '', sellingPrice = '', showPrice = true) {
    const container = document.getElementById('project-components-container');
    const row = document.createElement('div');
    row.className = 'bg-purple-50/30 p-4 rounded-xl border border-purple-100 space-y-3 project-component-row relative group';

    row.innerHTML = `
        <button type="button" onclick="this.closest('.project-component-row').remove(); calculateProjectProfit(); calculateProjectBudget();"
            class="absolute right-3 top-3 text-gray-300 hover:text-red-500 transition-opacity">
            <i class="fa-solid fa-circle-xmark text-lg"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div class="md:col-span-5 relative">
                <label class="block text-[10px] font-bold text-purple-600 uppercase mb-1">Component / Material Name</label>
                <input type="text" placeholder="e.g. Paints, Brushes" value="${name}" class="comp-name w-full px-3 py-2 rounded-lg border border-purple-200 focus:border-purple-500 outline-none text-sm font-medium" oninput="handleComponentDescInput(this)" onfocus="handleComponentDescInput(this)">
                <div class="autocomplete-list absolute z-50 w-full bg-white border border-gray-100 rounded-lg shadow-xl mt-1 hidden max-h-48 overflow-y-auto" style="max-height: 200px; overflow-y: auto;"></div>
            </div>
            <div class="md:col-span-1">
                <label class="block text-[10px] font-bold text-purple-600 uppercase mb-1">Qty</label>
                <input type="number" placeholder="1" value="${qty}" class="comp-qty w-full px-3 py-2 rounded-lg border border-purple-200 focus:border-purple-500 outline-none text-sm font-mono" oninput="calculateProjectBudget(); calculateProjectProfit();">
            </div>
            <div class="md:col-span-2">
                <label class="block text-[10px] font-bold text-purple-600 uppercase mb-1">Cost Price</label>
                <input type="number" placeholder="0.00" value="${costPrice}" class="comp-cost-price w-full px-3 py-2 rounded-lg border border-purple-200 focus:border-purple-500 outline-none text-sm font-mono text-red-600 font-bold" oninput="calculateProjectProfit()">
            </div>
            <div class="md:col-span-2">
                <label class="block text-[10px] font-bold text-purple-600 uppercase mb-1">Selling Price</label>
                <input type="number" placeholder="0.00" value="${sellingPrice}" class="comp-selling-price w-full px-3 py-2 rounded-lg border border-purple-200 focus:border-purple-500 outline-none text-sm font-mono text-emerald-600 font-bold" oninput="calculateProjectBudget(); calculateProjectProfit();">
            </div>
            <div class="md:col-span-2">
                <label class="block text-[10px] font-bold text-purple-600 uppercase mb-1">Total (Sell)</label>
                <input type="text" readonly value="0.00" class="comp-total w-full px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 text-sm font-mono outline-none">
                <div class="flex items-center gap-1 mt-2">
                    <input type="checkbox" class="comp-show-price w-3 h-3 text-purple-600 rounded" ${showPrice ? 'checked' : ''}>
                    <label class="text-[10px] text-gray-500 cursor-pointer" onclick="const cb = this.previousElementSibling; cb.checked = !cb.checked;">Show Price</label>
                </div>
            </div>
        </div>
    `;
    container.appendChild(row);
    calculateProjectBudget();
    calculateProjectProfit();
};

// Handle auto-suggest for Project Components
window.handleComponentDescInput = async function (inputElem) {
    const val = inputElem.value.toLowerCase().trim();
    const listWrapper = inputElem.nextElementSibling;

    if (!val) {
        listWrapper.classList.add('hidden');
        listWrapper.innerHTML = '';
        return;
    }

    try {
        const projects = await db.projects.toArray();
        let suggestions = [];

        // collect components from past projects
        projects.forEach(p => {
            if (p.components && p.components.length) {
                p.components.forEach(comp => {
                    // search desc
                    if (comp.name && comp.name.toLowerCase().includes(val)) {
                        suggestions.push({
                            name: comp.name,
                            unitPrice: comp.unitPrice || 0
                        });
                    }
                });
            }
        });

        // Remove duplicates by name
        const uniqueSuggestions = [];
        const seen = new Set();
        for (const s of suggestions) {
            if (!seen.has(s.name)) {
                seen.add(s.name);
                uniqueSuggestions.push(s);
            }
        }

        if (uniqueSuggestions.length === 0) {
            listWrapper.classList.add('hidden');
            listWrapper.innerHTML = '';
            return;
        }

        // Render Dropdown
        listWrapper.innerHTML = uniqueSuggestions.map(s => {
            const safeName = s.name.replace(/'/g, "\\\'").replace(/"/g, '&quot;');
            return `
            <div class="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm flex justify-between items-center transition-colors border-b border-gray-50 last:border-0" 
                 onclick="selectComponentDesc(this, '${safeName}', ${s.unitPrice})">
                <span class="font-medium text-gray-800">${s.name}</span>
                <span class="text-xs text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">LKR ${Number(s.unitPrice).toFixed(2)}</span>
            </div>
            `;
        }).join('');
        listWrapper.classList.remove('hidden');

    } catch (e) {
        console.error("Error fetching component suggestions:", e);
    }
};

window.selectComponentDesc = function (elem, name, unitPrice) {
    const row = elem.closest('.project-component-row');
    const nameInput = row.querySelector('.comp-name');
    const priceInput = row.querySelector('.comp-price');
    const listWrapper = elem.closest('.autocomplete-list');

    nameInput.value = name;
    priceInput.value = unitPrice || '';

    listWrapper.classList.add('hidden');
    listWrapper.innerHTML = '';

    // trigger budget calculate if needed
    if (typeof calculateProjectBudget === 'function') {
        calculateProjectBudget();
    }
};

// Helper: Add Team Payment Row
window.addTeamPaymentRow = async function (name = '', agreed = '', paid = '', date = '', reason = '', isLinked = false) {
    const container = document.getElementById('team-payments-container');
    const row = document.createElement('div');
    row.className = 'bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3 team-payment-row relative group';

    // Default date to today if empty
    if (!date) date = new Date().toISOString().split('T')[0];

    // Ensure team members datalist exists
    let datalist = document.getElementById('project-team-members-datalist');
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = 'project-team-members-datalist';
        document.body.appendChild(datalist);
    }
    if (db.teamMembers) {
        try {
            const tms = await db.teamMembers.orderBy('name').toArray();
            datalist.innerHTML = tms.map(t => `<option value="${t.name}">`).join('');
        } catch (e) {}
    }

    row.innerHTML = `
        <button type="button" onclick="this.closest('.team-payment-row').remove(); calculateProjectProfit();"
            class="absolute right-3 top-3 text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <i class="fa-solid fa-circle-xmark text-lg"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Member Name</label>
                <input type="text" list="project-team-members-datalist" placeholder="Select or type name" value="${name}" class="team-name w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm font-medium">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Total Agreed (LKR)</label>
                <input type="number" placeholder="0.00" value="${agreed}" class="team-agreed w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm font-mono" oninput="calculateProjectProfit()">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Paid Amount (LKR)</label>
                <input type="number" placeholder="0.00" value="${paid}" class="team-paid w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm font-mono" oninput="calculateProjectProfit()">
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div class="md:col-span-1">
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Current Balance</label>
                <input type="text" readonly value="0.00" class="team-balance w-full px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 text-sm font-mono outline-none">
            </div>
            <div class="md:col-span-1">
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Payment Date</label>
                <input type="date" value="${date}" class="team-date w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-xs">
            </div>
            <div class="md:col-span-2">
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Reason / Note</label>
                <input type="text" placeholder="e.g. Design Advance" value="${reason}" class="team-reason w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm">
            </div>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
            <label class="flex items-center gap-2 text-[11px] font-bold text-brand-600 cursor-pointer select-none" title="Only links to the team member's record when checked">
                <input type="checkbox" class="team-link-checkbox rounded border-gray-300 text-brand-600 focus:ring-brand-500" ${isLinked ? 'checked' : ''}>
                <span>🔗 Link / Assign to Team Member Record</span>
            </label>
            <button type="button" onclick="syncSingleTeamPaymentRowToMember(this)" class="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 border border-brand-200">
                <i class="fa-solid fa-arrows-rotate"></i> Sync to Member
            </button>
        </div>
    `;
    container.appendChild(row);
    calculateProjectProfit();
};

window.syncSingleTeamPaymentRowToMember = async function (btn) {
    const row = btn.closest('.team-payment-row');
    const name = row.querySelector('.team-name')?.value.trim();
    const agreed = parseFloat(row.querySelector('.team-agreed')?.value) || 0;
    const paid = parseFloat(row.querySelector('.team-paid')?.value) || 0;
    const date = row.querySelector('.team-date')?.value || new Date().toISOString().split('T')[0];
    const reason = row.querySelector('.team-reason')?.value.trim() || '';
    const projName = document.getElementById('project-name')?.value.trim() || 'Untitled Project';
    const quoNumber = document.getElementById('project-id')?.value.trim() || '';

    if (!name) return alert('Please enter a team member name first.');
    if (!db.memberProjectPayments) return alert('Database not ready.');

    try {
        const member = db.teamMembers ? await db.teamMembers.where('name').equalsIgnoreCase(name).first() : null;
        const memberId = member ? member.id : null;

        const existing = await db.memberProjectPayments.filter(p =>
            p.projectName.toLowerCase() === projName.toLowerCase() &&
            p.memberName.toLowerCase() === name.toLowerCase()
        ).first();

        if (existing) {
            await db.memberProjectPayments.update(existing.id, {
                memberId: memberId || existing.memberId,
                memberName: name,
                projectName: projName,
                quoNumber: quoNumber || existing.quoNumber || '',
                agreedAmount: agreed,
                paidAmount: paid,
                date: date,
                notes: reason,
                timestamp: Date.now()
            });
        } else {
            await db.memberProjectPayments.add({
                memberId: memberId,
                memberName: name,
                projectName: projName,
                quoNumber: quoNumber,
                agreedAmount: agreed,
                paidAmount: paid,
                date: date,
                notes: reason,
                timestamp: Date.now()
            });
        }

        row.querySelector('.team-link-checkbox').checked = true;
        alert(`Successfully linked "${projName}" payment to team member "${name}"!`);
    } catch (e) {
        console.error('Error syncing team payment to member:', e);
        alert('Failed to sync: ' + e.message);
    }
};

// Handle auto-suggest for Project Components
window.handleComponentDescInput = async function (inputElem) {
    const val = inputElem.value.toLowerCase().trim();
    const listWrapper = inputElem.nextElementSibling;

    if (!val) {
        listWrapper.classList.add('hidden');
        listWrapper.innerHTML = '';
        return;
    }

    try {
        const projects = await db.projects.toArray();
        let suggestions = [];

        // collect components from past projects
        projects.forEach(p => {
            if (p.components && p.components.length) {
                p.components.forEach(comp => {
                    // search desc
                    if (comp.name && comp.name.toLowerCase().includes(val)) {
                        suggestions.push({
                            name: comp.name,
                            unitPrice: comp.unitPrice || 0
                        });
                    }
                });
            }
        });

        // Remove duplicates by name
        const uniqueSuggestions = [];
        const seen = new Set();
        for (const s of suggestions) {
            if (!seen.has(s.name)) {
                seen.add(s.name);
                uniqueSuggestions.push(s);
            }
        }

        if (uniqueSuggestions.length === 0) {
            listWrapper.classList.add('hidden');
            listWrapper.innerHTML = '';
            return;
        }

        // Render Dropdown
        listWrapper.innerHTML = uniqueSuggestions.map(s => {
            const safeName = s.name.replace(/'/g, "\\\'").replace(/"/g, '&quot;');
            return `
            <div class="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm flex justify-between items-center transition-colors border-b border-gray-50 last:border-0" 
                 onclick="selectComponentDesc(this, '${safeName}', ${s.unitPrice})">
                <span class="font-medium text-gray-800">${s.name}</span>
                <span class="text-xs text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">LKR ${Number(s.unitPrice).toFixed(2)}</span>
            </div>
            `;
        }).join('');
        listWrapper.classList.remove('hidden');

    } catch (e) {
        console.error("Error fetching component suggestions:", e);
    }
};

window.selectComponentDesc = function (elem, name, unitPrice) {
    const row = elem.closest('.project-component-row');
    const nameInput = row.querySelector('.comp-name');
    const priceInput = row.querySelector('.comp-price');
    const listWrapper = elem.closest('.autocomplete-list');

    nameInput.value = name;
    priceInput.value = unitPrice || '';

    listWrapper.classList.add('hidden');
    listWrapper.innerHTML = '';

    // trigger budget calculate if needed
    if (typeof calculateProjectBudget === 'function') {
        calculateProjectBudget();
    }
};

// Helper: Reset Form
window.resetProjectForm = function () {
    document.getElementById('project-form').reset();
    document.getElementById('project-id').value = '';
    document.getElementById('project-form-title').textContent = 'Register New Project';
    document.getElementById('project-submit-btn').innerHTML = '<i class="fa-solid fa-plus"></i> Register Project';
    document.getElementById('cancel-project-edit').classList.add('hidden');

    // Reset dates
    const today = new Date();
    document.getElementById('project-reg-date').valueAsDate = today;
    document.getElementById('project-start-date').valueAsDate = today;
    document.getElementById('project-customer-phone').value = '';
    document.getElementById('project-discount').value = '';
    const estCompCostInput = document.getElementById('project-estimated-comp-cost');
    if (estCompCostInput) estCompCostInput.value = '';

    // Generate new ID
    generateProjectID();

    // Clear items & team payments
    document.getElementById('project-items-container').innerHTML = '';
    document.getElementById('team-payments-container').innerHTML = '';
    document.getElementById('customer-team-container').innerHTML = '';
    document.getElementById('project-payments-container').innerHTML = '';
    document.getElementById('project-components-container').innerHTML = '';
    document.getElementById('agreement-preview-link').classList.add('hidden');
    document.getElementById('project-agreement-file').value = '';
    document.getElementById('project-conditions').value = '';
    document.getElementById('project-note-components').checked = true;
    document.getElementById('project-folder-path').value = '';
    const driveLinkInput = document.getElementById('project-drive-link');
    if (driveLinkInput) driveLinkInput.value = '';
    
    // Reset Personal Toggle
    const personalToggle = document.getElementById('project-is-personal');
    if (personalToggle) {
        personalToggle.checked = false;
        togglePersonalProject(false);
    }

    addProjectItemRow();
    calculateProjectProfit();
};

// Global scope for onclick/event listeners in HTML
window.editProject = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');

        // Populate Form
        document.getElementById('project-id').value = proj.id;
        
        // Use flag OR check magic string
        const isPersonal = proj.isPersonal || (proj.projectID === 'PERSONAL');
        const personalToggle = document.getElementById('project-is-personal');
        if (personalToggle) {
            personalToggle.checked = isPersonal;
            togglePersonalProject(isPersonal, true);
        }

        document.getElementById('project-custom-id').value = isPersonal ? '' : (proj.projectID || '');
        document.getElementById('project-name').value = proj.name;
        document.getElementById('project-customer').value = proj.customerName;
        document.getElementById('project-customer-phone').value = proj.customerPhone || '';
        document.getElementById('project-reg-date').value = proj.registrationDate;
        document.getElementById('project-start-date').value = proj.startDate;
        document.getElementById('project-end-date').value = proj.endDate;
        document.getElementById('project-budget').value = proj.budget;
        document.getElementById('project-discount').value = proj.discount || '';
        const estCompCostInput = document.getElementById('project-estimated-comp-cost');
        if (estCompCostInput) estCompCostInput.value = proj.estimatedCompCost || '';
        document.getElementById('project-status').value = proj.status;
        document.getElementById('project-desc').value = proj.description || '';
        document.getElementById('project-conditions').value = proj.conditions || '';
        document.getElementById('project-note-components').checked = proj.includeComponentsNote !== false;
        
        const fullQuoToggle = document.getElementById('project-is-full-quotation');
        if (fullQuoToggle) {
            fullQuoToggle.checked = !!proj.isFullQuotation;
            toggleFullQuotation(!!proj.isFullQuotation);
        }
        
        const invoiceModeToggle = document.getElementById('project-is-invoice-mode');
        if (invoiceModeToggle) {
            invoiceModeToggle.checked = !!proj.isInvoiceMode;
        }

        const rangeToggle = document.getElementById('project-is-range');
        if (rangeToggle) {
            rangeToggle.checked = !!proj.isRange;
            toggleProjectRange(!!proj.isRange);
        }
        
        const maxInput = document.getElementById('project-budget-max');
        if (maxInput) {
            maxInput.value = proj.budgetMax || '';
        }

        document.getElementById('project-folder-path').value = proj.folderPath || '';
        const driveLinkInput = document.getElementById('project-drive-link');
        if (driveLinkInput) driveLinkInput.value = proj.driveLink || proj.googleDriveLink || '';

        // Handle Agreement Preview
        const previewBtn = document.getElementById('agreement-preview-link');
        const fileInput = document.getElementById('project-agreement-file');
        fileInput.value = ''; // Always clear file input on edit
        if (proj.agreementAttachment) {
            previewBtn.classList.remove('hidden');
        } else {
            previewBtn.classList.add('hidden');
        }

        // Populate Customer Team Members
        const customerContainer = document.getElementById('customer-team-container');
        customerContainer.innerHTML = '';
        if (proj.customerTeam && proj.customerTeam.length > 0) {
            proj.customerTeam.forEach(m => addCustomerMemberRow(m.name, m.phone));
        }

        // Populate Client Payments
        const payContainer = document.getElementById('project-payments-container');
        payContainer.innerHTML = '';
        if (proj.clientPayments && proj.clientPayments.length > 0) {
            for (const p of proj.clientPayments) {
                await addProjectPaymentRow(p.amount, p.date, p.method, p.note, p.saleId, p.receiptNo, p.attachment);
            }
        }

        // Populate Items
        const container = document.getElementById('project-items-container');
        container.innerHTML = '';
        if (proj.items && proj.items.length > 0) {
            proj.items.forEach(item => addProjectItemRow(item.desc, item.note || '', item.amount, item.showPrice !== false));
        } else {
            addProjectItemRow(); // Fallback empty row
        }

        // Populate Team Payments
        const teamContainer = document.getElementById('team-payments-container');
        teamContainer.innerHTML = '';
        if (proj.teamPayments && proj.teamPayments.length > 0) {
            for (const p of proj.teamPayments) {
                await addTeamPaymentRow(p.name, p.agreed, p.paid, p.date, p.reason, !!p.isLinked);
            }
        }

        // Populate Components
        const compContainer = document.getElementById('project-components-container');
        compContainer.innerHTML = '';
        if (proj.components && proj.components.length > 0) {
            proj.components.forEach(c => addProjectComponentRow(c.name, c.qty, c.costPrice || c.unitPrice || '', c.sellingPrice || c.unitPrice || '', c.showPrice !== false));
        }

        // Restore manual budget override that might have been zeroed out by toggleFullQuotation
        document.getElementById('project-budget').value = proj.budget;

        // Final recalculation
        calculateProjectProfit();

        // Change UI to "Update" mode
        document.getElementById('project-form-title').textContent = 'Edit Project Details';
        document.getElementById('project-submit-btn').innerHTML = '<i class="fa-solid fa-save"></i> Update Project';
        document.getElementById('cancel-project-edit').classList.remove('hidden');

        // Scroll to form
        document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });

    } catch (e) {
        console.error(e);
    }
};

window.cloneProject = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');

        // Populate Form
        document.getElementById('project-id').value = ''; // IMPORTANT: Leave empty for new project
        
        const isPersonal = proj.isPersonal || (proj.projectID === 'PERSONAL');
        const personalToggle = document.getElementById('project-is-personal');
        if (personalToggle) {
            personalToggle.checked = isPersonal;
            togglePersonalProject(isPersonal, true);
        }

        document.getElementById('project-custom-id').value = ''; // Let them enter a new ID
        document.getElementById('project-name').value = proj.name + ' (Copy)';
        document.getElementById('project-customer').value = proj.customerName;
        document.getElementById('project-customer-phone').value = proj.customerPhone || '';
        
        const today = new Date().toLocaleDateString('en-CA');
        document.getElementById('project-reg-date').value = today;
        document.getElementById('project-start-date').value = proj.startDate;
        document.getElementById('project-end-date').value = proj.endDate;
        document.getElementById('project-budget').value = proj.budget;
        document.getElementById('project-discount').value = proj.discount || '';
        document.getElementById('project-status').value = 'Not Confirmed'; // Reset status
        document.getElementById('project-desc').value = proj.description || '';
        document.getElementById('project-conditions').value = proj.conditions || '';
        document.getElementById('project-note-components').checked = proj.includeComponentsNote !== false;
        
        const fullQuoToggle = document.getElementById('project-is-full-quotation');
        if (fullQuoToggle) {
            fullQuoToggle.checked = !!proj.isFullQuotation;
            toggleFullQuotation(!!proj.isFullQuotation);
        }
        
        const invoiceModeToggle = document.getElementById('project-is-invoice-mode');
        if (invoiceModeToggle) {
            invoiceModeToggle.checked = !!proj.isInvoiceMode;
        }

        const rangeToggle = document.getElementById('project-is-range');
        if (rangeToggle) {
            rangeToggle.checked = !!proj.isRange;
            toggleProjectRange(!!proj.isRange);
        }
        
        const maxInput = document.getElementById('project-budget-max');
        if (maxInput) {
            maxInput.value = proj.budgetMax || '';
        }

        document.getElementById('project-folder-path').value = '';
        const driveLinkInput = document.getElementById('project-drive-link');
        if (driveLinkInput) driveLinkInput.value = proj.driveLink || proj.googleDriveLink || '';

        const previewBtn = document.getElementById('agreement-preview-link');
        const fileInput = document.getElementById('project-agreement-file');
        fileInput.value = ''; 
        previewBtn.classList.add('hidden'); 

        const customerContainer = document.getElementById('customer-team-container');
        customerContainer.innerHTML = '';
        if (proj.customerTeam && proj.customerTeam.length > 0) {
            proj.customerTeam.forEach(m => addCustomerMemberRow(m.name, m.phone));
        }

        const payContainer = document.getElementById('project-payments-container');
        payContainer.innerHTML = '';
        addProjectPaymentRow();

        const container = document.getElementById('project-items-container');
        container.innerHTML = '';
        if (proj.items && proj.items.length > 0) {
            proj.items.forEach(item => addProjectItemRow(item.desc, item.note || '', item.amount, item.showPrice !== false));
        } else {
            addProjectItemRow();
        }

        const teamContainer = document.getElementById('team-payments-container');
        teamContainer.innerHTML = '';
        addTeamPaymentRow();

        const compContainer = document.getElementById('project-components-container');
        compContainer.innerHTML = '';
        if (proj.components && proj.components.length > 0) {
            proj.components.forEach(c => addProjectComponentRow(c.name, c.qty, c.costPrice || c.unitPrice || '', c.sellingPrice || c.unitPrice || '', c.showPrice !== false));
        }

        calculateProjectProfit();

        document.getElementById('project-form-title').textContent = 'Clone Project Details';
        document.getElementById('project-submit-btn').innerHTML = '<i class="fa-solid fa-save"></i> Register Cloned Project';
        document.getElementById('cancel-project-edit').classList.remove('hidden');

        document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });

    } catch (e) {
        console.error(e);
    }
};

// --- Internal Helpers to Populate PDF Templates ---
async function _populateQuotationDOM(proj) {
    const titleText = proj.isInvoiceMode ? 'INVOICE' : 'QUOTATION';
    const qTitle80mm = document.getElementById('q-title-80mm');
    if (qTitle80mm) qTitle80mm.textContent = titleText;
    const qTitleA4 = document.getElementById('q-title-a4');
    if (qTitleA4) qTitleA4.textContent = titleText;

    document.getElementById('q-no').textContent = proj.projectID || `QUO-1400`;
    document.getElementById('q-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
    document.getElementById('q-customer').textContent = proj.customerName;
    document.getElementById('q-project').textContent = proj.name;

    const itemsBody = document.getElementById('q-items-body');
    itemsBody.innerHTML = '';

    if (proj.isFullQuotation) {
        if (proj.components && proj.components.length > 0) {
            proj.components.forEach((c, index) => {
                const row = document.createElement('tr');
                row.className = index % 2 === 0 ? 'bg-white' : 'bg-brand-50/30';
                const totalStr = formatItemAmount(c.qty * (parseFloat(c.sellingPrice) || 0), 0);
                row.innerHTML = `
                    <td class="px-8 py-5 border-b border-gray-100">
                        <div class="font-bold text-gray-800">${c.name}</div>
                        <div class="text-xs text-gray-500 mt-1 italic">Qty: ${c.qty}</div>
                    </td>
                    <td class="px-8 py-5 border-b border-gray-100 text-right font-black text-gray-900">
                        ${c.showPrice !== false ? `<span class="text-xs text-gray-400 mr-2 font-black">LKR</span> ${totalStr}` : '<span class="text-gray-400 italic text-[10px]">Included in total</span>'}
                    </td>
                `;
                itemsBody.appendChild(row);
            });
        } else {
            itemsBody.innerHTML = `
                <tr class="bg-white">
                    <td class="px-8 py-5 border-b border-gray-100 font-bold text-gray-800">Materials & Components</td>
                    <td class="px-8 py-5 border-b border-gray-100 text-right font-black text-gray-900"><span class="text-xs text-gray-400 mr-2 font-black">LKR</span> ${formatItemAmount(proj.budget, 0)}</td>
                </tr>
            `;
        }
    } else {
        if (proj.items && proj.items.length > 0) {
            proj.items.forEach((item, index) => {
                const row = document.createElement('tr');
                row.className = index % 2 === 0 ? 'bg-white' : 'bg-brand-50/30';
                row.innerHTML = `
                    <td class="px-8 py-5 border-b border-gray-100">
                        <div class="font-bold text-gray-800">${item.desc}</div>
                        ${item.note ? `<div class="text-xs text-gray-500 mt-1 italic">${item.note}</div>` : ''}
                    </td>
                    <td class="px-8 py-5 border-b border-gray-100 text-right font-black text-gray-900">
                        ${item.showPrice !== false ? `<span class="text-xs text-gray-400 mr-2 font-black">LKR</span> ${formatItemAmount(item.amount, 0)}` : '<span class="text-gray-400 italic text-[10px]">Included in total</span>'}
                    </td>
                `;
                itemsBody.appendChild(row);
            });
        } else {
            itemsBody.innerHTML = `
                <tr class="bg-white">
                    <td class="px-8 py-5 border-b border-gray-100 font-bold text-gray-800">${proj.name} - Service Package</td>
                    <td class="px-8 py-5 border-b border-gray-100 text-right font-black text-gray-900"><span class="text-xs text-gray-400 mr-2 font-black">LKR</span> ${formatItemAmount(proj.budget, 0)}</td>
                </tr>
            `;
        }
    }

    document.getElementById('q-total').textContent = `LKR ${formatItemAmount(proj.budget, 2)} `;

    const descEl = document.getElementById('q-description');
    const descContainer = document.getElementById('q-description-container');
    if (proj.description && proj.description.trim() !== '') {
        descEl.textContent = proj.description;
        descContainer.classList.remove('hidden');
    } else {
        descContainer.classList.add('hidden');
    }

    const noteComponentsEl = document.getElementById('q-note-components');
    if (noteComponentsEl) {
        if (proj.includeComponentsNote !== false) {
            noteComponentsEl.classList.remove('hidden');
        } else {
            noteComponentsEl.classList.add('hidden');
        }
    }

    const condContainer = document.getElementById('q-conditions-container');
    if (condContainer) {
        if (proj.conditions && proj.conditions.trim() !== '') {
            const conditionsLines = proj.conditions.split('\n').filter(l => l.trim() !== '');
            condContainer.innerHTML = conditionsLines.map(line => `<p>*${line.trim()}</p>`).join('');
            condContainer.classList.remove('hidden');
        } else {
            condContainer.classList.add('hidden');
        }
    }

    try {
        if (window.db && window.db.settings) {
            const logoSetting = await db.settings.get('company_logo');
            if (logoSetting && logoSetting.value) {
                const logo = document.querySelector('#quotation-a4-content .app-logo');
                if (logo) {
                    logo.src = logoSetting.value;
                    logo.style.display = 'block';
                }
            }
        }
    } catch (e) { }
    const qLogo = document.querySelector('#quotation-a4-content .app-logo');
    if (qLogo && (!qLogo.src || qLogo.src === window.location.href || qLogo.src.endsWith('/'))) {
        qLogo.style.display = 'none';
    }
}

async function _populateCostSheetDOM(proj) {
    document.getElementById('cs-invoice-no').textContent = `${proj.projectID} -MAT 01`;
    document.getElementById('cs-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
    document.getElementById('cs-customer').textContent = proj.customerName;
    document.getElementById('cs-project').textContent = proj.name;

    const itemsBody = document.getElementById('cs-items-body');
    itemsBody.innerHTML = '';
    let totalCompCost = 0;

    if (proj.components && proj.components.length > 0) {
        proj.components.forEach((c, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30';
            row.innerHTML = `
                <td class="px-6 py-4 border-b border-gray-100 font-bold text-gray-800">${c.name}</td>
                <td class="px-6 py-4 border-b border-gray-100 text-center font-mono">${c.qty}</td>
                <td class="px-6 py-4 border-b border-gray-100 text-right font-mono">${parseFloat(c.sellingPrice || c.unitPrice || 0).toLocaleString()}</td>
                <td class="px-6 py-4 border-b border-gray-100 text-right font-black text-gray-900"><span class="text-xs text-gray-400 mr-1">LKR</span> ${parseFloat(c.total).toLocaleString()}</td>
            `;
            itemsBody.appendChild(row);
            totalCompCost += parseFloat(c.total);
        });
    } else {
        itemsBody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-gray-400 italic font-medium">No materials recorded for this project.</td></tr>`;
    }

    document.getElementById('cs-total').textContent = `LKR ${totalCompCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })} `;

    try {
        if (window.db && window.db.settings) {
            const logoSetting = await db.settings.get('company_logo');
            if (logoSetting && logoSetting.value) {
                const logo = document.querySelector('#cost-sheet-a4-content .app-logo');
                if (logo) {
                    logo.src = logoSetting.value;
                    logo.style.display = 'block';
                }
            }
        }
    } catch (e) { }
    const csLogo = document.querySelector('#cost-sheet-a4-content .app-logo');
    if (csLogo && (!csLogo.src || csLogo.src === window.location.href || csLogo.src.endsWith('/'))) {
        csLogo.style.display = 'none';
    }
}

async function _populateFinalInvoiceDOM(proj) {
    const serviceCharge = parseFloat(proj.budget) || 0;
    let totalMatCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
    
    if (proj.isFullQuotation) {
        totalMatCost = 0;
    }

    const discount = parseFloat(proj.discount) || 0;
    const grandTotal = (serviceCharge + totalMatCost); // Gross Total
    const totalAdv = (proj.clientPayments || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const balance = (grandTotal - discount) - totalAdv; // Net Balance

    document.getElementById('fin-invoice-no').textContent = `${proj.projectID} -SET 01`;
    document.getElementById('fin-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
    document.getElementById('fin-customer').textContent = proj.customerName;
    document.getElementById('fin-project').textContent = proj.name;

    document.getElementById('fin-quo-no').textContent = proj.projectID || `QUO - N/A`;
    document.getElementById('fin-mat-no').textContent = `${proj.projectID} -MAT 01`;

    document.getElementById('fin-service-charge').textContent = `LKR ${serviceCharge.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
    document.getElementById('fin-components-charge').textContent = `LKR ${totalMatCost.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
    document.getElementById('fin-discount').textContent = `- LKR ${discount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
    document.getElementById('fin-total').textContent = `LKR ${grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
    document.getElementById('fin-advance').textContent = `LKR ${totalAdv.toLocaleString('en-LK', { minimumFractionDigits: 2 })} `;
    document.getElementById('fin-balance').textContent = `LKR ${balance.toLocaleString('en-LK', { minimumFractionDigits: 2 })} `;

    try {
        if (window.db && window.db.settings) {
            const logoSetting = await db.settings.get('company_logo');
            if (logoSetting && logoSetting.value) {
                const logo = document.querySelector('#final-invoice-a4-content .app-logo');
                if (logo) {
                    logo.src = logoSetting.value;
                    logo.style.display = 'block';
                }
            }
        }
    } catch (e) { }
    const finLogo = document.querySelector('#final-invoice-a4-content .app-logo');
    if (finLogo && (!finLogo.src || finLogo.src === window.location.href || finLogo.src.endsWith('/'))) {
        finLogo.style.display = 'none';
    }
}

window._populateFinalInvoiceDOM = _populateFinalInvoiceDOM;
window._populateQuotationDOM = _populateQuotationDOM;
window._populateCostSheetDOM = _populateCostSheetDOM;

window.downloadQuotationPDF = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');

        await _populateQuotationDOM(proj);

        const element = document.getElementById('quotation-a4-content');
        const container = document.getElementById('quotation-a4-container');

        container.classList.remove('hidden');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '-9999px';
        container.style.zIndex = '-9999';
        container.style.display = 'block';

        const opt = {
            margin: 0.2,
            filename: `Quotation_${proj.customerName}_${proj.name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, backgroundColor: '#ffffff', letterRendering: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(element).save();
    } catch (e) {
        console.error("PDF Error:", e);
        alert('Error: ' + e.message);
    } finally {
        const container = document.getElementById('quotation-a4-container');
        container.style.display = 'none';
        container.classList.add('hidden');
    }
};

// Helper function to capture an A4 template element onto an exact canvas
const captureA4Element = async (elementId) => {
    const srcElem = document.getElementById(elementId);
    if (!srcElem) return null;

    // Temporarily make the source element visible so CSS computes correctly
    const container = srcElem.parentElement;
    const containerWasHidden = container && container.classList.contains('hidden');
    if (containerWasHidden) container.classList.remove('hidden');
    const srcWasHidden = srcElem.classList.contains('hidden');
    if (srcWasHidden) srcElem.classList.remove('hidden');

    // Force pixel width on source element momentarily so clone inherits computed styles
    srcElem.style.width = '794px';
    srcElem.style.minWidth = '794px';
    srcElem.style.maxWidth = '794px';
    srcElem.style.height = '1123px';
    srcElem.style.minHeight = '1123px';
    srcElem.style.maxHeight = '1123px';
    srcElem.style.boxSizing = 'border-box';
    srcElem.style.display = 'block';
    srcElem.style.margin = '0';

    // Dedicated offscreen capture sandbox — positioned off-screen (not opacity:0 which causes blank canvas)
    const sandbox = document.createElement('div');
    sandbox.style.cssText = [
        'position:fixed',
        'left:-9999px',
        'top:0',
        'width:794px',
        'height:1123px',
        'overflow:hidden',
        'background:#ffffff',
        'z-index:-9999',
        'display:block'
    ].join(';');

    const clone = srcElem.cloneNode(true);
    clone.classList.remove('shadow-2xl', 'mx-auto', 'hidden');
    // Strip ALL inline/class display:none from clone's descendants
    clone.querySelectorAll('[class*="hidden"]').forEach(el => el.classList.remove('hidden'));
    clone.style.cssText = [
        'margin:0',
        'padding:0',
        'width:794px',
        'min-width:794px',
        'max-width:794px',
        'height:1123px',
        'min-height:1123px',
        'max-height:1123px',
        'box-sizing:border-box',
        'position:relative',
        'top:0',
        'left:0',
        'display:block',
        'overflow:hidden',
        'background:white',
        'font-family:Inter,sans-serif'
    ].join(';');

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    try {
        // Wait a frame for layout to settle
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Ensure images within clone are loaded
        const images = clone.querySelectorAll('img');
        await Promise.all(Array.from(images).map(img =>
            img.complete ? Promise.resolve() :
            new Promise(r => { img.onload = r; img.onerror = r; setTimeout(r, 800); })
        ));

        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false
        });
        return canvas;
    } finally {
        // Restore source element styles
        srcElem.style.width = '';
        srcElem.style.minWidth = '';
        srcElem.style.maxWidth = '';
        srcElem.style.height = '';
        srcElem.style.minHeight = '';
        srcElem.style.maxHeight = '';
        srcElem.style.boxSizing = '';
        srcElem.style.display = '';
        srcElem.style.margin = '';
        if (srcWasHidden) srcElem.classList.add('hidden');
        if (containerWasHidden) container.classList.add('hidden');
        if (sandbox.parentNode) sandbox.parentNode.removeChild(sandbox);
    }
};

window.downloadCostSheetPDF = async function (idOrProj, btnElement) {
    const origHtml = btnElement ? btnElement.innerHTML : '';
    if (btnElement) {
        btnElement.disabled = true;
        btnElement.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Generating Material Invoice...';
    }

    try {
        let proj = null;
        if (typeof idOrProj === 'object' && idOrProj !== null) {
            proj = idOrProj;
        } else if (window.db && window.db.projects) {
            const numId = parseInt(idOrProj);
            if (!isNaN(numId)) proj = await db.projects.get(numId);
        }
        if (!proj && window.currentCustomerPortalProject) {
            proj = window.currentCustomerPortalProject;
        }
        if (!proj) return alert('Project not found');

        if (proj.isFullQuotation) {
            return alert('This is a Full Quotation project without a separate material invoice.');
        }

        await _populateCostSheetDOM(proj);

        const element = document.getElementById('cost-sheet-a4-content');
        const container = document.getElementById('cost-sheet-a4-container');
        if (!element || !container) {
            throw new Error('Material Invoice template element not found.');
        }

        container.classList.remove('hidden');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '-9999px';
        container.style.zIndex = '-9999';
        container.style.display = 'block';

        const cleanName = (proj.customerName || proj.name || 'Materials').replace(/[^a-zA-Z0-9_-]/g, '_');
        const opt = {
            margin: 0.2,
            filename: `Material_Invoice_${cleanName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, backgroundColor: '#ffffff', letterRendering: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(element).save();
    } catch (e) {
        console.error("Material Invoice PDF Error:", e);
        alert('Error generating Material Invoice: ' + e.message);
    } finally {
        const container = document.getElementById('cost-sheet-a4-container');
        if (container) {
            container.style.display = 'none';
            container.classList.add('hidden');
        }
        if (btnElement) {
            btnElement.disabled = false;
            btnElement.innerHTML = origHtml;
        }
    }
};

window.downloadFinalInvoicePDF = async function (idOrProj, btnElement) {
    const origHtml = btnElement ? btnElement.innerHTML : '';
    if (btnElement) {
        btnElement.disabled = true;
        btnElement.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Generating PDF...';
    }

    try {
        let proj = null;
        if (typeof idOrProj === 'object' && idOrProj !== null) {
            proj = idOrProj;
        } else if (window.db && window.db.projects) {
            const numId = parseInt(idOrProj);
            if (!isNaN(numId)) {
                proj = await db.projects.get(numId);
            }
        }
        if (!proj && window.currentCustomerPortalProject) {
            proj = window.currentCustomerPortalProject;
        }
        if (!proj) return alert('Project not found');

        // 1. Populate all three templates in the DOM first
        await _populateFinalInvoiceDOM(proj);
        await _populateQuotationDOM(proj);
        await _populateCostSheetDOM(proj);

        const JSPDF_CLASS = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
        if (!JSPDF_CLASS) {
            throw new Error('PDF generator library not loaded. Please refresh and try again.');
        }

        const pdf = new JSPDF_CLASS({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const pageWidth = 210;
        const pageHeight = 297;

        // Page 1: Settlement Invoice
        const canvas1 = await captureA4Element('final-invoice-a4-content');
        if (canvas1) {
            const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);
            pdf.addImage(imgData1, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
        }

        // Page 2: Quotation / Service Breakdown
        const canvas2 = await captureA4Element('quotation-a4-content');
        if (canvas2) {
            pdf.addPage('a4', 'portrait');
            const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);
            pdf.addImage(imgData2, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
        }

        // Page 3: Material Components Invoice (if not invoice mode)
        if (!proj.isInvoiceMode) {
            const canvas3 = await captureA4Element('cost-sheet-a4-content');
            if (canvas3) {
                pdf.addPage('a4', 'portrait');
                const imgData3 = canvas3.toDataURL('image/jpeg', 0.98);
                pdf.addImage(imgData3, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
            }
        }

        const cleanCustName = (proj.customerName || 'Customer').replace(/[^a-zA-Z0-9_-]/g, '_');
        pdf.save(`Settlement_Package_${cleanCustName}.pdf`);

    } catch (e) {
        console.error("Package Generation Error:", e);
        alert('Error generating settlement package: ' + e.message);
    } finally {
        if (btnElement) {
            btnElement.disabled = false;
            btnElement.innerHTML = origHtml;
        }
    }
};

window.printFinalSettlement80mm = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');

        const serviceCharge = parseFloat(proj.budget) || 0;
        let totalMatCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
        
        if (proj.isFullQuotation) {
            totalMatCost = 0;
        }

        const discount = parseFloat(proj.discount) || 0;
        const grandTotal = (serviceCharge + totalMatCost);
        const totalAdv = (proj.clientPayments || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        const balance = (grandTotal - discount) - totalAdv;

        document.getElementById('pf-invoice-no').textContent = `${proj.projectID} -SET 01`;
        document.getElementById('pf-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
        document.getElementById('pf-customer').textContent = proj.customerName;
        document.getElementById('pf-project-id').textContent = proj.projectID || '-';
        
        document.getElementById('pf-quo-no').textContent = proj.projectID || 'QUO - N/A';
        document.getElementById('pf-mat-no').textContent = `${proj.projectID} -MAT 01`;

        document.getElementById('pf-service-charge').textContent = serviceCharge.toLocaleString('en-LK', { minimumFractionDigits: 2 });
        document.getElementById('pf-components').textContent = totalMatCost.toLocaleString('en-LK', { minimumFractionDigits: 2 });
        document.getElementById('pf-discount').textContent = discount.toLocaleString('en-LK', { minimumFractionDigits: 2 });
        document.getElementById('pf-total').textContent = grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 });
        document.getElementById('pf-advance').textContent = totalAdv.toLocaleString('en-LK', { minimumFractionDigits: 2 });
        document.getElementById('pf-balance').textContent = balance.toLocaleString('en-LK', { minimumFractionDigits: 2 });

        document.body.classList.add('printing-final-invoice');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('printing-final-invoice');
        }, 500);
    } catch (e) {
        console.error("Print Error:", e);
        alert('Error preparing print: ' + e.message);
    }
};

window.printQuotation80mm = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');
        
        document.getElementById('pq-project-id').textContent = proj.projectID || '-';
        document.getElementById('pq-project-name').textContent = proj.name || '-';
        document.getElementById('pq-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
        document.getElementById('pq-customer').textContent = proj.customerName;
        document.getElementById('pq-total').textContent = formatItemAmount(proj.budget, 2);

        const condEl = document.getElementById('pq-conditions');
        const condContainer = document.getElementById('pq-conditions-container');
        if (proj.conditions && proj.conditions.trim() !== '') {
            condEl.textContent = proj.conditions;
            condContainer.classList.remove('hidden');
        } else {
            condContainer.classList.add('hidden');
        }

        const itemsContainer = document.getElementById('pq-items');
        if (proj.isFullQuotation) {
            if (proj.components && proj.components.length > 0) {
                itemsContainer.innerHTML = proj.components.map(c => `
                    <div class="row" style="margin-bottom: 2px;">
                        <span style="display:inline-block; max-width:60%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${c.name} (x${c.qty})</span>
                        <span style="font-weight:normal; font-style:italic; font-size:10px; color:#666;">Included</span>
                    </div>
                `).join('');
            } else {
                itemsContainer.innerHTML = '<div class="row">No materials listed.</div>';
            }
        } else {
            if (proj.items && proj.items.length > 0) {
                itemsContainer.innerHTML = proj.items.map(item => `
                    <div class="row" style="margin-bottom: 2px;">
                        <span style="display:inline-block; max-width:60%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.desc}</span>
                        <span style="font-weight:bold;">${formatItemAmount(item.amount, 2)}</span>
                    </div>
                `).join('');
            } else {
                itemsContainer.innerHTML = '<div class="row">No service items listed.</div>';
            }
        }

        document.body.classList.add('printing-quotation');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('printing-quotation');
        }, 500);
    } catch (e) {
        console.error("Print Error:", e);
        alert('Error preparing print: ' + e.message);
    }
};

window.printCostSheet80mm = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');

        document.getElementById('pc-invoice-no').textContent = `${proj.projectID} -MAT 01`;
        document.getElementById('pc-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
        document.getElementById('pc-customer').textContent = proj.customerName;
        document.getElementById('pc-project-id').textContent = proj.projectID || '-';

        const totalMatCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
        document.getElementById('pc-total').textContent = totalMatCost.toLocaleString('en-LK', { minimumFractionDigits: 2 });

        const itemsContainer = document.getElementById('pc-items');
        if (proj.components && proj.components.length > 0) {
            itemsContainer.innerHTML = proj.components.map(c => `
                <div class="row" style="margin-bottom: 2px;">
                    <span style="display:inline-block; max-width:60%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${c.name}</span>
                    <span style="font-weight:bold;">${parseFloat(c.total).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
                </div>
            `).join('');
        } else {
            itemsContainer.innerHTML = '<div class="row">No materials listed.</div>';
        }

        document.body.classList.add('printing-cost-sheet');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('printing-cost-sheet');
        }, 500);
    } catch (e) {
        console.error("Print Error:", e);
        alert('Error preparing print: ' + e.message);
    }
};

window.downloadAgreementPDF = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj) return alert('Project not found');

        // Populate Template
        const teamNames = (proj.teamPayments || []).map(p => p.name).filter(n => n);
        const designerNames = teamNames.length > 0 ? `Madushan Kahagalla & ${teamNames.join(', ')} ` : 'Madushan Kahagalla';

        document.getElementById('ag-designer').textContent = designerNames;
        document.getElementById('ag-client').textContent = proj.customerName;
        document.getElementById('ag-title').textContent = proj.name;
        document.getElementById('ag-start-date').textContent = proj.registrationDate;

        document.getElementById('ag-description').textContent = proj.description || 'Project details as discussed.';

        document.getElementById('ag-timeline-start').textContent = proj.startDate;
        document.getElementById('ag-timeline-end').textContent = proj.endDate;

        // Payment Terms calculation
        const parseAmountRange = (valStr) => {
            if (!valStr) return { min: 0, max: 0 };
            const str = String(valStr).trim();
            if (!str) return { min: 0, max: 0 };
            if (str.includes('-')) {
                const parts = str.split('-');
                const min = parseFloat(parts[0].replace(/[^0-9.]/g, '')) || 0;
                const max = parseFloat(parts[1].replace(/[^0-9.]/g, '')) || 0;
                return { min: Math.min(min, max), max: Math.max(min, max) };
            }
            const num = parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
            return { min: num, max: num };
        };

        const quoNo = proj.projectID || 'N/A';
        const budgetRaw = String(proj.budget || '').trim();
        
        let quoRange = parseAmountRange(budgetRaw);
        if (proj.isRange && proj.budgetMax > 0) {
            const minB = parseFloat(proj.budget) || 0;
            const maxB = parseFloat(proj.budgetMax) || 0;
            quoRange = { min: Math.min(minB, maxB), max: Math.max(minB, maxB) };
        }

        const estCompCostRaw = (proj.estimatedCompCost || '').trim();
        const compContainer = document.getElementById('ag-components-cost-container');
        const compCostEl = document.getElementById('ag-components-cost');
        
        let compRange = { min: 0, max: 0 };

        if (estCompCostRaw) {
            compRange = parseAmountRange(estCompCostRaw);
            if (compContainer) compContainer.classList.remove('hidden');
            if (compCostEl) compCostEl.textContent = `LKR ${formatItemAmount(estCompCostRaw, 2)}`;
        } else {
            if (compContainer) compContainer.classList.add('hidden');
        }

        // Total Estimated Cost = Quotation Value Range + Component Cost Range
        const totalMin = quoRange.min + compRange.min;
        const totalMax = quoRange.max + compRange.max;

        let totalCostStr = '';
        if (totalMax > totalMin) {
            totalCostStr = `LKR ${totalMin.toLocaleString('en-LK', { minimumFractionDigits: 2 })} - ${totalMax.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
        } else {
            totalCostStr = `LKR ${totalMin.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`;
        }

        const quoNoEl = document.getElementById('ag-quo-no');
        if (quoNoEl) quoNoEl.textContent = quoNo;

        const quoAmountEl = document.getElementById('ag-quo-amount');
        if (quoAmountEl) quoAmountEl.textContent = `LKR ${formatItemAmount(proj.budget, 2)}`;

        const costEl = document.getElementById('ag-cost');
        if (costEl) costEl.textContent = totalCostStr;

        // Payment Schedule (4 parts) removed as requested

        document.getElementById('ag-director-date').textContent = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');

        // Use stored logo
        const logoSetting = await db.settings.get('company_logo');
        if (logoSetting && logoSetting.value) {
            const agLogo = document.querySelector('#agreement-a4-content .app-logo');
            if (agLogo) agLogo.src = logoSetting.value;
        }

        const element = document.getElementById('agreement-a4-content');
        const container = document.getElementById('agreement-a4-container');

        // Show temporarily
        container.classList.remove('hidden');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '-9999px';
        container.style.zIndex = '-9999';
        container.style.display = 'block';

        const opt = {
            margin: 0,
            filename: `Design_Agreement_${proj.customerName}_${proj.name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 3,
                useCORS: true,
                letterRendering: true,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        await html2pdf().set(opt).from(element).save();

    } catch (e) {
        console.error("PDF Error:", e);
        alert('Error: ' + e.message);
    } finally {
        const container = document.getElementById('agreement-a4-container');
        if (container) {
            container.style.display = 'none';
            container.classList.add('hidden');
            container.style.position = '';
            container.style.top = '';
            container.style.left = '';
            container.style.zIndex = '';
        }
    }
};

window.viewAgreementAttachment = async function (id) {
    try {
        const proj = await db.projects.get(id);
        if (!proj || !proj.agreementAttachment) return alert('No attachment found');

        // New window check
        const win = window.open();
        if (!win) return alert('Please allow popups to view the agreement.');

        win.document.write(`
            <title>Agreement - ${proj.name}</title>
            <body style="margin:0; background:#333; display:flex; align-items:center; justify-content:center;">
                <embed src="${proj.agreementAttachment}" type="application/pdf" width="100%" height="100%" style="border:none;" />
            </body>
    `);
    } catch (e) {
        console.error(e);
        alert('Could not open attachment');
    }
};

window.viewCurrentAgreement = function () {
    const id = document.getElementById('project-id').value;
    if (id) {
        viewAgreementAttachment(parseInt(id));
    }
};

window.deleteProject = async function (id) {
    if (confirm('Are you sure you want to delete this project? This will ALSO PERMANENTLY DELETE all associated payment records!')) {
        try {
            const numId = parseInt(id, 10);
            const lookupId = !isNaN(numId) ? numId : id;
            let proj = await db.projects.get(lookupId);
            if (!proj && typeof lookupId === 'number') proj = await db.projects.get(String(lookupId));
            if (!proj && typeof id === 'string') proj = await db.projects.get(id);

            if (proj && proj.projectID) {
                // Delete all linked sales records from the database
                const linkedSales = await db.sales.where('projectId').equals(proj.projectID).toArray();
                for (const s of linkedSales) {
                    await db.sales.delete(s.id);
                }
            }
            await db.projects.delete(lookupId);
            if (typeof id === 'string' && !isNaN(numId)) {
                try { await db.projects.delete(id); } catch (e) { }
            }
            loadProjects();
        } catch (e) {
            console.error("Error deleting project and its payments:", e);
            alert('Failed to delete project or associated payments.');
        }
    }
};

// --- 11. WhatsApp Sharing Logic ---
window.shareToWhatsApp = function (phone, message, waWindow = null) {
    if (!phone) {
        alert("Customer phone number is missing! Please update the customer's phone number.");
        if (waWindow) waWindow.close();
        return;
    }
    // Clean phone number (remove non-digits)
    let cleanPhone = String(phone).replace(/\D/g, '');

    // Auto-fix local 0 leading numbers to international format (Assuming LK +94)
    if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
        cleanPhone = '94' + cleanPhone.substring(1);
    } else if (cleanPhone.length === 9) {
        cleanPhone = '94' + cleanPhone;
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    if (waWindow) {
        waWindow.location.href = url;
    } else {
        window.open(url, '_blank');
    }
};

window.getLiveSettlementUrl = function (proj) {
    let origin = window.location.origin;
    if (!origin || origin === 'null' || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        origin = 'https://kutuss-665c6.web.app';
    }
    const identifier = proj.projectID || proj.id;
    return `${origin}/?settlement=${encodeURIComponent(identifier)}`;
};

window.copySettlementLink = async function (id) {
    try {
        const proj = await db.projects.get(parseInt(id));
        if (!proj) return alert('Project not found!');
        const link = window.getLiveSettlementUrl(proj);
        await navigator.clipboard.writeText(link);
        alert(`✅ Live Customer Settlement link copied to clipboard!\n\n${link}`);
    } catch (err) {
        console.error(err);
    }
};

window.shareSettlementLink = async function (id) {
    const waWindow = window.open('', '_blank');
    try {
        const proj = await db.projects.get(parseInt(id));
        if (!proj) {
            waWindow.close();
            return alert('Project not found!');
        }

        const serviceRevenue = parseFloat(proj.budget) || 0;
        let componentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
        if (proj.isFullQuotation) componentCost = 0;
        const discount = parseFloat(proj.discount) || 0;
        const revenue = (serviceRevenue + componentCost) - discount;
        const received = (proj.clientPayments || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        const balance = Math.max(0, revenue - received);
        const quoNo = proj.projectID || 'QUO-' + proj.id;
        const liveUrl = window.getLiveSettlementUrl(proj);

        const message = `*STATEMENT OF SETTLEMENT* 📄\n` +
            `*Kutuss Design Lab (Pvt) Ltd*\n\n` +
            `Hi *${proj.customerName}*,\n` +
            `Here is your official live settlement statement for: *${proj.name}*.\n\n` +
            `💰 *Project Total:* LKR ${revenue.toLocaleString('en-LK', { minimumFractionDigits: 2 })}\n` +
            `✅ *Total Paid:* LKR ${received.toLocaleString('en-LK', { minimumFractionDigits: 2 })}\n` +
            `🔴 *Outstanding Balance:* *LKR ${balance.toLocaleString('en-LK', { minimumFractionDigits: 2 })}*\n\n` +
            `👉 *View Your Live Bill & Receipts Online:*\n` +
            `${liveUrl}\n\n` +
            `💳 *Bank Transfer Details:*\n` +
            `Bank: Commercial Bank (Warakapola Branch)\n` +
            `Account Name: KUTUSS DESIGN LAB (PVT) LTD\n` +
            `Account Number: 1000872833\n` +
            `Reference / Remarks: ${quoNo}\n\n` +
            `Thank you for your business! 🖌️\n` +
            `*Kutuss Design Lab (Pvt) Ltd* • 077-88 99 312`;

        shareToWhatsApp(proj.customerPhone, message, waWindow);
    } catch (err) {
        console.error(err);
        waWindow.close();
    }
};

window.sendPaymentReminder = async function (id) {
    const waWindow = window.open('', '_blank');
    try {
        const proj = await db.projects.get(id);
        if (!proj) {
            waWindow.close();
            return;
        }

        const serviceRevenue = parseFloat(proj.budget) || 0;
        let componentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
        if (proj.isFullQuotation) componentCost = 0;
        const discount = parseFloat(proj.discount) || 0;
        const revenue = (serviceRevenue + componentCost) - discount;
        const received = (proj.clientPayments || []).reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        const balance = revenue - received;
        const quoNo = proj.projectID || 'N/A';
        const liveUrl = window.getLiveSettlementUrl(proj);

        const message = `*PAYMENT REMINDER* 🔔\n\n` +
            `Hi *${proj.customerName}*,\n` +
            `This is a friendly reminder regarding the outstanding balance for project: *${proj.name}*.\n\n` +
            `💰 *Project Total:* LKR ${revenue.toLocaleString()}\n` +
            `✅ *Amount Paid:* LKR ${received.toLocaleString()}\n` +
            `🔴 *Current Balance:* *LKR ${balance.toLocaleString()}*\n\n` +
            `👉 *View Live Bill & Payment Receipts:*\n` +
            `${liveUrl}\n\n` +
            `💳 *Payment Notice* 💳\n` +
            `පේමන්ට් කරන විට ඩිස්ක්‍රිප්ෂන් එකට 🧾 quotation නම්බර් (*${quoNo}*) ඇතුලත් කරන්න.\n` +
            `When making the payment, please include the 🧾 invoice number (*${quoNo}*) in the description.\n\n` +
            `✅ Thank you!\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n\n` +
            `_(Note: This is an auto-generated message)_`;

        shareToWhatsApp(proj.customerPhone, message, waWindow);
    } catch (e) {
        console.error(e);
        waWindow.close();
    }
};

window.sendAdvancePaymentRequestWA = async function (id) {
    try {
        const proj = await db.projects.get(parseInt(id));
        if (!proj) return alert('Project not found!');

        if (!proj.customerPhone) {
            return alert("Customer phone number is missing! Please update the customer's phone number.");
        }

        const totalCost = parseFloat(proj.budget) || 0;
        const defaultAdvance = (totalCost > 0) ? (totalCost * 0.5).toFixed(2) : '';

        const inputAmount = prompt(
            `Enter Requested Advance Amount (LKR) for ${proj.customerName}:\n\nProject Budget: LKR ${formatItemAmount(proj.budget, 2)}`, 
            defaultAdvance
        );

        if (inputAmount === null) return; // User cancelled prompt

        const advanceVal = String(inputAmount).trim();
        if (!advanceVal) {
            return alert('Please enter a valid advance amount!');
        }

        const waWindow = window.open('', '_blank');

        const quoNo = proj.projectID || 'N/A';
        const formattedAdvance = formatItemAmount(advanceVal, 2);
        const liveUrl = window.getLiveSettlementUrl(proj);

        const message = `*ADVANCE PAYMENT REQUEST* 💳\n\n` +
            `Hi *${proj.customerName}*,\n` +
            `This is a request regarding the advance payment for your project: *${proj.name}* (${quoNo}).\n\n` +
            `💰 *Project Total:* LKR ${formatItemAmount(proj.budget, 0)}\n` +
            `📌 *Requested Advance Amount:* *LKR ${formattedAdvance}*\n\n` +
            `👉 *View Live Statement Online:*\n` +
            `${liveUrl}\n\n` +
            `💳 *Bank Account Details for Transfer:* 💳\n` +
            `🏛️ *Bank:* COMMERCIAL BANK\n` +
            `👤 *Account Name:* KUTUSS DESIGN LAB (PVT) LTD\n` +
            `📄 *Account Type:* CURRENT ACCOUNT\n` +
            `🔢 *Account Number:* 1000872833\n` +
            `📍 *Branch:* WARAKAPOLA\n\n` +
            `📝 *Payment Notice:*\n` +
            `පේමන්ට් කරන විට ඩිස්ක්‍රිප්ෂන් එකට 🧾 quotation නම්බර් (*${quoNo}*) ඇතුලත් කරන්න.\n` +
            `When transferring, please include the 🧾 quotation number (*${quoNo}*) in the transfer reference.\n\n` +
            `🌐 Website: *kutusslab.lk*\n\n` +
            `Thank you!\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd*  🖌️\n\n` +
            `_(Note: This is an auto-generated notification)_`;

        shareToWhatsApp(proj.customerPhone, message, waWindow);
    } catch (e) {
        console.error("Error sending advance payment request:", e);
    }
};

window.copyFolderPath = function (path) {
    if (!path) return;
    navigator.clipboard.writeText(path).then(() => {
        alert('Folder path copied to clipboard! You can paste it in Explorer.\n\nPath: ' + path);
        // Try to trigger a local open (might work in some local contexts)
        // window.location.href = `file:///${path.replace(/\\/g, '/')}`;
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

window.sendQuotationWA = async function (id) {
    const waWindow = window.open('', '_blank');
    try {
        const proj = await db.projects.get(id);
        if (!proj) {
            waWindow.close();
            return;
        }

        const titleText = proj.isInvoiceMode ? 'INVOICE' : 'QUOTATION';
        const quoNo = proj.projectID || 'QUO-' + proj.id;
        const liveUrl = window.getLiveSettlementUrl(proj);

        const serviceRevenue = parseFloat(proj.budget) || 0;
        let componentCost = (proj.components || []).reduce((sum, c) => sum + (parseFloat(c.total) || 0), 0);
        if (proj.isFullQuotation) componentCost = 0;
        const discount = parseFloat(proj.discount) || 0;
        const totalAmount = (serviceRevenue + componentCost) - discount;

        const message = `*${titleText}* 📜\n` +
            `*Kutuss Design Lab (Pvt) Ltd*\n\n` +
            `Hi *${proj.customerName}*,\n` +
            `We are pleased to send you the ${titleText.toLowerCase()} for: *${proj.name}* (${quoNo}).\n\n` +
            `💰 *Project Budget:* LKR ${formatItemAmount(totalAmount > 0 ? totalAmount : proj.budget, 2)}\n\n` +
            `👉 *View Your Live Quotation & Statement Online:*\n` +
            `${liveUrl}\n\n` +
            `💳 Easy payment plans are available via credit cards & bank transfer.\n` +
            `🌐 To review our previous work, please visit our website at kutusslab.lk or our Facebook page.\n` +
            `⭐ We have a 5-year track record of excellence without a single negative review.\n` +
            `🏢 We are a government-registered private limited company (PV 00317028).\n\n` +
            `Please let us know if you have any questions or would like to proceed.\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n` +
            `Hotline: 077-88 99 312\n\n` +
            `_(Note: This is an auto-generated message)_`;

        shareToWhatsApp(proj.customerPhone, message, waWindow);
    } catch (e) {
        console.error(e);
        waWindow.close();
    }
};

window.sendAgreementWA = async function (id) {
    const waWindow = window.open('', '_blank');
    try {
        const proj = await db.projects.get(id);
        if (!proj) {
            waWindow.close();
            return;
        }

        const quoNo = proj.projectID || 'QUO-' + proj.id;
        const liveUrl = window.getLiveSettlementUrl(proj);

        const message = `*PROJECT AGREEMENT* ✍️\n\n` +
            `Hi *${proj.customerName}*,\n` +
            `The project agreement for *${proj.name}* (${quoNo}) is ready for your review.\n\n` +
            `📅 *Start Date:* ${proj.startDate}\n` +
            `🏁 *Deadline:* ${proj.endDate}\n\n` +
            `👉 *View Project Details & Statement Online:*\n` +
            `${liveUrl}\n\n` +
            `We look forward to working with you!\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n\n` +
            `_(Note: This is an auto-generated message)_`;

        shareToWhatsApp(proj.customerPhone, message, waWindow);
    } catch (e) {
        console.error(e);
        waWindow.close();
    }
};

window.sendProjectCompletionWA = async function (id, waWindow = null) {
    const isNewTab = !waWindow;
    if (isNewTab) waWindow = window.open('', '_blank');
    try {
        let proj = typeof id === 'object' ? id : await db.projects.get(parseInt(id));
        if (!proj) {
            if (waWindow) waWindow.close();
            return;
        }

        const quoNo = proj.projectID || 'N/A';
        const liveUrl = window.getLiveSettlementUrl(proj);

        const message = `*PROJECT COMPLETED* 🎉🎉\n\n` +
            `Hi *${proj.customerName}*,\n` +
            `Great news! We have successfully completed your project: *${proj.name}* (${quoNo}).\n\n` +
            `✅ All specifications and deliverables have been finalized.\n\n` +
            `👉 *View Your Final Statement & Payment Receipts Online:*\n` +
            `${liveUrl}\n\n` +
            `🌐 Visit our website at *kutusslab.lk* for more details & services.\n` +
            `⭐ Thank you for choosing Kutuss Design Lab!\n\n` +
            `Please let us know if you have any questions or further requests.\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n\n` +
            `_(Note: This is an auto-generated notification)_`;

        shareToWhatsApp(proj.customerPhone, message, waWindow);
    } catch (e) {
        console.error(e);
        if (waWindow) waWindow.close();
    }
};

window.sendSalaryWA = async function (id) {
    const waWindow = window.open('', '_blank');
    try {
        const exp = await db.expenses.get(id);
        if (!exp || !exp.personPhone) {
            alert("Person's phone number is missing!");
            waWindow.close();
            return;
        }

        const type = exp.category === 'Salary Advance' ? 'SALARY ADVANCE' : 'SALARY PAYMENT';
        const emoji = exp.category === 'Salary Advance' ? '💸' : '💰';

        const message = `*${type}* ${emoji}\n\n` +
            `Hi *${exp.personName}*,\n` +
            `This is to inform you that a ${exp.category.toLowerCase()} of *LKR ${parseFloat(exp.amount).toLocaleString()}* has been processed.\n\n` +
            `📅 *Date:* ${exp.date}\n` +
            `📌 *Notes:* ${exp.description || 'N/A'}\n` +
            `💳 *Method:* ${exp.paymentMethod}\n\n` +
            `Thank you!\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n\n` +
            `_(Note: This is an auto-generated notification)_`;

        shareToWhatsApp(exp.personPhone, message, waWindow);
    } catch (e) {
        console.error(e);
        waWindow.close();
    }
};

window.sendProjectPaymentWA = function(projectID, amount, date, customerName, customerPhone, projectName, receiptNo = 'N/A') {
    if (!customerPhone) {
        alert("Customer phone number is missing! Please update the customer's phone number.");
        return;
    }
    const message = `*PAYMENT RECEIVED* ✅\n\n` +
        `Hi *${customerName}*,\n` +
        `We have successfully received your payment of *LKR ${parseFloat(amount).toLocaleString()}* for the project: *${projectName}* (${projectID}).\n\n` +
        `📅 *Date:* ${date}\n` +
        `🧾 *Receipt No:* ${receiptNo}\n\n` +
        `Thank you for your payment!\n\n` +
        `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n\n` +
        `_(Note: This is an auto-generated message)_`;
        
    shareToWhatsApp(customerPhone, message);
};

window.sendProjectPaymentWARow = function(btn) {
    const row = btn.closest('.client-payment-row');
    const amount = row.querySelector('.payment-amount').value;
    const date = row.querySelector('.payment-date').value;
    const receiptNo = row.querySelector('.payment-receipt-no').value;
    
    const projectID = document.getElementById('project-custom-id').value;
    const customerName = document.getElementById('project-customer').value;
    const customerPhone = document.getElementById('project-customer-phone').value;
    const projectName = document.getElementById('project-name').value;
    
    sendProjectPaymentWA(projectID, amount, date, customerName, customerPhone, projectName, receiptNo);
};

// --- 12. Database Backup & Restore ---
window.exportDatabase = async function () {
    try {
        const backupData = {
            sales: await db.sales.toArray(),
            expenses: await db.expenses.toArray(),
            projects: await db.projects.toArray(),
            inquiries: await db.inquiries.toArray(),
            suppliers: await db.suppliers.toArray(),
            salaryPaysheets: db.salaryPaysheets ? await db.salaryPaysheets.toArray() : [],
            teamMembers: db.teamMembers ? await db.teamMembers.toArray() : [],
            memberProjectPayments: db.memberProjectPayments ? await db.memberProjectPayments.toArray() : [],
            payableBills: db.payableBills ? await db.payableBills.toArray() : [],
            printOrders: db.printOrders ? await db.printOrders.toArray() : [],
            settings: await db.settings.toArray(),
            backupDate: new Date().toISOString(),
            version: 15
        };

        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Kutuss_POS_Backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error("Backup failed:", e);
        alert("Backup failed. See console for details.");
    }
};

window.importDatabase = async function (input) {
    if (!input.files || !input.files[0]) return;

    if (!confirm("Are you sure you want to restore data? This will PERMANENTLY REPLACE all current data in the system!")) {
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // Basic validation
            if (!data.sales || !data.expenses || !data.projects || !data.settings) {
                throw new Error("Invalid backup file format. Missing core tables.");
            }

            // Clear current tables
            await db.sales.clear();
            await db.expenses.clear();
            await db.projects.clear();
            await db.settings.clear();
            await db.inquiries.clear();
            await db.suppliers.clear();
            if (db.salaryPaysheets) await db.salaryPaysheets.clear();
            if (db.teamMembers) await db.teamMembers.clear();
            if (db.memberProjectPayments) await db.memberProjectPayments.clear();
            if (db.payableBills) await db.payableBills.clear();
            if (db.printOrders) await db.printOrders.clear();

            // Insert data
            if (data.sales && data.sales.length > 0) await db.sales.bulkAdd(data.sales);
            if (data.expenses && data.expenses.length > 0) await db.expenses.bulkAdd(data.expenses);
            if (data.projects && data.projects.length > 0) await db.projects.bulkAdd(data.projects);
            if (data.inquiries && data.inquiries.length > 0) await db.inquiries.bulkAdd(data.inquiries);
            if (data.suppliers && data.suppliers.length > 0) await db.suppliers.bulkAdd(data.suppliers);
            if (data.salaryPaysheets && data.salaryPaysheets.length > 0 && db.salaryPaysheets) await db.salaryPaysheets.bulkAdd(data.salaryPaysheets);
            if (data.teamMembers && data.teamMembers.length > 0 && db.teamMembers) await db.teamMembers.bulkAdd(data.teamMembers);
            if (data.memberProjectPayments && data.memberProjectPayments.length > 0 && db.memberProjectPayments) await db.memberProjectPayments.bulkAdd(data.memberProjectPayments);
            if (data.payableBills && data.payableBills.length > 0 && db.payableBills) await db.payableBills.bulkAdd(data.payableBills);
            if (data.printOrders && data.printOrders.length > 0 && db.printOrders) await db.printOrders.bulkAdd(data.printOrders);
            if (data.settings && data.settings.length > 0) await db.settings.bulkAdd(data.settings);

            alert("Data restored successfully! The application will now reload.");
            location.reload();
        } catch (err) {
            console.error("Restore failed:", err);
            alert("Restore failed: " + err.message);
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(input.files[0]);
};

window.saveOpeningBalances = async function () {
    const cash = parseFloat(document.getElementById('opening-cash-box').value) || 0;
    const bank = parseFloat(document.getElementById('opening-bank').value) || 0;
    
    await db.settings.put({ key: 'opening_cash_box', value: cash });
    await db.settings.put({ key: 'opening_bank', value: bank });
    
    alert('Opening balances saved successfully!');
    loadDashboard();
};

window.loadOpeningBalances = async function () {
    try {
        const cashSetting = await db.settings.get('opening_cash_box');
        const bankSetting = await db.settings.get('opening_bank');
        
        if (cashSetting) document.getElementById('opening-cash-box').value = cashSetting.value;
        if (bankSetting) document.getElementById('opening-bank').value = bankSetting.value;
    } catch (e) {
        console.error("Error loading opening balances:", e);
    }
};

// --- 13. Inquiries Logic ---
async function loadInquiries() {
    const tableBody = document.getElementById('inquiry-table-body');
    const searchInq = document.getElementById('search-inquiries');
    const searchTerm = searchInq ? searchInq.value.toLowerCase().trim() : '';

    try {
        let inquiries = await db.inquiries.orderBy('timestamp').reverse().toArray();

        if (searchTerm) {
            inquiries = inquiries.filter(inq => 
                (inq.phone && inq.phone.toLowerCase().includes(searchTerm)) || 
                (inq.customerName && inq.customerName.toLowerCase().includes(searchTerm)) ||
                (inq.projectName && inq.projectName.toLowerCase().includes(searchTerm))
            );
        }

        if (inquiries.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">${searchTerm ? 'No results found for your search.' : 'No inquiries recorded.'}</td></tr>`;
            return;
        }

        tableBody.innerHTML = inquiries.map(inq => {
            let statusColor = 'bg-gray-100 text-gray-700';
            if (inq.status === 'Pending') statusColor = 'bg-yellow-100 text-yellow-700';
            if (inq.status === 'Follow Up') statusColor = 'bg-blue-100 text-blue-700';
            if (inq.status === 'Quotation Sent') statusColor = 'bg-purple-100 text-purple-700';
            if (inq.status === 'Converted to Project') statusColor = 'bg-emerald-100 text-emerald-700';
            if (inq.status === 'Not Interested') statusColor = 'bg-red-100 text-red-700';

            return `
            <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">${inq.date}</td>
                <td class="px-6 py-4 text-sm font-bold text-gray-800">${inq.customerName}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${inq.phone || '-'}</td>
                <td class="px-6 py-4 text-sm text-brand-600 font-medium">${inq.projectName}</td>
                <td class="px-6 py-4 text-xs text-gray-500 max-w-xs truncate" title="${inq.notes}">${inq.notes || '-'}</td>
                <td class="px-6 py-4 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusColor}">${inq.status}</span>
                </td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <button onclick="editInquiry(${inq.id})" class="p-1 text-gray-400 hover:text-brand-600 transition-colors" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    ${inq.phone ? `
                    <button onclick="window.open('https://wa.me/94${String(inq.phone).replace(/[^0-9]/g, '').slice(-9)}?text=Hello ${encodeURIComponent(inq.customerName)}, regarding your inquiry for ${encodeURIComponent(inq.projectName)}...')" class="p-1 text-emerald-500 hover:text-emerald-700 transition-colors" title="WhatsApp Customer">
                        <i class="fa-brands fa-whatsapp"></i>
                    </button>
                    ` : ''}
                    <button onclick="deleteInquiry(${inq.id})" class="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `}).join('');
    } catch (e) {
        console.error("Error loading inquiries:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            submitBtn.disabled = true;

            try {
                const id = document.getElementById('inquiry-id').value;
                const data = {
                    date: document.getElementById('inquiry-date').value,
                    customerName: document.getElementById('inquiry-customer').value,
                    phone: document.getElementById('inquiry-phone').value,
                    projectName: document.getElementById('inquiry-project').value,
                    status: document.getElementById('inquiry-status').value,
                    notes: document.getElementById('inquiry-notes').value,
                    timestamp: id ? ((await db.inquiries.get(parseInt(id)))?.timestamp || Date.now()) : Date.now()
                };

                if (id) {
                    data.id = parseInt(id);
                    await db.inquiries.put(data);
                    alert('Inquiry updated successfully!');
                } else {
                    await db.inquiries.add(data);
                    alert('Inquiry added successfully!');
                }

                resetInquiryForm();
                loadInquiries();
            } catch (err) {
                console.error("Error saving inquiry:", err);
                alert("Failed to save inquiry.");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

window.editInquiry = async function(id) {
    try {
        const inq = await db.inquiries.get(id);
        if (!inq) return;

        document.getElementById('inquiry-id').value = inq.id;
        document.getElementById('inquiry-date').value = inq.date;
        document.getElementById('inquiry-customer').value = inq.customerName;
        document.getElementById('inquiry-phone').value = inq.phone || '';
        document.getElementById('inquiry-project').value = inq.projectName;
        document.getElementById('inquiry-status').value = inq.status;
        document.getElementById('inquiry-notes').value = inq.notes || '';

        document.getElementById('inquiry-form-title').textContent = 'Edit Inquiry';
        document.getElementById('inquiry-submit-btn').innerHTML = '<i class="fa-solid fa-save"></i> Update Inquiry';
        document.getElementById('cancel-inquiry-btn').classList.remove('hidden');

        document.getElementById('inquiries-section').scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
        console.error("Error editing inquiry:", e);
    }
};

window.resetInquiryForm = function() {
    const form = document.getElementById('inquiry-form');
    if(form) form.reset();
    const idField = document.getElementById('inquiry-id');
    if(idField) idField.value = '';
    
    const title = document.getElementById('inquiry-form-title');
    if(title) title.textContent = 'Add New Inquiry';
    
    const submitBtn = document.getElementById('inquiry-submit-btn');
    if(submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Save Inquiry';
    
    const cancelBtn = document.getElementById('cancel-inquiry-btn');
    if(cancelBtn) cancelBtn.classList.add('hidden');
    
    const dField = document.getElementById('inquiry-date');
    if(dField) dField.valueAsDate = new Date();

    const searchField = document.getElementById('search-inquiries');
    if (searchField) searchField.value = '';
};

async function deleteInquiry(id) {
    if (confirm("Delete this inquiry?")) {
        await db.inquiries.delete(id);
        loadInquiries();
    }
}

// --- 14. Suppliers Logic ---
async function loadSuppliers() {
    const tableBody = document.getElementById('supplier-table-body');
    const searchSup = document.getElementById('search-suppliers');
    const searchTerm = searchSup ? searchSup.value.toLowerCase().trim() : '';

    try {
        let suppliers = await db.suppliers.orderBy('timestamp').reverse().toArray();

        if (searchTerm) {
            suppliers = suppliers.filter(sup => 
                (sup.name && sup.name.toLowerCase().includes(searchTerm)) || 
                (sup.shopName && sup.shopName.toLowerCase().includes(searchTerm)) ||
                (sup.phone && sup.phone.toLowerCase().includes(searchTerm)) ||
                (sup.equipmentName && sup.equipmentName.toLowerCase().includes(searchTerm)) ||
                (sup.address && sup.address.toLowerCase().includes(searchTerm)) ||
                (sup.description && sup.description.toLowerCase().includes(searchTerm))
            );
        }

        if (suppliers.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="8" class="px-6 py-8 text-center text-gray-400">${searchTerm ? 'No results found for your search.' : 'No suppliers recorded yet.'}</td></tr>`;
            return;
        }

        tableBody.innerHTML = suppliers.map(sup => {
            return `
            <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50">
                <td class="px-4 py-4">
                    ${sup.image ? `<img src="${sup.image}" alt="${sup.name}" class="w-10 h-10 rounded-lg object-cover border border-gray-200 shadow-sm cursor-pointer hover:scale-150 transition-transform" onclick="viewSupplierImage('${sup.id}')">` : `<div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"><i class="fa-solid fa-user text-sm"></i></div>`}
                </td>
                <td class="px-6 py-4 text-sm font-bold text-gray-800">${sup.name}</td>
                <td class="px-6 py-4 text-sm text-brand-600 font-medium">${sup.shopName || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${sup.phone || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">${sup.equipmentName || '-'}</span>
                </td>
                <td class="px-6 py-4 text-xs text-gray-500 max-w-xs truncate" title="${sup.address || ''}">${sup.address || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500 max-w-xs truncate" title="${sup.description || ''}">${sup.description || '-'}</td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                    <button onclick="editSupplier(${sup.id})" class="p-1 text-gray-400 hover:text-brand-600 transition-colors" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    ${sup.phone ? `
                    <button onclick="window.open('https://wa.me/94${String(sup.phone).replace(/[^0-9]/g, '').slice(-9)}?text=Hello ${encodeURIComponent(sup.name)}, regarding supply of ${encodeURIComponent(sup.equipmentName || 'items')}...')" class="p-1 text-emerald-500 hover:text-emerald-700 transition-colors" title="WhatsApp Supplier">
                        <i class="fa-brands fa-whatsapp"></i>
                    </button>
                    ` : ''}
                    <button onclick="callSupplier('${(sup.phone || '').replace(/'/g, "\\'")}')" class="p-1 text-blue-400 hover:text-blue-600 transition-colors" title="Call">
                        <i class="fa-solid fa-phone"></i>
                    </button>
                    <button onclick="deleteSupplier(${sup.id})" class="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `}).join('');
    } catch (e) {
        console.error("Error loading suppliers:", e);
    }
}

window.callSupplier = function(phone) {
    if (phone) {
        window.open('tel:' + phone);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const supplierForm = document.getElementById('supplier-form');
    if (supplierForm) {
        supplierForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            submitBtn.disabled = true;

            try {
                const id = document.getElementById('supplier-id').value;
                const data = {
                    name: document.getElementById('supplier-name').value,
                    shopName: document.getElementById('supplier-shop').value,
                    phone: document.getElementById('supplier-phone').value,
                    equipmentName: document.getElementById('supplier-equipment').value,
                    address: document.getElementById('supplier-address').value,
                    description: document.getElementById('supplier-description').value,
                    image: window._supplierImageBase64 || null,
                    timestamp: id ? ((await db.suppliers.get(parseInt(id)))?.timestamp || Date.now()) : Date.now()
                };

                if (id) {
                    data.id = parseInt(id);
                    await db.suppliers.put(data);
                    alert('Supplier updated successfully!');
                } else {
                    await db.suppliers.add(data);
                    alert('Supplier added successfully!');
                }

                resetSupplierForm();
                loadSuppliers();
            } catch (err) {
                console.error("Error saving supplier:", err);
                alert("Failed to save supplier.");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

window.editSupplier = async function(id) {
    try {
        const sup = await db.suppliers.get(id);
        if (!sup) return;

        document.getElementById('supplier-id').value = sup.id;
        document.getElementById('supplier-name').value = sup.name;
        document.getElementById('supplier-shop').value = sup.shopName || '';
        document.getElementById('supplier-phone').value = sup.phone || '';
        document.getElementById('supplier-equipment').value = sup.equipmentName || '';
        document.getElementById('supplier-address').value = sup.address || '';
        document.getElementById('supplier-description').value = sup.description || '';

        // Load image preview if exists
        if (sup.image) {
            window._supplierImageBase64 = sup.image;
            document.getElementById('supplier-image-preview').src = sup.image;
            document.getElementById('supplier-image-preview-container').classList.remove('hidden');
        } else {
            window._supplierImageBase64 = null;
            document.getElementById('supplier-image-preview-container').classList.add('hidden');
        }

        document.getElementById('supplier-form-title').textContent = 'Edit Supplier';
        document.getElementById('supplier-submit-btn').innerHTML = '<i class="fa-solid fa-save"></i> Update Supplier';
        document.getElementById('cancel-supplier-btn').classList.remove('hidden');

        document.getElementById('suppliers-section').scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
        console.error("Error editing supplier:", e);
    }
};

window.resetSupplierForm = function() {
    const form = document.getElementById('supplier-form');
    if(form) form.reset();
    const idField = document.getElementById('supplier-id');
    if(idField) idField.value = '';
    
    const title = document.getElementById('supplier-form-title');
    if(title) title.textContent = 'Add New Supplier';
    
    const submitBtn = document.getElementById('supplier-submit-btn');
    if(submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Save Supplier';
    
    const cancelBtn = document.getElementById('cancel-supplier-btn');
    if(cancelBtn) cancelBtn.classList.add('hidden');

    const searchField = document.getElementById('search-suppliers');
    if (searchField) searchField.value = '';

    // Clear image
    window._supplierImageBase64 = null;
    const imgPreview = document.getElementById('supplier-image-preview-container');
    if (imgPreview) imgPreview.classList.add('hidden');
    const imgInput = document.getElementById('supplier-image-input');
    if (imgInput) imgInput.value = '';
};

async function deleteSupplier(id) {
    if (confirm("Delete this supplier?")) {
        await db.suppliers.delete(id);
        loadSuppliers();
    }
}

// --- Supplier Image Handling ---
window._supplierImageBase64 = null;

window.handleSupplierImageUpload = function(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert('Image too large! Max 5MB allowed.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            window._supplierImageBase64 = e.target.result;
            document.getElementById('supplier-image-preview').src = e.target.result;
            document.getElementById('supplier-image-preview-container').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
};

window.removeSupplierImage = function() {
    window._supplierImageBase64 = null;
    document.getElementById('supplier-image-preview-container').classList.add('hidden');
    document.getElementById('supplier-image-input').value = '';
};

window.viewSupplierImage = async function(id) {
    try {
        const sup = await db.suppliers.get(parseInt(id));
        if (!sup || !sup.image) return;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] cursor-pointer';
        modal.onclick = () => modal.remove();
        modal.innerHTML = `
            <div class="relative max-w-lg max-h-[80vh] p-2">
                <img src="${sup.image}" alt="${sup.name}" class="max-w-full max-h-[75vh] rounded-2xl shadow-2xl border-4 border-white">
                <div class="text-center mt-3">
                    <p class="text-white font-bold text-lg">${sup.name}</p>
                    <p class="text-gray-300 text-sm">${sup.shopName || ''}</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } catch (e) {
        console.error('Error viewing supplier image:', e);
    }
};

// --- 15. Autocomplete Logic ---
window.updateSaleAutocomplete = async function() {
    const list = document.getElementById('sale-customer-list');
    if (!list) return;
    try {
        const sales = await db.sales.toArray();
        const names = [...new Set(sales.map(s => s.customerName).filter(Boolean))];
        list.innerHTML = names.map(n => `<option value="${n}">`).join('');
    } catch (e) {
        console.error("Error updating sale autocomplete:", e);
    }
};

window.updateExpenseAutocomplete = async function() {
    const listPerson = document.getElementById('expense-person-list');
    const listPhone = document.getElementById('expense-person-phone-list');
    if (!listPerson || !listPhone) return;
    try {
        const expenses = await db.expenses.toArray();
        const persons = [...new Set(expenses.map(e => e.personName).filter(Boolean))];
        const phones = [...new Set(expenses.map(e => e.personPhone).filter(Boolean))];
        listPerson.innerHTML = persons.map(n => `<option value="${n}">`).join('');
        listPhone.innerHTML = phones.map(n => `<option value="${n}">`).join('');
    } catch (e) {
        console.error("Error updating expense autocomplete:", e);
    }
};

window.updateProjectAutocomplete = async function() {
    const listName = document.getElementById('project-name-list');
    const listCustomer = document.getElementById('project-customer-list');
    const listPhone = document.getElementById('project-customer-phone-list');
    if (!listName || !listCustomer || !listPhone) return;
    try {
        const [projects, inquiries] = await Promise.all([
            db.projects.toArray(),
            db.inquiries.toArray()
        ]);
        
        const names = [...new Set([
            ...projects.map(p => p.name),
            ...inquiries.map(i => i.projectName)
        ].filter(Boolean))];
        
        const customers = [...new Set([
            ...projects.map(p => p.customerName),
            ...inquiries.map(i => i.customerName)
        ].filter(Boolean))];
        
        const phones = [...new Set([
            ...projects.map(p => p.customerPhone),
            ...inquiries.map(i => i.phone)
        ].filter(Boolean))];

        listName.innerHTML = names.map(n => `<option value="${n}">`).join('');
        listCustomer.innerHTML = customers.map(n => `<option value="${n}">`).join('');
        listPhone.innerHTML = phones.map(n => `<option value="${n}">`).join('');
    } catch (e) {
        console.error("Error updating project autocomplete:", e);
    }
};

window.updateInquiryAutocomplete = async function() {
    const listCustomer = document.getElementById('inquiry-customer-list');
    const listPhone = document.getElementById('inquiry-phone-list');
    if (!listCustomer || !listPhone) return;
    try {
        const inquiries = await db.inquiries.toArray();
        const customers = [...new Set(inquiries.map(i => i.customerName).filter(Boolean))];
        const phones = [...new Set(inquiries.map(i => i.phone).filter(Boolean))];
        listCustomer.innerHTML = customers.map(n => `<option value="${n}">`).join('');
        listPhone.innerHTML = phones.map(n => `<option value="${n}">`).join('');
    } catch (e) {
        console.error("Error updating inquiry autocomplete:", e);
    }
};

window.initAllAutocomplete = function() {
    updateSaleAutocomplete();
    updateExpenseAutocomplete();
    updateProjectAutocomplete();
    updateInquiryAutocomplete();
};

window.setupAutocompleteListeners = function() {
    const expensePersonInput = document.getElementById('expense-person');
    const projectCustomerInput = document.getElementById('project-customer');
    const inquiryCustomerInput = document.getElementById('inquiry-customer');

    if (expensePersonInput) {
        expensePersonInput.addEventListener('change', async (e) => {
            const name = e.target.value.trim().toLowerCase();
            if (!name) return;
            const expensePhoneInput = document.getElementById('expense-person-phone');
            if (expensePhoneInput && !expensePhoneInput.value) {
                try {
                    const expenses = await db.expenses.toArray();
                    const recordWithPhone = expenses.find(exp => exp.personName && exp.personName.toLowerCase() === name && exp.personPhone);
                    if (recordWithPhone) {
                        expensePhoneInput.value = recordWithPhone.personPhone;
                    }
                } catch (err) {
                    console.error("Error auto-filling expense phone:", err);
                }
            }
        });
    }

    if (projectCustomerInput) {
        projectCustomerInput.addEventListener('change', async (e) => {
            const name = e.target.value.trim().toLowerCase();
            if (!name) return;
            const projectPhoneInput = document.getElementById('project-customer-phone');
            if (projectPhoneInput && !projectPhoneInput.value) {
                try {
                    const [projects, inquiries] = await Promise.all([
                        db.projects.toArray(),
                        db.inquiries.toArray()
                    ]);
                    
                    let recordWithPhone = projects.find(p => p.customerName && p.customerName.toLowerCase() === name && p.customerPhone);
                    if (!recordWithPhone) {
                        recordWithPhone = inquiries.find(i => i.customerName && i.customerName.toLowerCase() === name && i.phone);
                        if (recordWithPhone) {
                            projectPhoneInput.value = recordWithPhone.phone;
                        }
                    } else {
                        projectPhoneInput.value = recordWithPhone.customerPhone;
                    }
                } catch (err) {
                    console.error("Error auto-filling project phone:", err);
                }
            }
        });
    }

    const projectNameInput = document.getElementById('project-name');
    if (projectNameInput) {
        projectNameInput.addEventListener('change', async (e) => {
            const projName = e.target.value.trim().toLowerCase();
            if (!projName) return;

            const customerInput = document.getElementById('project-customer');
            const phoneInput = document.getElementById('project-customer-phone');

            if (customerInput && !customerInput.value) {
                try {
                    const inquiries = await db.inquiries.toArray();
                    const inquiry = inquiries.find(i => i.projectName && i.projectName.toLowerCase() === projName);
                    if (inquiry) {
                        customerInput.value = inquiry.customerName;
                        if (phoneInput && !phoneInput.value) {
                            phoneInput.value = inquiry.phone || '';
                        }
                    }
                } catch (err) {
                    console.error("Error auto-filling from project name:", err);
                }
            }
        });
    }

    if (inquiryCustomerInput) {
        inquiryCustomerInput.addEventListener('change', async (e) => {
            const name = e.target.value.trim().toLowerCase();
            if (!name) return;
            const inquiryPhoneInput = document.getElementById('inquiry-phone');
            if (inquiryPhoneInput && !inquiryPhoneInput.value) {
                try {
                    const inquiries = await db.inquiries.toArray();
                    const recordWithPhone = inquiries.find(i => i.customerName && i.customerName.toLowerCase() === name && i.phone);
                    if (recordWithPhone) {
                        inquiryPhoneInput.value = recordWithPhone.phone;
                    }
                } catch (err) {
                    console.error("Error auto-filling inquiry phone:", err);
                }
            }
        });
    }
};

// --- Detailed Report Functionality ---
let currentDetailedReportType = 'sales';

window.showDetailedReport = function(type) {
    currentDetailedReportType = type;
    document.getElementById('detailed-report-modal').classList.remove('hidden');
    
    const title = document.getElementById('dr-modal-title');
    const icon = document.getElementById('dr-modal-icon');
    
    if (type === 'sales') {
        title.textContent = 'Sales Report';
        icon.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    } else if (type === 'orders') {
        title.textContent = 'Total Orders Report';
        icon.innerHTML = '<i class="fa-solid fa-receipt"></i>';
    } else if (type === 'expenses') {
        title.textContent = 'Expenses Report';
        icon.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
    }

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); 
    
    const formatLocal = (d) => {
        const offset = d.getTimezoneOffset() * 60000;
        return (new Date(d - offset)).toISOString().split('T')[0];
    };
    
    document.getElementById('dr-start-date').value = formatLocal(start);
    document.getElementById('dr-end-date').value = formatLocal(end);
    
    generateDetailedReport();
};

window.closeDetailedReport = function() {
    document.getElementById('detailed-report-modal').classList.add('hidden');
};

window.generateDetailedReport = async function() {
    const startDate = document.getElementById('dr-start-date').value;
    const endDate = document.getElementById('dr-end-date').value;
    const type = currentDetailedReportType;
    
    const thead = document.getElementById('dr-table-head');
    const tbody = document.getElementById('dr-table-body');
    const tfootTotal = document.getElementById('dr-total-amount');
    
    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Loading data...</td></tr>';
    tfootTotal.textContent = 'LKR 0.00';

    try {
        let total = 0;
        let rowsHtml = '';

        if (type === 'sales') {
            thead.innerHTML = `
                <tr>
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Receipt No</th>
                    <th class="px-4 py-3">Customer</th>
                    <th class="px-4 py-3">Method</th>
                    <th class="px-4 py-3 text-right">Amount (LKR)</th>
                </tr>
            `;
            
            let sales = await db.sales.where('date').between(startDate, endDate, true, true).reverse().toArray();
            if (sales.length === 0) {
                rowsHtml = '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">No sales found for this period.</td></tr>';
            } else {
                sales.forEach(s => {
                    const amt = parseFloat(s.amount) || 0;
                    total += amt;
                    rowsHtml += `
                        <tr class="hover:bg-gray-50 text-sm">
                            <td class="px-4 py-3">${s.date}</td>
                            <td class="px-4 py-3 font-mono font-bold text-gray-900">${s.receiptNo}</td>
                            <td class="px-4 py-3">${s.customerName}</td>
                            <td class="px-4 py-3"><span class="px-2 py-1 bg-gray-100 rounded text-xs">${s.paymentMethod}</span></td>
                            <td class="px-4 py-3 text-right font-mono font-bold text-brand-600">${amt.toLocaleString('en-LK', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        </tr>
                    `;
                });
            }
        } 
        else if (type === 'expenses') {
            thead.innerHTML = `
                <tr>
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Category</th>
                    <th class="px-4 py-3">Details</th>
                    <th class="px-4 py-3">Method</th>
                    <th class="px-4 py-3 text-right">Amount (LKR)</th>
                </tr>
            `;
            
            let expenses = await db.expenses.where('date').between(startDate, endDate, true, true).reverse().toArray();
            // Filter out internal transfers from actual expense reports
            expenses = expenses.filter(e => !e.category.includes('- Transfer'));

            if (expenses.length === 0) {
                rowsHtml = '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">No expenses found for this period.</td></tr>';
            } else {
                expenses.forEach(e => {
                    const amt = parseFloat(e.amount) || 0;
                    total += amt;
                    rowsHtml += `
                        <tr class="hover:bg-gray-50 text-sm">
                            <td class="px-4 py-3">${e.date}</td>
                            <td class="px-4 py-3"><span class="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-bold">${e.category}</span></td>
                            <td class="px-4 py-3">
                                <span class="block font-bold text-gray-900">${e.personName || ''}</span>
                                <span class="text-xs text-gray-500">${e.description || ''}</span>
                            </td>
                            <td class="px-4 py-3"><span class="px-2 py-1 bg-gray-100 rounded text-xs">${e.paymentMethod}</span></td>
                            <td class="px-4 py-3 text-right font-mono font-bold text-red-600">${amt.toLocaleString('en-LK', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        </tr>
                    `;
                });
            }
        }
        else if (type === 'orders') {
            thead.innerHTML = `
                <tr>
                    <th class="px-4 py-3">Reg Date</th>
                    <th class="px-4 py-3">Project ID</th>
                    <th class="px-4 py-3">Project Name & Customer</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Budget (LKR)</th>
                </tr>
            `;
            
            let projects = await db.projects.toArray();
            projects = projects.filter(p => p.registrationDate >= startDate && p.registrationDate <= endDate);
            
            if (projects.length === 0) {
                rowsHtml = '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">No projects/orders found for this period.</td></tr>';
            } else {
                projects.sort((a,b) => new Date(b.registrationDate) - new Date(a.registrationDate));
                projects.forEach(p => {
                    const amt = parseFloat(p.budget) || 0;
                    total += amt;
                    
                    let statusColor = 'bg-blue-100 text-blue-700';
                    if (p.status === 'Completed') statusColor = 'bg-green-100 text-green-700';
                    if (p.status === 'Cancelled') statusColor = 'bg-red-100 text-red-700';
                    if (p.status === 'On Hold') statusColor = 'bg-yellow-100 text-yellow-700';
                    if (p.status === 'Not Confirmed') statusColor = 'bg-orange-100 text-orange-700';

                    rowsHtml += `
                        <tr class="hover:bg-gray-50 text-sm">
                            <td class="px-4 py-3">${p.registrationDate}</td>
                            <td class="px-4 py-3 font-mono font-bold">${p.projectID || '-'}</td>
                            <td class="px-4 py-3">
                                <span class="block font-bold text-gray-900">${p.name}</span>
                                <span class="text-xs text-gray-500">${p.customerName}</span>
                            </td>
                            <td class="px-4 py-3"><span class="px-2 py-1 rounded text-[10px] font-bold ${statusColor}">${p.status}</span></td>
                            <td class="px-4 py-3 text-right font-mono font-bold text-brand-600">${amt.toLocaleString('en-LK', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        </tr>
                    `;
                });
            }
        }

        tbody.innerHTML = rowsHtml;
        tfootTotal.textContent = `LKR ${total.toLocaleString('en-LK', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
        
    } catch (e) {
        console.error("Error generating detailed report:", e);
        tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center text-red-500">Error loading data. Check console.</td></tr>';
    }
};

// --- Internal Transfer Handling ---
window.showTransferModal = function() {
    document.getElementById('transfer-modal').classList.remove('hidden');
    document.getElementById('transfer-date').valueAsDate = new Date();
    document.getElementById('transfer-amount').value = '';
};

window.closeTransferModal = function() {
    document.getElementById('transfer-modal').classList.add('hidden');
};

window.processTransfer = async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
        const type = document.getElementById('transfer-type').value;
        const amount = parseFloat(document.getElementById('transfer-amount').value);
        const date = document.getElementById('transfer-date').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        const transferData = {
            date,
            invoiceNo: `TRF-${Date.now().toString().slice(-6)}`,
            category: type,
            personName: 'Internal',
            paymentMethod: type === 'Bank to Cash - Transfer' ? 'Bank Transfer' : 'Cash',
            amount: amount,
            description: `Internal Transfer: ${type}`,
            timestamp: Date.now(),
            monthYear: date.substring(0, 7)
        };

        await db.expenses.add(transferData);
        alert('Transfer completed successfully!');
        
        closeTransferModal();
        loadDashboard(); // Refresh balances
    } catch (error) {
        console.error("Error processing transfer:", error);
        alert('Error saving data. Please try again.');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
};

// --- Database Maintenance ---
window.reorganizeQuotationNumbers = async function () {
    if (!confirm("Are you sure you want to reorganize all project quotation numbers? This will order them sequentially and update all linked payments. This cannot be undone.")) return;

    try {
        const btn = document.getElementById('reorg-btn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        }

        const allProjects = await db.projects.toArray();
        const projectsToUpdate = allProjects
            .filter(p => !p.isPersonal && p.projectID !== 'PERSONAL' && p.projectID)
            .sort((a, b) => a.timestamp - b.timestamp);

        let currentNum = 1401;

        for (const proj of projectsToUpdate) {
            const oldID = proj.projectID;
            const newID = `QUO-${String(currentNum).padStart(5, '0')}`;

            if (oldID !== newID) {
                console.log(`Updating Project ${proj.id}: ${oldID} -> ${newID}`);

                // 1. Update Project
                proj.projectID = newID;
                
                // Also update items in clientPayments inside the project object
                if (proj.clientPayments && proj.clientPayments.length > 0) {
                     for(let i=0; i<proj.clientPayments.length; i++){
                         // We don't have projectId inside clientPayments, but we should make sure the project object is fully saved
                     }
                }
                await db.projects.put(proj);

                // 2. Update linked Sales
                const associatedSales = await db.sales.where('projectId').equals(oldID).toArray();
                for (const sale of associatedSales) {
                    sale.projectId = newID;
                    sale.invoiceNo = newID; // Because project invoiceNo equals projectId
                    await db.sales.put(sale);
                }

                // 3. Update linked Expenses (if any)
                const associatedExpenses = await db.expenses.where('invoiceNo').equals(oldID).toArray();
                for (const exp of associatedExpenses) {
                    exp.invoiceNo = newID;
                    await db.expenses.put(exp);
                }
            }
            currentNum++;
        }

        alert("Quotation numbers reorganized sequentially successfully!");
        if (typeof loadProjects === 'function') loadProjects();
        if (typeof loadHistory === 'function') loadHistory();
        if (typeof loadDashboard === 'function') loadDashboard();

        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-layer-group"></i> Reorganize Quotation Numbers';
        }
    } catch (e) {
        console.error("Error reorganizing quotation numbers:", e);
        alert("An error occurred. Check console for details.");
        const btn = document.getElementById('reorg-btn');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-layer-group"></i> Reorganize Quotation Numbers';
        }
    }
};

// --- 13. Standalone Salary Paysheet Logic ---
window.resetSalaryForm = function () {
    const empName = document.getElementById('salary-employee-name');
    if (empName) empName.value = '';

    const salaryDate = document.getElementById('salary-date');
    if (salaryDate) salaryDate.valueAsDate = new Date();

    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const salaryMonth = document.getElementById('salary-month-year');
    if (salaryMonth) salaryMonth.value = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const salaryAmt = document.getElementById('salary-amount');
    if (salaryAmt) salaryAmt.value = '';

    const payMethod = document.getElementById('salary-payment-method');
    if (payMethod) payMethod.value = 'Bank Transfer';

    const notes = document.getElementById('salary-notes');
    if (notes) notes.value = '';
};

window.loadSalaryPaysheets = async function () {
    try {
        if (!db.salaryPaysheets) return;
        const list = await db.salaryPaysheets.orderBy('timestamp').reverse().toArray();
        const tbody = document.getElementById('salary-history-table-body');
        if (!tbody) return;

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-gray-400">No salary paysheets created yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = list.map(item => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="py-3 px-4 font-mono text-xs">${item.date}</td>
                <td class="py-3 px-4 font-bold text-gray-700">SAL-${String(item.id).padStart(3, '0')}</td>
                <td class="py-3 px-4 font-semibold text-gray-900">${item.employeeName}</td>
                <td class="py-3 px-4 text-gray-600">${item.salaryMonth}</td>
                <td class="py-3 px-4"><span class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold border border-blue-200"><i class="fa-solid fa-building-columns mr-1"></i>${item.paymentMethod || 'Bank Transfer'}</span></td>
                <td class="py-3 px-4 text-right font-mono font-bold text-gray-900">${parseFloat(item.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</td>
                <td class="py-3 px-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="printSalaryPaysheet80mm(${item.id})" class="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors" title="Print 80mm Slip">
                            <i class="fa-solid fa-print"></i>
                        </button>
                        <button onclick="deleteSalaryPaysheet(${item.id})" class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (e) {
        console.error("Error loading salary paysheets:", e);
    }
};

window.filterSalaryHistory = function () {
    const searchInput = document.getElementById('salary-search');
    if (!searchInput) return;
    const q = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#salary-history-table-body tr');
    rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        r.style.display = text.includes(q) ? '' : 'none';
    });
};

window.saveSalaryPaysheet = async function (shouldPrint = false) {
    const employeeName = document.getElementById('salary-employee-name').value.trim();
    const date = document.getElementById('salary-date').value;
    const salaryMonth = document.getElementById('salary-month-year').value.trim();
    const amountVal = document.getElementById('salary-amount').value;
    const amount = parseFloat(amountVal);
    const paymentMethod = document.getElementById('salary-payment-method').value || 'Bank Transfer';
    const notes = document.getElementById('salary-notes').value.trim();

    if (!employeeName) return alert('Please enter Employee Name.');
    if (!date) return alert('Please select Issued Date.');
    if (!salaryMonth) return alert('Please enter Salary Period / Month.');
    if (isNaN(amount) || amount <= 0) return alert('Please enter a valid salary amount.');

    try {
        const record = {
            date,
            employeeName,
            salaryMonth,
            amount,
            paymentMethod,
            notes,
            timestamp: Date.now()
        };

        const newId = await db.salaryPaysheets.add(record);
        record.id = newId;

        await loadSalaryPaysheets();

        if (shouldPrint) {
            await printSalaryPaysheet80mm(record);
        } else {
            alert('Salary Paysheet saved successfully!');
        }

        resetSalaryForm();
    } catch (e) {
        console.error("Error saving salary paysheet:", e);
        alert('Failed to save paysheet: ' + e.message);
    }
};

window.printSalaryPaysheet80mm = async function (idOrData) {
    try {
        let record = idOrData;
        if (typeof idOrData === 'number') {
            record = await db.salaryPaysheets.get(idOrData);
        }
        if (!record) return alert('Paysheet record not found');

        // Populate elements
        const psDate = document.getElementById('ps-print-date');
        if (psDate) psDate.textContent = record.date;

        const psRef = document.getElementById('ps-print-ref');
        if (psRef) psRef.textContent = `SAL-${String(record.id).padStart(3, '0')}`;

        const psName = document.getElementById('ps-print-name');
        if (psName) psName.textContent = record.employeeName;

        const psPeriod = document.getElementById('ps-print-period');
        if (psPeriod) psPeriod.textContent = record.salaryMonth;

        const psMethod = document.getElementById('ps-print-method');
        if (psMethod) psMethod.textContent = record.paymentMethod || 'Bank Transfer';

        const psNotes = document.getElementById('ps-print-notes');
        if (psNotes) psNotes.textContent = record.notes ? `Note: ${record.notes}` : '';

        const psAmount = document.getElementById('ps-print-amount');
        if (psAmount) psAmount.textContent = parseFloat(record.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 });

        // Ensure branding logo is refreshed
        if (typeof window.loadBranding === 'function') {
            await window.loadBranding();
        }

        document.body.classList.add('printing-salary-paysheet');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('printing-salary-paysheet');
        }, 500);
    } catch (e) {
        console.error("Print Error:", e);
        alert('Error preparing print: ' + e.message);
    }
};

window.deleteSalaryPaysheet = async function (id) {
    if (!confirm('Are you sure you want to delete this paysheet record?')) return;
    try {
        await db.salaryPaysheets.delete(id);
        await loadSalaryPaysheets();
    } catch (e) {
        console.error("Error deleting paysheet:", e);
        alert('Failed to delete paysheet: ' + e.message);
    }
};

// =============================================
// --- 14. Team Members Module ---
// =============================================

let editingTeamMemberId = null;

window.resetTeamMemberForm = function () {
    editingTeamMemberId = null;
    const fields = ['tm-name', 'tm-phone', 'tm-role', 'tm-nic', 'tm-bank-account', 'tm-bank-name', 'tm-monthly-rate', 'tm-join-date', 'tm-notes'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const joinDate = document.getElementById('tm-join-date');
    if (joinDate) joinDate.value = new Date().toISOString().split('T')[0];
    const formTitle = document.getElementById('tm-form-title');
    if (formTitle) formTitle.textContent = 'Register New Team Member';
    const submitBtn = document.getElementById('tm-submit-btn');
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Register Member';
    const cancelBtn = document.getElementById('cancel-tm-edit');
    if (cancelBtn) cancelBtn.classList.add('hidden');
};

window.saveTeamMember = async function () {
    const name = document.getElementById('tm-name')?.value.trim();
    const phone = document.getElementById('tm-phone')?.value.trim();
    const role = document.getElementById('tm-role')?.value.trim();
    const nicNo = document.getElementById('tm-nic')?.value.trim();
    const bankAccount = document.getElementById('tm-bank-account')?.value.trim();
    const bankName = document.getElementById('tm-bank-name')?.value.trim();
    const monthlyRate = parseFloat(document.getElementById('tm-monthly-rate')?.value) || 0;
    const joinDate = document.getElementById('tm-join-date')?.value;
    const notes = document.getElementById('tm-notes')?.value.trim();

    if (!name) return alert('Please enter the team member name.');

    const record = { name, phone, role, nicNo, bankAccount, bankName, monthlyRate, joinDate, notes, timestamp: Date.now() };

    try {
        if (editingTeamMemberId) {
            await db.teamMembers.update(editingTeamMemberId, record);
            alert('Team member updated successfully!');
        } else {
            await db.teamMembers.add(record);
            alert('Team member registered successfully!');
        }
        resetTeamMemberForm();
        loadTeamMembers();
    } catch (e) {
        console.error('Error saving team member:', e);
        alert('Failed to save: ' + e.message);
    }
};

window.loadTeamMembers = async function () {
    const container = document.getElementById('team-members-list');
    if (!container || !db.teamMembers) return;

    try {
        const members = await db.teamMembers.orderBy('timestamp').reverse().toArray();
        const allMemberProjPayments = db.memberProjectPayments ? await db.memberProjectPayments.toArray() : [];
        const allExpenses = await db.expenses.where('category').anyOf(['Salary', 'Salary Advance']).toArray();

        if (members.length === 0) {
            container.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
                    <i class="fa-solid fa-users text-5xl mb-4 text-gray-200"></i>
                    <p class="font-semibold text-lg">No team members registered yet.</p>
                    <p class="text-sm mt-1">Use the form above to add your first team member.</p>
                </div>`;
            return;
        }

        container.innerHTML = members.map(m => {
            // Only aggregate payments explicitly entered or linked for this member in memberProjectPayments
            const memberPayments = allMemberProjPayments.filter(p =>
                (p.memberId && p.memberId === m.id) ||
                (p.memberName && p.memberName.toLowerCase() === m.name.toLowerCase())
            );
            let totalAgreed = 0, totalPaid = 0;
            memberPayments.forEach(p => {
                totalAgreed += parseFloat(p.agreedAmount || p.agreed) || 0;
                totalPaid += parseFloat(p.paidAmount || p.paid) || 0;
            });

            // Also count expense-based salary payments for this member
            const salaryExpenses = allExpenses.filter(e =>
                e.personName && e.personName.toLowerCase() === m.name.toLowerCase()
            );
            const totalSalaryExpenses = salaryExpenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

            const totalPending = Math.max(0, totalAgreed - totalPaid);
            const roleColors = {
                'Designer': 'purple', 'Developer': 'blue', 'Technician': 'orange',
                'Photographer': 'pink', 'Editor': 'indigo', 'Manager': 'green'
            };
            const color = roleColors[m.role] || 'gray';

            return `
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <div class="p-5">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center text-${color}-600 font-black text-lg">
                                ${m.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-900 text-base">${m.name}</h3>
                                <span class="text-xs font-semibold bg-${color}-50 text-${color}-600 px-2 py-0.5 rounded-full border border-${color}-100">
                                    ${m.role || 'Team Member'}
                                </span>
                            </div>
                        </div>
                        <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="editTeamMember(${m.id})" class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                <i class="fa-solid fa-pen-to-square text-sm"></i>
                            </button>
                            <button onclick="deleteTeamMember(${m.id})" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <i class="fa-solid fa-trash text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <div class="space-y-1.5 text-sm text-gray-600 mb-4">
                        ${m.phone ? `<div class="flex items-center gap-2"><i class="fa-solid fa-phone w-4 text-gray-400 text-xs"></i>${m.phone}</div>` : ''}
                        ${m.nicNo ? `<div class="flex items-center gap-2"><i class="fa-solid fa-id-card w-4 text-gray-400 text-xs"></i>${m.nicNo}</div>` : ''}
                        ${m.bankName ? `<div class="flex items-center gap-2"><i class="fa-solid fa-building-columns w-4 text-gray-400 text-xs"></i>${m.bankName} ${m.bankAccount ? '• ' + m.bankAccount : ''}</div>` : ''}
                        ${m.joinDate ? `<div class="flex items-center gap-2"><i class="fa-solid fa-calendar w-4 text-gray-400 text-xs"></i>Joined: ${m.joinDate}</div>` : ''}
                        ${m.monthlyRate > 0 ? `<div class="flex items-center gap-2"><i class="fa-solid fa-money-bill w-4 text-gray-400 text-xs"></i>Monthly Rate: LKR ${m.monthlyRate.toLocaleString('en-LK', {minimumFractionDigits: 2})}</div>` : ''}
                    </div>

                    <!-- Payment Summary -->
                    <div class="bg-gray-50 rounded-xl p-3 space-y-2">
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Project Allocations</p>
                        <div class="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p class="text-[9px] text-gray-400 font-bold uppercase">Agreed</p>
                                <p class="font-black text-gray-700 text-sm font-mono">LKR ${totalAgreed.toLocaleString('en-LK', {minimumFractionDigits: 0})}</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-emerald-500 font-bold uppercase">Paid</p>
                                <p class="font-black text-emerald-600 text-sm font-mono">LKR ${totalPaid.toLocaleString('en-LK', {minimumFractionDigits: 0})}</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-red-400 font-bold uppercase">Pending</p>
                                <p class="font-black ${totalPending > 0 ? 'text-red-600' : 'text-gray-400'} text-sm font-mono">LKR ${totalPending.toLocaleString('en-LK', {minimumFractionDigits: 0})}</p>
                            </div>
                        </div>
                        ${totalSalaryExpenses > 0 ? `
                        <div class="border-t border-gray-200 pt-2 mt-2">
                            <p class="text-[9px] text-gray-400 font-bold uppercase mb-1">Salary Expenses Paid</p>
                            <p class="font-black text-blue-600 text-sm font-mono">LKR ${totalSalaryExpenses.toLocaleString('en-LK', {minimumFractionDigits: 0})}</p>
                        </div>` : ''}
                    </div>
                </div>

                <!-- Actions Footer -->
                <div class="border-t border-gray-50 px-5 py-3 flex gap-2">
                    <button onclick="showMemberPaymentDetails(${m.id})" class="flex-1 text-xs font-bold text-brand-600 bg-brand-50 border border-brand-100 px-3 py-2 rounded-lg hover:bg-brand-100 transition-colors flex items-center justify-center gap-1">
                        <i class="fa-solid fa-list-check"></i> Manage Payments (${memberPayments.length})
                    </button>
                    <button onclick="copyMemberPortalLink('${encodeURIComponent(m.name)}', this)" title="Copy Live Payment Link for ${m.name}"
                        class="flex items-center justify-center gap-1 text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-2 rounded-lg hover:bg-sky-100 transition-colors">
                        <i class="fa-solid fa-link text-sm"></i>
                    </button>
                    ${m.phone ? `
                    <a href="https://wa.me/94${m.phone.replace(/^0/, '')}?text=Hi%20${encodeURIComponent(m.name)}" target="_blank"
                        class="flex items-center justify-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors">
                        <i class="fa-brands fa-whatsapp text-base"></i>
                    </a>` : ''}
                </div>
            </div>`;
        }).join('');

    } catch (e) {
        console.error('Error loading team members:', e);
    }
};

window.copyMemberPortalLink = function(encodedName, btnElement) {
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?member=${encodedName}`;
    const copy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(link);
        }
        const ta = document.createElement('textarea');
        ta.value = link;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        return Promise.resolve();
    };
    copy().then(() => {
        if (btnElement) {
            const orig = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fa-solid fa-check"></i>';
            btnElement.classList.add('bg-sky-600', 'text-white');
            setTimeout(() => {
                btnElement.innerHTML = orig;
                btnElement.classList.remove('bg-sky-600', 'text-white');
            }, 2000);
        }
    }).catch(() => {
        prompt('Copy this link and share with the team member:', link);
    });
};

window.editTeamMember = async function (id) {
    try {
        const m = await db.teamMembers.get(id);
        if (!m) return alert('Member not found');
        editingTeamMemberId = id;
        document.getElementById('tm-name').value = m.name || '';
        document.getElementById('tm-phone').value = m.phone || '';
        document.getElementById('tm-role').value = m.role || '';
        document.getElementById('tm-nic').value = m.nicNo || '';
        document.getElementById('tm-bank-account').value = m.bankAccount || '';
        document.getElementById('tm-bank-name').value = m.bankName || '';
        document.getElementById('tm-monthly-rate').value = m.monthlyRate || '';
        document.getElementById('tm-join-date').value = m.joinDate || '';
        document.getElementById('tm-notes').value = m.notes || '';
        const formTitle = document.getElementById('tm-form-title');
        if (formTitle) formTitle.textContent = 'Edit Team Member';
        const submitBtn = document.getElementById('tm-submit-btn');
        if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Update Member';
        const cancelBtn = document.getElementById('cancel-tm-edit');
        if (cancelBtn) cancelBtn.classList.remove('hidden');
        document.getElementById('tm-form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        console.error('Error editing team member:', e);
    }
};

window.deleteTeamMember = async function (id) {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
        await db.teamMembers.delete(id);
        loadTeamMembers();
    } catch (e) {
        console.error('Error deleting team member:', e);
        alert('Failed to delete: ' + e.message);
    }
};

window.filterTeamMembers = function () {
    const q = document.getElementById('tm-search')?.value.toLowerCase() || '';
    const cards = document.querySelectorAll('#team-members-list > div');
    cards.forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
};

// =============================================
// --- Team Member Project Payments Handling ---
// =============================================

window.showMemberPaymentDetails = async function (memberId) {
    try {
        const m = await db.teamMembers.get(memberId);
        if (!m) return;

        document.getElementById('mpd-current-member-id').value = memberId;
        document.getElementById('mpd-member-name').textContent = m.name;
        document.getElementById('mpd-member-role').textContent = m.role || 'Team Member';

        // Populate projects datalist
        const dl = document.getElementById('mpd-projects-datalist');
        if (dl && db.projects) {
            const projs = await db.projects.toArray();
            dl.innerHTML = projs.map(p => `<option value="${p.name}">${p.projectID ? ' [' + p.projectID + ']' : ''}</option>`).join('');
        }

        resetMemberProjectPaymentForm();
        await loadMemberProjectPaymentsTable(memberId, m.name);

        // Salary Expenses for this member
        const allExpenses = await db.expenses.where('category').anyOf(['Salary', 'Salary Advance']).toArray();
        const salaryExpenses = allExpenses.filter(e =>
            e.personName && e.personName.toLowerCase() === m.name.toLowerCase()
        );
        let salaryRows = salaryExpenses.map(e => `
            <tr class="hover:bg-blue-50">
                <td class="px-4 py-3">
                    <div class="font-semibold text-gray-800 text-sm">${e.category}</div>
                    <div class="text-xs text-gray-400">${e.description || '-'}</div>
                </td>
                <td class="px-4 py-3 text-right font-mono text-sm text-blue-700 font-bold" colspan="3">LKR ${parseFloat(e.amount).toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-4 py-3 text-xs text-gray-500">${e.date || '-'}</td>
            </tr>`).join('');

        const totalSalary = salaryExpenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
        document.getElementById('mpd-salary-rows').innerHTML = salaryRows || `<tr><td colspan="5" class="px-4 py-6 text-center text-gray-400">No salary expenses recorded.</td></tr>`;
        document.getElementById('mpd-total-salary').textContent = 'LKR ' + totalSalary.toLocaleString('en-LK', {minimumFractionDigits: 2});

        document.getElementById('member-payment-detail-modal').classList.remove('hidden');
    } catch (e) {
        console.error('Error loading member payment details:', e);
    }
};

window.loadMemberProjectPaymentsTable = async function (memberId, memberName) {
    if (!db.memberProjectPayments) return;
    try {
        const all = await db.memberProjectPayments.toArray();
        const records = all.filter(p =>
            (p.memberId && p.memberId === memberId) ||
            (p.memberName && p.memberName.toLowerCase() === memberName.toLowerCase())
        );

        let totalAgreed = 0, totalPaid = 0;
        let rows = '';

        records.forEach(p => {
            const agreed = parseFloat(p.agreedAmount || p.agreed) || 0;
            const paid = parseFloat(p.paidAmount || p.paid) || 0;
            const pending = Math.max(0, agreed - paid);
            totalAgreed += agreed;
            totalPaid += paid;

            rows += `
            <tr class="hover:bg-gray-50 border-b border-gray-50">
                <td class="px-3.5 py-3">
                    <div class="font-bold text-gray-800 text-xs">${p.projectName}</div>
                </td>
                <td class="px-3 py-3 font-mono text-xs text-gray-500">${p.quoNumber || '-'}</td>
                <td class="px-3 py-3 text-right font-mono text-xs text-gray-700 font-bold">LKR ${agreed.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-3 py-3 text-right font-mono text-xs text-emerald-600 font-bold">LKR ${paid.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-3 py-3 text-right font-mono text-xs ${pending > 0 ? 'text-red-600 font-black' : 'text-gray-400'}">LKR ${pending.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-3 py-3 text-xs text-gray-500 font-mono">${p.date || '-'}</td>
                <td class="px-3 py-3 text-xs text-gray-500">${p.notes || '-'}</td>
                <td class="px-3 py-3 text-center">
                    <div class="flex items-center justify-center gap-1">
                        ${pending > 0 ? `
                        <button onclick="openMemberQuickPayModal(${p.id})" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded text-[11px] border border-emerald-200" title="Add Payment Installment">
                            <i class="fa-solid fa-money-bill-wave"></i> Pay
                        </button>` : `
                        <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Settled</span>
                        `}
                        <button onclick="editMemberProjectPayment(${p.id})" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                            <i class="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button onclick="deleteMemberProjectPayment(${p.id})" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                            <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        });

        const totalPending = Math.max(0, totalAgreed - totalPaid);
        document.getElementById('mpd-project-rows').innerHTML = rows || `<tr><td colspan="8" class="px-4 py-8 text-center text-gray-400">No project allocations added yet. Use the form above to add project name, quo number, agreed amount, and paid amount.</td></tr>`;
        document.getElementById('mpd-total-agreed').textContent = 'LKR ' + totalAgreed.toLocaleString('en-LK', {minimumFractionDigits: 2});
        document.getElementById('mpd-total-paid').textContent = 'LKR ' + totalPaid.toLocaleString('en-LK', {minimumFractionDigits: 2});
        document.getElementById('mpd-total-pending').textContent = 'LKR ' + totalPending.toLocaleString('en-LK', {minimumFractionDigits: 2});
    } catch (err) {
        console.error('Error loading member project payments table:', err);
    }
};

window.saveMemberProjectPaymentRecord = async function () {
    const memberId = parseInt(document.getElementById('mpd-current-member-id')?.value);
    const editId = document.getElementById('mpd-edit-payment-id')?.value;
    const projName = document.getElementById('mpd-input-proj-name')?.value.trim();
    const quoNumber = document.getElementById('mpd-input-quo-number')?.value.trim();
    const agreed = parseFloat(document.getElementById('mpd-input-agreed')?.value) || 0;
    const paid = parseFloat(document.getElementById('mpd-input-paid')?.value) || 0;
    const date = document.getElementById('mpd-input-date')?.value || new Date().toISOString().split('T')[0];
    const notes = document.getElementById('mpd-input-notes')?.value.trim();

    if (!memberId) return alert('No team member selected.');
    if (!projName) return alert('Please enter the project name.');
    if (agreed <= 0) return alert('Please enter a valid agreed amount (ගෙවිය යුතු ගණන).');

    try {
        const member = await db.teamMembers.get(memberId);
        const memberName = member ? member.name : '';

        const record = {
            memberId,
            memberName,
            projectName: projName,
            quoNumber,
            agreedAmount: agreed,
            paidAmount: paid,
            date,
            notes,
            timestamp: Date.now()
        };

        if (editId) {
            await db.memberProjectPayments.update(parseInt(editId), record);
            alert('Project allocation updated successfully!');
        } else {
            await db.memberProjectPayments.add(record);
            alert('Project allocation added successfully!');
        }

        resetMemberProjectPaymentForm();
        await loadMemberProjectPaymentsTable(memberId, memberName);
        await loadTeamMembers();
    } catch (e) {
        console.error('Error saving member project payment:', e);
        alert('Failed to save record: ' + e.message);
    }
};

window.resetMemberProjectPaymentForm = function () {
    document.getElementById('mpd-edit-payment-id').value = '';
    document.getElementById('mpd-input-proj-name').value = '';
    document.getElementById('mpd-input-quo-number').value = '';
    document.getElementById('mpd-input-agreed').value = '';
    document.getElementById('mpd-input-paid').value = '';
    document.getElementById('mpd-input-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('mpd-input-notes').value = '';
    document.getElementById('mpd-form-heading').innerHTML = '<i class="fa-solid fa-plus-circle text-brand-600"></i> Add Project Payment / Quo Allocation';
    document.getElementById('mpd-save-record-btn').innerHTML = '<i class="fa-solid fa-plus"></i> Add Project Allocation';
    document.getElementById('mpd-cancel-edit-btn').classList.add('hidden');
};

window.editMemberProjectPayment = async function (id) {
    try {
        const p = await db.memberProjectPayments.get(id);
        if (!p) return;

        document.getElementById('mpd-edit-payment-id').value = p.id;
        document.getElementById('mpd-input-proj-name').value = p.projectName || '';
        document.getElementById('mpd-input-quo-number').value = p.quoNumber || '';
        document.getElementById('mpd-input-agreed').value = p.agreedAmount || p.agreed || '';
        document.getElementById('mpd-input-paid').value = p.paidAmount || p.paid || '';
        document.getElementById('mpd-input-date').value = p.date || '';
        document.getElementById('mpd-input-notes').value = p.notes || '';

        document.getElementById('mpd-form-heading').innerHTML = '<i class="fa-solid fa-pen-to-square text-blue-600"></i> Edit Project Allocation';
        document.getElementById('mpd-save-record-btn').innerHTML = '<i class="fa-solid fa-check"></i> Update Allocation';
        document.getElementById('mpd-cancel-edit-btn').classList.remove('hidden');

        document.getElementById('mpd-input-proj-name').focus();
    } catch (e) {
        console.error('Error editing member project payment:', e);
    }
};

window.deleteMemberProjectPayment = async function (id) {
    if (!confirm('Are you sure you want to delete this project allocation record?')) return;
    try {
        const p = await db.memberProjectPayments.get(id);
        const memberId = p ? p.memberId : parseInt(document.getElementById('mpd-current-member-id')?.value);
        const memberName = p ? p.memberName : '';
        await db.memberProjectPayments.delete(id);
        await loadMemberProjectPaymentsTable(memberId, memberName);
        await loadTeamMembers();
    } catch (e) {
        console.error('Error deleting member project payment:', e);
        alert('Failed to delete: ' + e.message);
    }
};

window.openMemberQuickPayModal = async function (id) {
    try {
        const p = await db.memberProjectPayments.get(id);
        if (!p) return;
        const agreed = parseFloat(p.agreedAmount || p.agreed) || 0;
        const paid = parseFloat(p.paidAmount || p.paid) || 0;
        const pending = Math.max(0, agreed - paid);

        document.getElementById('mqp-record-id').value = p.id;
        document.getElementById('mqp-member-title').textContent = `${p.projectName} (${p.quoNumber || 'No Quo'}) - ${p.memberName}`;
        document.getElementById('mqp-pending-amount').textContent = 'LKR ' + pending.toLocaleString('en-LK', {minimumFractionDigits: 2});
        document.getElementById('mqp-add-amount').value = pending > 0 ? pending : '';
        document.getElementById('mqp-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('mqp-note').value = '';

        document.getElementById('member-quick-pay-modal').classList.remove('hidden');
    } catch (e) {
        console.error(e);
    }
};

window.closeMemberQuickPayModal = function () {
    document.getElementById('member-quick-pay-modal').classList.add('hidden');
};

window.fillFullMemberQuickPayment = function () {
    const text = document.getElementById('mqp-pending-amount')?.textContent || '';
    const num = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
    document.getElementById('mqp-add-amount').value = num;
};

window.saveMemberQuickPayment = async function () {
    const recordId = parseInt(document.getElementById('mqp-record-id')?.value);
    const addAmount = parseFloat(document.getElementById('mqp-add-amount')?.value) || 0;
    const date = document.getElementById('mqp-date')?.value || new Date().toISOString().split('T')[0];
    const note = document.getElementById('mqp-note')?.value.trim();

    if (!recordId) return alert('No record selected.');
    if (addAmount <= 0) return alert('Please enter a valid payment amount.');

    try {
        const p = await db.memberProjectPayments.get(recordId);
        if (!p) return alert('Record not found.');

        const currentPaid = parseFloat(p.paidAmount || p.paid) || 0;
        const newPaid = currentPaid + addAmount;
        const updatedNotes = note ? (p.notes ? p.notes + '; ' + note : note) : p.notes;

        await db.memberProjectPayments.update(recordId, {
            paidAmount: newPaid,
            date: date,
            notes: updatedNotes,
            timestamp: Date.now()
        });

        closeMemberQuickPayModal();
        const memberId = p.memberId || parseInt(document.getElementById('mpd-current-member-id')?.value);
        await loadMemberProjectPaymentsTable(memberId, p.memberName);
        await loadTeamMembers();
        alert(`Payment of LKR ${addAmount.toLocaleString('en-LK', {minimumFractionDigits: 2})} recorded successfully!`);
    } catch (e) {
        console.error('Error saving member quick payment:', e);
        alert('Failed to record payment: ' + e.message);
    }
};

window.closeMemberPaymentDetail = function () {
    document.getElementById('member-payment-detail-modal').classList.add('hidden');
};

// =============================================
// --- 14.5 Payable Bills Module (ණය බිල්පත්) ---
// =============================================

let editingPayableBillId = null;

window.togglePayableBillForm = function (forceState) {
    const card = document.getElementById('payable-bill-form-card');
    if (!card) return;
    if (typeof forceState === 'boolean') {
        card.classList.toggle('hidden', !forceState);
    } else {
        card.classList.toggle('hidden');
    }
    if (!card.classList.contains('hidden')) {
        document.getElementById('pb-title')?.focus();
    }
};

window.resetPayableBillForm = function () {
    editingPayableBillId = null;
    const fields = ['pb-edit-id', 'pb-title', 'pb-vendor', 'pb-invoice-no', 'pb-total-amount', 'pb-bill-date', 'pb-due-date', 'pb-notes', 'pb-attachment-base64'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const fileInput = document.getElementById('pb-attachment-file');
    if (fileInput) fileInput.value = '';

    const viewBtn = document.getElementById('pb-view-attached-btn');
    if (viewBtn) viewBtn.classList.add('hidden');
    const clearBtn = document.getElementById('pb-clear-attached-btn');
    if (clearBtn) clearBtn.classList.add('hidden');

    const today = new Date().toISOString().split('T')[0];
    const billDate = document.getElementById('pb-bill-date');
    if (billDate) billDate.value = today;

    const formTitle = document.getElementById('pb-form-title');
    if (formTitle) formTitle.innerHTML = '<i class="fa-solid fa-receipt text-orange-600"></i> Add Upcoming Bill to Pay';
    const submitBtn = document.getElementById('pb-submit-btn');
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Bill';
};

window.handleBillAttachmentUpload = function (input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64 = e.target.result;
        document.getElementById('pb-attachment-base64').value = base64;
        const viewBtn = document.getElementById('pb-view-attached-btn');
        if (viewBtn) {
            viewBtn.classList.remove('hidden');
            viewBtn.innerHTML = file.type === 'application/pdf' ? '<i class="fa-solid fa-file-pdf"></i> View PDF' : '<i class="fa-solid fa-image"></i> View Slip';
        }
        const clearBtn = document.getElementById('pb-clear-attached-btn');
        if (clearBtn) clearBtn.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
};

window.previewCurrentBillAttachment = function () {
    const base64 = document.getElementById('pb-attachment-base64')?.value;
    if (!base64) return alert('No file attached.');
    viewPdfOrImageBase64(base64, 'Bill Attachment Preview');
};

window.clearCurrentBillAttachment = function () {
    document.getElementById('pb-attachment-base64').value = '';
    const fileInput = document.getElementById('pb-attachment-file');
    if (fileInput) fileInput.value = '';
    document.getElementById('pb-view-attached-btn')?.classList.add('hidden');
    document.getElementById('pb-clear-attached-btn')?.classList.add('hidden');
};

window.savePayableBill = async function () {
    const title = document.getElementById('pb-title')?.value.trim();
    const vendor = document.getElementById('pb-vendor')?.value.trim();
    const invoiceNo = document.getElementById('pb-invoice-no')?.value.trim();
    const totalAmount = parseFloat(document.getElementById('pb-total-amount')?.value) || 0;
    const billDate = document.getElementById('pb-bill-date')?.value || new Date().toISOString().split('T')[0];
    const dueDate = document.getElementById('pb-due-date')?.value;
    const category = document.getElementById('pb-category')?.value || 'Supplier / Materials';
    const attachment = document.getElementById('pb-attachment-base64')?.value || '';
    const notes = document.getElementById('pb-notes')?.value.trim();

    if (!title) return alert('Please enter a bill title / description.');
    if (totalAmount <= 0) return alert('Please enter a valid bill amount.');
    if (!dueDate) return alert('Please select a Due Date (ගෙවිය යුතු දිනය).');

    try {
        let payments = [];
        let currentStatus = 'Pending';

        if (editingPayableBillId) {
            const existing = await db.payableBills.get(editingPayableBillId);
            if (existing) {
                payments = existing.payments || [];
                const paidSum = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
                if (paidSum >= totalAmount) currentStatus = 'Paid';
                else if (paidSum > 0) currentStatus = 'Partially Paid';
            }
        }

        const record = {
            title,
            vendor,
            invoiceNo,
            totalAmount,
            billDate,
            dueDate,
            category,
            attachment,
            notes,
            payments,
            status: currentStatus,
            timestamp: Date.now()
        };

        if (editingPayableBillId) {
            await db.payableBills.update(editingPayableBillId, record);
            alert('Bill updated successfully!');
        } else {
            await db.payableBills.add(record);
            alert('Payable bill added successfully!');
        }

        resetPayableBillForm();
        togglePayableBillForm(false);
        await loadPayableBills();
    } catch (e) {
        console.error('Error saving payable bill:', e);
        alert('Failed to save bill: ' + e.message);
    }
};

window.editPayableBill = async function (id) {
    try {
        const bill = await db.payableBills.get(id);
        if (!bill) return alert('Bill not found.');

        editingPayableBillId = id;
        document.getElementById('pb-edit-id').value = id;
        document.getElementById('pb-title').value = bill.title || '';
        document.getElementById('pb-vendor').value = bill.vendor || '';
        document.getElementById('pb-invoice-no').value = bill.invoiceNo || '';
        document.getElementById('pb-total-amount').value = bill.totalAmount || '';
        document.getElementById('pb-bill-date').value = bill.billDate || '';
        document.getElementById('pb-due-date').value = bill.dueDate || '';
        document.getElementById('pb-category').value = bill.category || 'Supplier / Materials';
        document.getElementById('pb-notes').value = bill.notes || '';
        document.getElementById('pb-attachment-base64').value = bill.attachment || '';

        const viewBtn = document.getElementById('pb-view-attached-btn');
        const clearBtn = document.getElementById('pb-clear-attached-btn');
        if (bill.attachment) {
            viewBtn.classList.remove('hidden');
            viewBtn.innerHTML = bill.attachment.includes('application/pdf') ? '<i class="fa-solid fa-file-pdf"></i> View PDF' : '<i class="fa-solid fa-image"></i> View Attachment';
            clearBtn.classList.remove('hidden');
        } else {
            viewBtn.classList.add('hidden');
            clearBtn.classList.add('hidden');
        }

        document.getElementById('pb-form-title').innerHTML = '<i class="fa-solid fa-pen-to-square text-orange-600"></i> Edit Payable Bill';
        document.getElementById('pb-submit-btn').innerHTML = '<i class="fa-solid fa-check"></i> Update Bill';

        togglePayableBillForm(true);
        document.getElementById('payable-bill-form-card').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        console.error('Error editing bill:', e);
    }
};

window.deletePayableBill = async function (id) {
    if (!confirm('Are you sure you want to delete this payable bill?')) return;
    try {
        await db.payableBills.delete(id);
        await loadPayableBills();
    } catch (e) {
        console.error('Error deleting bill:', e);
        alert('Failed to delete bill: ' + e.message);
    }
};

window.loadPayableBills = async function () {
    const tbody = document.getElementById('pb-table-body');
    if (!tbody || !db.payableBills) return;

    try {
        const allBills = await db.payableBills.orderBy('timestamp').reverse().toArray();

        // Populate suppliers datalist
        const dl = document.getElementById('pb-suppliers-datalist');
        if (dl && db.suppliers) {
            const suppliers = await db.suppliers.toArray();
            dl.innerHTML = suppliers.map(s => `<option value="${s.shopName || s.name}">`).join('');
        }

        const todayStr = new Date().toISOString().split('T')[0];
        let grandTotal = 0, grandPaid = 0, grandBalance = 0, overdueCount = 0;

        allBills.forEach(b => {
            const total = parseFloat(b.totalAmount) || 0;
            const paid = (b.payments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
            const balance = Math.max(0, total - paid);
            grandTotal += total;
            grandPaid += paid;
            grandBalance += balance;

            if (balance > 0 && b.dueDate && b.dueDate < todayStr) {
                overdueCount++;
            }
        });

        // Update KPI Cards
        const fmtLKR = (v) => 'LKR ' + v.toLocaleString('en-LK', {minimumFractionDigits: 2});
        document.getElementById('pb-stat-total').textContent = fmtLKR(grandTotal);
        document.getElementById('pb-stat-paid').textContent = fmtLKR(grandPaid);
        document.getElementById('pb-stat-balance').textContent = fmtLKR(grandBalance);
        document.getElementById('pb-stat-overdue').textContent = overdueCount;

        // Update Nav badge
        const badge = document.getElementById('pb-nav-badge');
        if (badge) {
            const activeDueCount = allBills.filter(b => {
                const total = parseFloat(b.totalAmount) || 0;
                const paid = (b.payments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
                return total > paid;
            }).length;
            if (activeDueCount > 0) {
                badge.textContent = activeDueCount;
                badge.classList.remove('hidden');
                if (overdueCount > 0) {
                    badge.className = 'text-[10px] font-black px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse';
                } else {
                    badge.className = 'text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800';
                }
            } else {
                badge.classList.add('hidden');
            }
        }

        // Filtering
        const searchQ = document.getElementById('pb-search')?.value.toLowerCase().trim() || '';
        const statusFilter = document.getElementById('pb-status-filter')?.value || 'all';

        const filtered = allBills.filter(b => {
            const total = parseFloat(b.totalAmount) || 0;
            const paid = (b.payments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
            const balance = Math.max(0, total - paid);
            const isOverdue = balance > 0 && b.dueDate && b.dueDate < todayStr;
            const computedStatus = balance <= 0 ? 'Paid' : (paid > 0 ? 'Partially Paid' : 'Pending');

            if (statusFilter === 'overdue' && !isOverdue) return false;
            if (statusFilter !== 'all' && statusFilter !== 'overdue' && computedStatus !== statusFilter) return false;

            if (searchQ) {
                const matchStr = `${b.title} ${b.vendor || ''} ${b.invoiceNo || ''} ${b.category || ''}`.toLowerCase();
                if (!matchStr.includes(searchQ)) return false;
            }
            return true;
        });

        document.getElementById('pb-count-label').textContent = `${filtered.length} of ${allBills.length} bills`;

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="10" class="py-12 text-center text-gray-400 font-medium">No payable bills found matching your filter.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(b => {
            const total = parseFloat(b.totalAmount) || 0;
            const paid = (b.payments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
            const balance = Math.max(0, total - paid);
            const isOverdue = balance > 0 && b.dueDate && b.dueDate < todayStr;
            const isDueToday = balance > 0 && b.dueDate === todayStr;

            // Due Date Badge calculation
            let dueBadge = '';
            if (balance <= 0) {
                dueBadge = `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Settled</span>`;
            } else if (isOverdue) {
                const diffDays = Math.ceil((new Date(todayStr) - new Date(b.dueDate)) / (1000 * 60 * 60 * 24));
                dueBadge = `<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-300 animate-pulse">⚠️ Overdue by ${diffDays}d</span>`;
            } else if (isDueToday) {
                dueBadge = `<span class="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-300">🚨 Due Today</span>`;
            } else if (b.dueDate) {
                const diffDays = Math.ceil((new Date(b.dueDate) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
                dueBadge = `<span class="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Due in ${diffDays}d</span>`;
            }

            // Status Badge
            const statusBadges = {
                'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
                'Partially Paid': 'bg-blue-50 text-blue-700 border-blue-200',
                'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-200'
            };
            const currentStatus = balance <= 0 ? 'Paid' : (paid > 0 ? 'Partially Paid' : 'Pending');
            const statusClass = statusBadges[currentStatus] || 'bg-gray-50 text-gray-700 border-gray-200';

            return `
            <tr class="hover:bg-orange-50/40 transition-colors border-b border-gray-100">
                <td class="px-4 py-3.5">
                    <div class="font-bold text-gray-900 text-sm">${b.title}</div>
                    <div class="flex items-center gap-2 mt-0.5">
                        ${b.vendor ? `<span class="text-xs font-semibold text-gray-600"><i class="fa-solid fa-store text-gray-400 text-[10px]"></i> ${b.vendor}</span>` : ''}
                        <span class="text-[10px] text-gray-400 font-medium">• ${b.category || 'General'}</span>
                    </div>
                </td>
                <td class="px-4 py-3.5 font-mono text-xs text-gray-600">${b.invoiceNo || '-'}</td>
                <td class="px-4 py-3.5 font-mono text-xs text-gray-500">${b.billDate || '-'}</td>
                <td class="px-4 py-3.5 font-mono text-xs">
                    <div class="font-semibold text-gray-800">${b.dueDate || '-'}</div>
                    <div class="mt-1">${dueBadge}</div>
                </td>
                <td class="px-4 py-3.5 text-right font-mono font-bold text-sm text-gray-800">LKR ${total.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-4 py-3.5 text-right font-mono font-bold text-sm text-emerald-600">LKR ${paid.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-4 py-3.5 text-right font-mono font-black text-sm ${balance > 0 ? 'text-red-600' : 'text-gray-400'}">LKR ${balance.toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                <td class="px-4 py-3.5 text-center">
                    <span class="text-[10px] font-black px-2.5 py-1 rounded-full border ${statusClass}">
                        ${currentStatus}
                    </span>
                </td>
                <td class="px-4 py-3.5 text-center">
                    ${b.attachment ? `
                    <button onclick="viewBillAttachment(${b.id})" class="text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 p-2 rounded-xl transition-colors border border-orange-200" title="View attached bill PDF or image">
                        <i class="fa-solid ${b.attachment.includes('application/pdf') ? 'fa-file-pdf text-red-500' : 'fa-file-image text-blue-500'} text-base"></i>
                    </button>` : `<span class="text-gray-300 text-xs">-</span>`}
                </td>
                <td class="px-4 py-3.5 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                        ${balance > 0 ? `
                        <button onclick="openRecordBillPaymentModal(${b.id})" class="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-sm shadow-orange-500/20" title="Record Payment">
                            <i class="fa-solid fa-money-bill-wave"></i> Pay
                        </button>` : `
                        <button onclick="openRecordBillPaymentModal(${b.id})" class="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-lg text-xs" title="Add extra payment">
                            + Pay
                        </button>`}
                        ${(b.payments && b.payments.length > 0) ? `
                        <button onclick="viewBillPaymentHistory(${b.id})" class="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg text-xs" title="Payment History (${b.payments.length})">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                        </button>` : ''}
                        <button onclick="editPayableBill(${b.id})" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-xs" title="Edit">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deletePayableBill(${b.id})" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');

    } catch (e) {
        console.error('Error loading payable bills:', e);
    }
};

window.filterPayableBills = function () {
    loadPayableBills();
};

window.openRecordBillPaymentModal = async function (billId) {
    try {
        const bill = await db.payableBills.get(billId);
        if (!bill) return;

        const total = parseFloat(bill.totalAmount) || 0;
        const paid = (bill.payments || []).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
        const remaining = Math.max(0, total - paid);

        document.getElementById('rbp-bill-id').value = bill.id;
        document.getElementById('rbp-bill-title').textContent = `${bill.title} (${bill.vendor || 'No vendor'})`;
        document.getElementById('rbp-remaining-balance').textContent = 'LKR ' + remaining.toLocaleString('en-LK', {minimumFractionDigits: 2});
        document.getElementById('rbp-amount').value = remaining > 0 ? remaining : '';
        document.getElementById('rbp-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('rbp-note').value = '';
        document.getElementById('rbp-method').value = 'Bank Transfer';
        document.getElementById('rbp-sync-expense').checked = true;

        document.getElementById('record-bill-payment-modal').classList.remove('hidden');
        document.getElementById('rbp-amount').focus();
    } catch (e) {
        console.error(e);
    }
};

window.closeRecordBillPaymentModal = function () {
    document.getElementById('record-bill-payment-modal').classList.add('hidden');
};

window.fillFullRemainingBillPayment = function () {
    const text = document.getElementById('rbp-remaining-balance')?.textContent || '';
    const num = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
    document.getElementById('rbp-amount').value = num;
};

window.saveBillPayment = async function () {
    const billId = parseInt(document.getElementById('rbp-bill-id')?.value);
    const amount = parseFloat(document.getElementById('rbp-amount')?.value) || 0;
    const date = document.getElementById('rbp-date')?.value || new Date().toISOString().split('T')[0];
    const method = document.getElementById('rbp-method')?.value || 'Cash';
    const note = document.getElementById('rbp-note')?.value.trim();
    const syncExpense = document.getElementById('rbp-sync-expense')?.checked;

    if (!billId) return alert('No bill selected.');
    if (amount <= 0) return alert('Please enter a valid payment amount.');

    try {
        const bill = await db.payableBills.get(billId);
        if (!bill) return alert('Bill not found.');

        const payments = bill.payments || [];
        const newPayment = {
            id: Date.now(),
            amount,
            date,
            method,
            note,
            timestamp: Date.now()
        };
        payments.push(newPayment);

        const newPaidTotal = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
        const billTotal = parseFloat(bill.totalAmount) || 0;
        let newStatus = 'Pending';
        if (newPaidTotal >= billTotal) newStatus = 'Paid';
        else if (newPaidTotal > 0) newStatus = 'Partially Paid';

        await db.payableBills.update(billId, {
            payments,
            status: newStatus
        });

        // Optionally record in Expenses table
        if (syncExpense && db.expenses) {
            await db.expenses.add({
                date: date,
                invoiceNo: bill.invoiceNo || '',
                category: 'Suppliers',
                personName: bill.vendor || bill.title,
                paymentMethod: method,
                amount: amount,
                description: `Bill Payment: ${bill.title}${note ? ' (' + note + ')' : ''}`,
                attachment: bill.attachment || '',
                timestamp: Date.now(),
                monthYear: date.substring(0, 7)
            });
        }

        closeRecordBillPaymentModal();
        await loadPayableBills();
        alert(`Payment of LKR ${amount.toLocaleString('en-LK', {minimumFractionDigits: 2})} recorded successfully!`);
    } catch (e) {
        console.error('Error recording bill payment:', e);
        alert('Failed to record payment: ' + e.message);
    }
};

window.viewBillPaymentHistory = async function (billId) {
    try {
        const bill = await db.payableBills.get(billId);
        if (!bill) return;

        document.getElementById('bph-bill-title').textContent = `${bill.title} (${bill.vendor || 'No Vendor'})`;
        const tbody = document.getElementById('bph-table-body');
        const payments = bill.payments || [];

        if (payments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-gray-400">No payments recorded for this bill.</td></tr>`;
        } else {
            tbody.innerHTML = payments.map(p => `
                <tr class="hover:bg-gray-50 border-b border-gray-100">
                    <td class="px-3 py-2.5 font-mono text-xs">${p.date}</td>
                    <td class="px-3 py-2.5 text-xs font-semibold text-gray-700">${p.method}</td>
                    <td class="px-3 py-2.5 text-xs text-gray-500">${p.note || '-'}</td>
                    <td class="px-3 py-2.5 text-right font-mono font-bold text-xs text-emerald-600">LKR ${parseFloat(p.amount).toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
                    <td class="px-3 py-2.5 text-center">
                        <button onclick="deleteBillPayment(${bill.id}, ${p.id})" class="text-gray-400 hover:text-red-600 p-1" title="Delete payment entry">
                            <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                    </td>
                </tr>`).join('');
        }

        document.getElementById('bill-payment-history-modal').classList.remove('hidden');
    } catch (e) {
        console.error(e);
    }
};

window.closeBillPaymentHistoryModal = function () {
    document.getElementById('bill-payment-history-modal').classList.add('hidden');
};

window.deleteBillPayment = async function (billId, paymentId) {
    if (!confirm('Are you sure you want to delete this payment record?')) return;
    try {
        const bill = await db.payableBills.get(billId);
        if (!bill) return;

        const payments = (bill.payments || []).filter(p => p.id !== paymentId);
        const newPaidTotal = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
        const billTotal = parseFloat(bill.totalAmount) || 0;
        let newStatus = 'Pending';
        if (newPaidTotal >= billTotal) newStatus = 'Paid';
        else if (newPaidTotal > 0) newStatus = 'Partially Paid';

        await db.payableBills.update(billId, {
            payments,
            status: newStatus
        });

        await viewBillPaymentHistory(billId);
        await loadPayableBills();
    } catch (e) {
        console.error('Error deleting payment:', e);
        alert('Failed to delete payment: ' + e.message);
    }
};

window.viewBillAttachment = async function (id) {
    try {
        const bill = await db.payableBills.get(id);
        if (!bill || !bill.attachment) return alert('No attachment found for this bill.');
        viewPdfOrImageBase64(bill.attachment, `Bill Attachment - ${bill.title}`);
    } catch (e) {
        console.error('Error opening bill attachment:', e);
    }
};

window.viewPdfOrImageBase64 = function (base64, title = 'Attachment') {
    if (!base64) return alert('No attachment available.');
    const win = window.open();
    if (base64.startsWith('data:application/pdf') || base64.includes('application/pdf')) {
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head><title>${title}</title></head>
            <body style="margin:0; height:100vh; overflow:hidden; background:#262626;">
                <embed src="${base64}" type="application/pdf" width="100%" height="100%" style="border:none;" />
            </body>
            </html>
        `);
    } else {
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head><title>${title}</title></head>
            <body style="margin:0; background:#18181b; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                <img src="${base64}" style="max-width:92%; max-height:92vh; border-radius:12px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); cursor:pointer;" onclick="window.close()" title="Click to close" />
            </body>
            </html>
        `);
    }
};

// =============================================
// --- 15. All Components / Materials Summary ---
// =============================================

window.showAllComponentsView = async function () {
    document.getElementById('all-components-modal').classList.remove('hidden');
    await loadAllComponentsData();
};

window.closeAllComponentsModal = function () {
    document.getElementById('all-components-modal').classList.add('hidden');
};

window.loadAllComponentsData = async function () {
    const tbody = document.getElementById('all-comp-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="7" class="px-4 py-8 text-center text-gray-400">Loading...</td></tr>';

    try {
        const allProjects = await db.projects.toArray();
        const filterStatus = document.getElementById('comp-filter-status')?.value || 'all';
        const searchQ = document.getElementById('comp-search-input')?.value.toLowerCase() || '';

        let rows = '';
        let grandTotalCost = 0, grandTotalSelling = 0, grandTotalProfit = 0;

        const filteredProjects = allProjects.filter(p => {
            if (filterStatus !== 'all' && p.status !== filterStatus) return false;
            return true;
        });

        filteredProjects.forEach(proj => {
            if (!proj.components || proj.components.length === 0) return;
            proj.components.forEach(c => {
                if (searchQ && !c.name.toLowerCase().includes(searchQ) && !proj.name.toLowerCase().includes(searchQ)) return;
                const qty = parseFloat(c.qty) || 0;
                const costPrice = parseFloat(c.costPrice || c.unitPrice) || 0;
                const sellingPrice = parseFloat(c.sellingPrice || c.unitPrice) || 0;
                const totalCost = qty * costPrice;
                const totalSelling = qty * sellingPrice;
                const itemProfit = totalSelling - totalCost;
                grandTotalCost += totalCost;
                grandTotalSelling += totalSelling;
                grandTotalProfit += itemProfit;

                const statusColors = {
                    'In Progress': 'blue', 'Completed': 'emerald', 'On Hold': 'yellow',
                    'Cancelled': 'red', 'Not Confirmed': 'gray'
                };
                const statusColor = statusColors[proj.status] || 'gray';

                rows += `
                <tr class="hover:bg-gray-50 border-b border-gray-50">
                    <td class="px-4 py-3">
                        <div class="font-semibold text-gray-800 text-sm">${c.name}</div>
                    </td>
                    <td class="px-4 py-3 text-center font-mono text-sm">${qty}</td>
                    <td class="px-4 py-3">
                        <div class="text-xs font-semibold text-gray-700">${proj.name}</div>
                        <div class="text-[10px] text-gray-400 font-mono">${proj.projectID || ''}</div>
                        <span class="text-[9px] font-bold bg-${statusColor}-50 text-${statusColor}-600 px-1.5 py-0.5 rounded-full border border-${statusColor}-100">${proj.status}</span>
                    </td>
                    <td class="px-4 py-3 text-right font-mono text-sm text-gray-600">${costPrice > 0 ? costPrice.toLocaleString('en-LK', {minimumFractionDigits: 2}) : '-'}</td>
                    <td class="px-4 py-3 text-right font-mono text-sm text-gray-700">${sellingPrice > 0 ? sellingPrice.toLocaleString('en-LK', {minimumFractionDigits: 2}) : '-'}</td>
                    <td class="px-4 py-3 text-right font-mono text-sm text-gray-800 font-bold">${totalSelling > 0 ? totalSelling.toLocaleString('en-LK', {minimumFractionDigits: 2}) : '-'}</td>
                    <td class="px-4 py-3 text-right font-mono text-sm font-bold ${itemProfit > 0 ? 'text-emerald-600' : itemProfit < 0 ? 'text-red-500' : 'text-gray-400'}">${itemProfit !== 0 ? itemProfit.toLocaleString('en-LK', {minimumFractionDigits: 2}) : '-'}</td>
                </tr>`;
            });
        });

        if (!rows) {
            tbody.innerHTML = '<tr><td colspan="7" class="px-4 py-10 text-center text-gray-400 italic">No components found matching the filter.</td></tr>';
        } else {
            tbody.innerHTML = rows;
        }

        const fmtLKR = (v) => 'LKR ' + v.toLocaleString('en-LK', {minimumFractionDigits: 2});
        const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
        el('all-comp-total-cost', fmtLKR(grandTotalCost));
        el('all-comp-total-selling', fmtLKR(grandTotalSelling));
        el('all-comp-total-profit', fmtLKR(grandTotalProfit));

    } catch (e) {
        console.error('Error loading components:', e);
        tbody.innerHTML = '<tr><td colspan="7" class="px-4 py-8 text-center text-red-400">Error loading data.</td></tr>';
    }
};

// =============================================
// --- 16. Salary Summary from Expenses ---
// =============================================
window.loadSalarySummaryFromExpenses = async function () {
    const tbody = document.getElementById('salary-expense-summary-body');
    if (!tbody) return;

    try {
        const salaryExpenses = await db.expenses.where('category').anyOf(['Salary', 'Salary Advance']).toArray();
        salaryExpenses.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        if (salaryExpenses.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="py-6 text-center text-gray-400">No salary expenses found.</td></tr>';
            return;
        }

        // Group by person
        const byPerson = {};
        salaryExpenses.forEach(e => {
            const name = e.personName || 'Unknown';
            if (!byPerson[name]) byPerson[name] = { total: 0, count: 0, last: null };
            byPerson[name].total += parseFloat(e.amount) || 0;
            byPerson[name].count++;
            if (!byPerson[name].last || e.date > byPerson[name].last) byPerson[name].last = e.date;
        });

        // Recent list
        tbody.innerHTML = salaryExpenses.slice(0, 50).map(e => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="py-3 px-4 font-mono text-xs">${e.date || '-'}</td>
                <td class="py-3 px-4 font-semibold text-gray-800">${e.personName || '-'}</td>
                <td class="py-3 px-4">
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full ${e.category === 'Salary' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}">
                        ${e.category}
                    </span>
                </td>
                <td class="py-3 px-4 text-xs text-gray-500">${e.description || '-'}</td>
                <td class="py-3 px-4">
                    <span class="text-xs font-bold ${e.paymentMethod === 'Cash' ? 'text-emerald-600' : 'text-blue-600'}">
                        ${e.paymentMethod || '-'}
                    </span>
                </td>
                <td class="py-3 px-4 text-right font-mono font-bold text-gray-900">${parseFloat(e.amount).toLocaleString('en-LK', {minimumFractionDigits: 2})}</td>
            </tr>`).join('');

        // Update totals per person (summary bar)
        const summaryContainer = document.getElementById('salary-person-summary');
        if (summaryContainer) {
            summaryContainer.innerHTML = Object.entries(byPerson).map(([name, data]) => `
                <div class="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-black text-blue-600">
                            ${name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p class="font-bold text-gray-800 text-sm">${name}</p>
                            <p class="text-xs text-gray-400">${data.count} payment${data.count > 1 ? 's' : ''} • Last: ${data.last || '-'}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-blue-700 text-base font-mono">LKR ${data.total.toLocaleString('en-LK', {minimumFractionDigits: 2})}</p>
                        <p class="text-[10px] text-gray-400 font-bold uppercase">Total Paid</p>
                    </div>
                </div>`).join('');
        }

        // Grand total
        const grandTotal = salaryExpenses.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
        const gtEl = document.getElementById('salary-expense-grand-total');
        if (gtEl) gtEl.textContent = 'LKR ' + grandTotal.toLocaleString('en-LK', {minimumFractionDigits: 2});

    } catch (e) {
        console.error('Error loading salary summary:', e);
    }
};

// Populate team member names in salary paysheet form from teamMembers table
window.populateSalaryEmployeeDropdown = async function () {
    try {
        if (!db.teamMembers) return;
        const members = await db.teamMembers.orderBy('name').toArray();
        const list = document.getElementById('salary-employee-datalist');
        if (list) {
            list.innerHTML = members.map(m => `<option value="${m.name}">`).join('');
        }
    } catch (e) { console.error('Error populating salary dropdown:', e); }
};

// ==========================================
// --- 13. 3D Print Job Outsourcing (Fusion 3D) ---
// ==========================================

let currentPrintOrderFilter = 'all';

window.getLivePrintJobUrl = function (order) {
    const orderNo = order.orderNo || `3DP-${order.id}`;
    const base = window.location.origin + window.location.pathname.replace(/\/+$/, '');
    return `${base}?printjob=${encodeURIComponent(orderNo)}`;
};

window.generatePrintOrderNo = async function () {
    try {
        if (!db.printOrders) return '3DP-0001';
        const orders = await db.printOrders.toArray();
        let maxNum = 0;
        orders.forEach(o => {
            if (o.orderNo && o.orderNo.startsWith('3DP-')) {
                const num = parseInt(o.orderNo.replace('3DP-', ''), 10);
                if (!isNaN(num) && num > maxNum) maxNum = num;
            }
        });
        const paddedId = String(maxNum + 1).padStart(4, '0');
        const input = document.getElementById('print-order-no');
        if (input) input.value = `3DP-${paddedId}`;
        return `3DP-${paddedId}`;
    } catch (e) {
        console.error("Error generating print order no:", e);
        return '3DP-0001';
    }
};

window.populatePrintOrderProjectDropdown = async function (selectedId = '') {
    const select = document.getElementById('print-order-project');
    if (!select || !db.projects) return;
    try {
        const projects = await db.projects.orderBy('timestamp').reverse().toArray();
        let html = '<option value="">-- Standalone / Direct Job (No Project) --</option>';
        html += projects.map(p => {
            const label = `${p.projectID ? p.projectID + ' - ' : ''}${p.name} (${p.customerName || 'General'})`;
            const isSel = (String(p.id) === String(selectedId) || (p.projectID && p.projectID === selectedId)) ? 'selected' : '';
            return `<option value="${p.id}" data-name="${(p.name || '').replace(/"/g, '&quot;')}" ${isSel}>${label}</option>`;
        }).join('');
        select.innerHTML = html;
    } catch (e) {
        console.error("Error loading project dropdown for 3D prints:", e);
    }
};

window.currentPrintOrderFiles = [];

// Helper: Format file size
window.formatPrintFileSize = function (bytes) {
    if (!bytes || isNaN(bytes)) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

// Render attached files list in modal
window.renderPrintOrderFilesList = function () {
    const container = document.getElementById('print-order-files-container');
    const list = document.getElementById('print-order-files-list');
    const countEl = document.getElementById('print-order-files-count');
    const sizeEl = document.getElementById('print-order-files-total-size');
    if (!container || !list) return;

    const files = window.currentPrintOrderFiles || [];
    if (countEl) countEl.textContent = files.length;

    if (files.length === 0) {
        container.classList.add('hidden');
        list.innerHTML = '';
        if (sizeEl) sizeEl.textContent = '';
        return;
    }

    container.classList.remove('hidden');
    let totalBytes = 0;

    list.innerHTML = files.map((f, idx) => {
        const sizeNum = f.size || (f.data ? Math.round(f.data.length * 0.75) : 0);
        totalBytes += sizeNum;
        return `
        <div class="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-200 text-xs shadow-2xs">
            <div class="flex items-center gap-2 min-w-0 pr-2">
                <i class="fa-solid fa-cube text-indigo-600 text-sm shrink-0"></i>
                <div class="truncate">
                    <span class="font-bold text-gray-800 font-mono text-[11px] block truncate" title="${(f.name || 'file.stl').replace(/"/g, '&quot;')}">${f.name || 'file.stl'}</span>
                    <span class="text-[10px] text-gray-400 font-mono">${window.formatPrintFileSize(sizeNum)}</span>
                </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
                ${f.data ? `<a href="${f.data}" download="${f.name || 'file.stl'}" class="p-1.5 text-blue-600 hover:text-blue-800 transition-colors" title="Download"><i class="fa-solid fa-download text-xs"></i></a>` : ''}
                <button type="button" onclick="removePrintOrderFile(${idx})" class="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Remove"><i class="fa-solid fa-trash text-xs"></i></button>
            </div>
        </div>
        `;
    }).join('');

    if (sizeEl) {
        sizeEl.textContent = `Total: ${window.formatPrintFileSize(totalBytes)}`;
    }
};

window.removePrintOrderFile = function (index) {
    if (window.currentPrintOrderFiles && window.currentPrintOrderFiles[index] !== undefined) {
        window.currentPrintOrderFiles.splice(index, 1);
        window.renderPrintOrderFilesList();
    }
};

window.handlePrintOrderFilesSelect = async function (input) {
    if (!input || !input.files || input.files.length === 0) return;
    const selectedFiles = Array.from(input.files);

    for (const file of selectedFiles) {
        try {
            const dataBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            window.currentPrintOrderFiles.push({
                name: file.name,
                size: file.size,
                data: dataBase64
            });
        } catch (err) {
            console.error('File read error:', file.name, err);
        }
    }

    // Reset file input so user can add more files again if needed
    input.value = '';

    window.renderPrintOrderFilesList();

    // Check total size
    const totalBytes = window.currentPrintOrderFiles.reduce((acc, f) => acc + (f.size || 0), 0);
    if (totalBytes > 800000) {
        alert(`⚠️ Notice: The total size of attached 3D files is ${(totalBytes / 1024 / 1024).toFixed(2)} MB.\n\nFirestore has a 1 MB limit per document.\nFor large files, please also provide a Google Drive folder link so Fusion 3D can download without restrictions.`);
    }
};

// Modal for viewing & downloading all files of an order from table / card view
window.showPrintOrderFilesModal = async function (orderId) {
    try {
        const order = await db.printOrders.get(parseInt(orderId));
        if (!order) return;

        let files = Array.isArray(order.files) && order.files.length > 0 ? order.files : [];
        if (files.length === 0 && order.fileAttachment) {
            files = [{ name: order.fileName || 'model.stl', data: order.fileAttachment }];
        }

        const modal = document.getElementById('print-order-files-modal');
        const list = document.getElementById('pof-modal-list');
        const title = document.getElementById('pof-modal-title');
        const subtitle = document.getElementById('pof-modal-subtitle');
        if (!modal || !list) return;

        if (title) title.textContent = `Attached 3D Files (${files.length})`;
        if (subtitle) subtitle.textContent = `Order #${order.orderNo || '3DP-' + order.id} - ${order.partName || ''}`;

        if (files.length === 0) {
            list.innerHTML = `<div class="p-6 text-center text-xs text-gray-400">No direct files attached to this order.</div>`;
        } else {
            list.innerHTML = files.map((f, i) => {
                const sz = f.size ? window.formatPrintFileSize(f.size) : '';
                return `
                <div class="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                    <div class="flex items-center gap-3 min-w-0 pr-2">
                        <div class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm shrink-0">
                            <i class="fa-solid fa-cube"></i>
                        </div>
                        <div class="truncate">
                            <p class="font-bold text-gray-800 text-xs truncate" title="${(f.name || 'file.stl').replace(/"/g, '&quot;')}">${f.name || `file_${i + 1}.stl`}</p>
                            ${sz ? `<p class="text-[10px] text-gray-400 font-mono">${sz}</p>` : ''}
                        </div>
                    </div>
                    <a href="${f.data}" download="${f.name || `part_${i + 1}.stl`}"
                        class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm">
                        <i class="fa-solid fa-download text-[11px]"></i> Download
                    </a>
                </div>
                `;
            }).join('');
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } catch (e) {
        console.error(e);
    }
};

window.closePrintOrderFilesModal = function () {
    const modal = document.getElementById('print-order-files-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.openPrintOrderModal = async function (id = null) {
    const modal = document.getElementById('print-order-modal');
    if (!modal) return;

    await window.populatePrintOrderProjectDropdown();

    const formTitle = document.getElementById('print-order-modal-title');
    const submitBtn = document.getElementById('print-order-submit-btn');

    if (id) {
        try {
            const order = await db.printOrders.get(parseInt(id));
            if (!order) return alert('Order not found');

            document.getElementById('print-order-id').value = order.id;
            document.getElementById('print-order-no').value = order.orderNo || '';
            document.getElementById('print-order-project').value = order.projectId || '';
            document.getElementById('print-order-part-name').value = order.partName || '';
            document.getElementById('print-order-vendor').value = order.vendor || 'Fusion 3D';
            document.getElementById('print-order-vendor-phone').value = order.vendorPhone || '0766324205';
            document.getElementById('print-order-material').value = order.material || 'PLA';
            document.getElementById('print-order-color').value = order.color || 'Black';
            document.getElementById('print-order-qty').value = order.quantity || 1;
            document.getElementById('print-order-infill').value = order.infill || '20%';
            document.getElementById('print-order-layer').value = order.layerHeight || '0.2mm (Standard)';
            document.getElementById('print-order-required-date').value = order.requiredDate || '';
            document.getElementById('print-order-required-time').value = order.requiredTime || '';
            document.getElementById('print-order-cost').value = order.cost || '';
            document.getElementById('print-order-drive-link').value = order.driveLink || '';
            document.getElementById('print-order-admin-notes').value = order.adminNotes || '';
            document.getElementById('print-order-partner-notes').value = order.partnerNotes || '';
            document.getElementById('print-order-status').value = order.status || 'Pending Printing';

            // Populate multiple files
            window.currentPrintOrderFiles = Array.isArray(order.files) ? [...order.files] : [];
            if (window.currentPrintOrderFiles.length === 0 && order.fileAttachment) {
                window.currentPrintOrderFiles.push({
                    name: order.fileName || 'model.stl',
                    data: order.fileAttachment,
                    size: order.fileAttachment.length ? Math.round(order.fileAttachment.length * 0.75) : 0
                });
            }
            window.renderPrintOrderFilesList();

            if (formTitle) formTitle.textContent = 'Edit 3D Print Order';
            if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Update Print Order';
        } catch (e) {
            console.error(e);
        }
    } else {
        document.getElementById('print-order-id').value = '';
        await window.generatePrintOrderNo();
        document.getElementById('print-order-project').value = '';
        document.getElementById('print-order-part-name').value = '';
        document.getElementById('print-order-vendor').value = 'Fusion 3D';
        document.getElementById('print-order-vendor-phone').value = '0766324205';
        document.getElementById('print-order-material').value = 'PLA';
        document.getElementById('print-order-color').value = 'Black';
        document.getElementById('print-order-qty').value = 1;
        document.getElementById('print-order-infill').value = '20%';
        document.getElementById('print-order-layer').value = '0.2mm (Standard)';

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('print-order-required-date').value = tomorrow.toLocaleDateString('en-CA');
        document.getElementById('print-order-required-time').value = '17:00';

        document.getElementById('print-order-cost').value = '';
        document.getElementById('print-order-drive-link').value = '';
        document.getElementById('print-order-admin-notes').value = '';
        document.getElementById('print-order-partner-notes').value = '';
        document.getElementById('print-order-status').value = 'Pending Printing';

        window.currentPrintOrderFiles = [];
        window.renderPrintOrderFilesList();

        if (formTitle) formTitle.textContent = 'New 3D Print Order (Fusion 3D)';
        if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Save & Send Order';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closePrintOrderModal = function () {
    const modal = document.getElementById('print-order-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.syncPrintOrderToSupabase = async function (orderData) {
    if (!orderData) return false;
    try {
        const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
        const cfg = typeof window.getSupabaseConfig === 'function' ? window.getSupabaseConfig() : null;
        const idStr = String(orderData.id || orderData.orderNo || '');
        if (!idStr) return false;

        const cleanOrder = { ...orderData, _updatedAt: Date.now() };
        if (cleanOrder.fileAttachment && typeof cleanOrder.fileAttachment === 'string' && cleanOrder.fileAttachment.length > 500000) {
            cleanOrder.fileAttachment = '[Large file omitted from cloud - use Google Drive link]';
        }
        if (Array.isArray(cleanOrder.files)) {
            cleanOrder.files = cleanOrder.files.map(f => {
                if (f && f.data && typeof f.data === 'string' && f.data.length > 500000) {
                    return { name: f.name || 'file', size: f.size || 0, data: '[Large file omitted from cloud - use Google Drive link]' };
                }
                return f;
            });
        }

        const payload = {
            id: idStr,
            data: cleanOrder,
            updated_at: Date.now()
        };

        if (client) {
            await client.from('kutuss_printorders').upsert(payload, { onConflict: 'id' });
            if (orderData.orderNo && String(orderData.orderNo) !== idStr) {
                await client.from('kutuss_printorders').upsert({
                    id: String(orderData.orderNo),
                    data: cleanOrder,
                    updated_at: Date.now()
                }, { onConflict: 'id' });
            }
            return true;
        }

        if (cfg && cfg.url && cfg.anonKey) {
            const headers = {
                'apikey': cfg.anonKey,
                'Authorization': `Bearer ${cfg.anonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            };
            await fetch(`${cfg.url}/rest/v1/kutuss_printorders`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });
            return true;
        }
        return false;
    } catch (e) {
        console.warn('syncPrintOrderToSupabase error:', e);
        return false;
    }
};
window.syncPrintOrderToFirebase = window.syncPrintOrderToSupabase;

window.handlePrintOrderSubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('print-order-id').value;
    const orderNo = document.getElementById('print-order-no').value.trim() || await window.generatePrintOrderNo();
    const projSelect = document.getElementById('print-order-project');
    const projectId = projSelect ? projSelect.value : '';
    const projectName = projSelect && projSelect.selectedIndex > 0 ? (projSelect.options[projSelect.selectedIndex].getAttribute('data-name') || projSelect.options[projSelect.selectedIndex].text) : '';
    const partName = document.getElementById('print-order-part-name').value.trim();
    const vendor = document.getElementById('print-order-vendor').value.trim() || 'Fusion 3D';
    const vendorPhone = document.getElementById('print-order-vendor-phone').value.trim();
    const material = document.getElementById('print-order-material').value;
    const color = document.getElementById('print-order-color').value.trim() || 'Black';
    const quantity = parseInt(document.getElementById('print-order-qty').value, 10) || 1;
    const infill = document.getElementById('print-order-infill').value.trim() || '20%';
    const layerHeight = document.getElementById('print-order-layer').value.trim() || '0.2mm';
    const requiredDate = document.getElementById('print-order-required-date').value;
    const requiredTime = document.getElementById('print-order-required-time').value;
    const cost = parseFloat(document.getElementById('print-order-cost').value) || 0;
    const driveLink = document.getElementById('print-order-drive-link').value.trim();
    const adminNotes = document.getElementById('print-order-admin-notes').value.trim();
    const partnerNotes = document.getElementById('print-order-partner-notes').value.trim();
    const status = document.getElementById('print-order-status').value || 'Pending Printing';

    if (!partName) {
        alert('Please enter a Part / Item Name');
        return;
    }

    const filesToSave = Array.isArray(window.currentPrintOrderFiles) ? window.currentPrintOrderFiles : [];
    const primaryFile = filesToSave[0] || null;

    const todayStr = new Date().toLocaleDateString('en-CA');
    const orderData = {
        orderNo,
        projectId,
        projectName,
        partName,
        vendor,
        vendorPhone,
        material,
        color,
        quantity,
        infill,
        layerHeight,
        requiredDate,
        requiredTime,
        cost,
        driveLink,
        files: filesToSave,
        fileAttachment: primaryFile ? primaryFile.data : null,
        fileName: primaryFile ? primaryFile.name : null,
        adminNotes,
        partnerNotes,
        status,
        timestamp: id ? ((await db.printOrders.get(parseInt(id)))?.timestamp || Date.now()) : Date.now(),
        monthYear: requiredDate ? requiredDate.substring(0, 7) : todayStr.substring(0, 7),
        completedAt: (status === 'Finish' || status === 'Finished') ? Date.now() : null
    };

    let savedId = id ? parseInt(id) : null;
    if (id) {
        orderData.id = parseInt(id);
        await db.printOrders.put(orderData);
        await window.syncPrintOrderToSupabase(orderData);
        alert('3D Print Order updated successfully!');
    } else {
        const lastOrder = await db.printOrders.orderBy('id').last();
        const nextId = (lastOrder && typeof lastOrder.id === 'number' && !isNaN(lastOrder.id)) ? lastOrder.id + 1 : 1;
        orderData.id = nextId;
        savedId = nextId;
        await db.printOrders.put(orderData);
        await window.syncPrintOrderToSupabase(orderData);
        alert(`3D Print Order ${orderNo} registered successfully!`);
    }

    window.closePrintOrderModal();
    window.loadPrintOrders(currentPrintOrderFilter);

    if (!id && confirm(`Do you want to send this order to ${vendor} via WhatsApp right now?`)) {
        window.sendPrintOrderWA(savedId);
    }
};

window.loadPrintOrders = async function (filterStatus = currentPrintOrderFilter) {
    currentPrintOrderFilter = filterStatus;
    const tableBody = document.getElementById('print-orders-table-body');
    const cardsContainer = document.getElementById('print-orders-cards-container');
    if (!tableBody && !cardsContainer) return;

    try {
        if (!db.printOrders) return;
        const allOrders = await db.printOrders.orderBy('timestamp').reverse().toArray();

        let pendingCount = 0;
        let printingCount = 0;
        let finishedCount = 0;

        allOrders.forEach(o => {
            const st = (o.status || '').toLowerCase();
            if (st.includes('finish') || st.includes('complete')) {
                finishedCount++;
            } else if (st.includes('now') || st.includes('progress')) {
                printingCount++;
            } else {
                pendingCount++;
            }
        });

        const statTotal = document.getElementById('print-stat-total');
        const statPending = document.getElementById('print-stat-pending');
        const statPrinting = document.getElementById('print-stat-printing');
        const statFinished = document.getElementById('print-stat-finished');
        const navBadge = document.getElementById('badge-pending-prints');

        if (statTotal) statTotal.textContent = allOrders.length;
        if (statPending) statPending.textContent = pendingCount;
        if (statPrinting) statPrinting.textContent = printingCount;
        if (statFinished) statFinished.textContent = finishedCount;

        if (navBadge) {
            const activeCount = pendingCount + printingCount;
            if (activeCount > 0) {
                navBadge.textContent = activeCount;
                navBadge.classList.remove('hidden');
            } else {
                navBadge.classList.add('hidden');
            }
        }

        const filtered = allOrders.filter(o => {
            if (filterStatus === 'all') return true;
            const st = (o.status || '').toLowerCase();
            if (filterStatus === 'pending') return (!st.includes('finish') && !st.includes('now') && !st.includes('progress'));
            if (filterStatus === 'printing') return (st.includes('now') || st.includes('progress'));
            if (filterStatus === 'finished') return (st.includes('finish') || st.includes('complete'));
            return true;
        });

        if (tableBody) {
            if (filtered.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-12 text-center text-gray-400 font-medium">No 3D print orders found.</td></tr>`;
            } else {
                tableBody.innerHTML = filtered.map(o => {
                    const st = (o.status || '').toLowerCase();
                    let badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    let badgeIcon = 'fa-clock';
                    let statusLabel = 'Pending Printing';

                    if (st.includes('finish') || st.includes('complete')) {
                        badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                        badgeIcon = 'fa-circle-check';
                        statusLabel = 'Finished';
                    } else if (st.includes('now') || st.includes('progress')) {
                        badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                        badgeIcon = 'fa-spinner fa-spin';
                        statusLabel = 'Printing Now';
                    }

                    let deadlineHtml = '-';
                    if (o.requiredDate) {
                        const targetStr = o.requiredTime ? `${o.requiredDate} ${o.requiredTime}` : o.requiredDate;
                        const isOverdue = new Date(targetStr) < new Date() && statusLabel !== 'Finished';
                        deadlineHtml = `
                            <div class="${isOverdue ? 'text-red-600 font-bold' : 'text-gray-700'} text-xs">
                                <i class="fa-regular fa-clock text-[10px]"></i> ${o.requiredDate}
                                ${o.requiredTime ? `<span class="font-mono text-gray-500">at ${o.requiredTime}</span>` : ''}
                                ${isOverdue ? '<span class="ml-1 px-1.5 py-0.5 rounded text-[9px] bg-red-100 text-red-700 font-black">OVERDUE</span>' : ''}
                            </div>
                        `;
                    }

                    let files = Array.isArray(o.files) && o.files.length > 0 ? o.files : (o.fileAttachment ? [{ name: o.fileName || 'part.stl', data: o.fileAttachment }] : []);
                    let fileBtnHtml = '<span class="text-gray-300">-</span>';

                    if (files.length > 1) {
                        fileBtnHtml = `
                            <div class="flex items-center justify-center gap-1.5 flex-wrap">
                                <button onclick="showPrintOrderFilesModal(${o.id})" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200" title="View all ${files.length} attached files">
                                    <i class="fa-solid fa-layer-group"></i> ${files.length} Files
                                </button>
                                ${o.driveLink ? `<a href="${o.driveLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-all border border-amber-200" title="Open Google Drive Files"><i class="fa-brands fa-google-drive"></i></a>` : ''}
                            </div>
                        `;
                    } else if (files.length === 1) {
                        fileBtnHtml = `
                            <div class="flex items-center justify-center gap-1.5 flex-wrap">
                                <a href="${files[0].data}" download="${files[0].name || 'part.stl'}" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all border border-blue-200" title="Download ${files[0].name || 'STL File'}">
                                    <i class="fa-solid fa-download"></i> STL
                                </a>
                                ${o.driveLink ? `<a href="${o.driveLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-all border border-amber-200" title="Open Google Drive Files"><i class="fa-brands fa-google-drive"></i></a>` : ''}
                            </div>
                        `;
                    } else if (o.driveLink) {
                        fileBtnHtml = `<a href="${o.driveLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition-all border border-amber-200" title="Open Google Drive Files"><i class="fa-brands fa-google-drive"></i> Drive</a>`;
                    }

                    return `
                    <tr class="hover:bg-gray-50/80 transition-colors border-b border-gray-100">
                        <td class="px-6 py-4">
                            <span class="font-mono font-bold text-gray-900 text-xs">${o.orderNo || '3DP-' + o.id}</span>
                            <div class="text-[11px] text-gray-400 mt-0.5">${o.vendor || 'Fusion 3D'}</div>
                        </td>
                        <td class="px-6 py-4">
                            <p class="font-bold text-gray-800 text-sm">${o.partName || '-'}</p>
                            ${o.projectName ? `<p class="text-xs text-brand-600 mt-0.5"><i class="fa-solid fa-diagram-project text-[10px]"></i> ${o.projectName}</p>` : ''}
                        </td>
                        <td class="px-6 py-4 text-xs text-gray-600">
                            <div><strong class="text-gray-900 font-bold">${o.quantity || 1} pcs</strong> • ${o.material || 'PLA'} (${o.color || 'Standard'})</div>
                            <div class="text-[11px] text-gray-400 mt-0.5">Infill: ${o.infill || '20%'} | Layer: ${o.layerHeight || '0.2mm'}</div>
                        </td>
                        <td class="px-6 py-4">
                            ${deadlineHtml}
                        </td>
                        <td class="px-6 py-4 text-center">
                            ${fileBtnHtml}
                        </td>
                        <td class="px-6 py-4">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}">
                                <i class="fa-solid ${badgeIcon}"></i> <span>${statusLabel}</span>
                            </span>
                            ${o.partnerNotes ? `<div class="text-[11px] text-blue-600 font-medium mt-1 truncate max-w-[180px]" title="Fusion 3D: ${o.partnerNotes.replace(/"/g, '&quot;')}"><i class="fa-solid fa-comment-dots text-[10px]"></i> ${o.partnerNotes}</div>` : ''}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-1.5">
                                <button onclick="sendPrintOrderWA(${o.id})" class="p-1.5 text-emerald-600 hover:text-emerald-800 transition-colors" title="Send Order via WhatsApp">
                                    <i class="fa-brands fa-whatsapp text-base"></i>
                                </button>
                                <button onclick="copyPrintOrderLink(${o.id})" class="p-1.5 text-blue-500 hover:text-blue-700 transition-colors" title="Copy Partner Portal Link">
                                    <i class="fa-solid fa-link text-sm"></i>
                                </button>
                                <button onclick="openPrintOrderModal(${o.id})" class="p-1.5 text-brand-600 hover:text-brand-800 transition-colors" title="Edit Order">
                                    <i class="fa-solid fa-pen-to-square text-sm"></i>
                                </button>
                                <button onclick="deletePrintOrder(${o.id})" class="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                    <i class="fa-solid fa-trash text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
                }).join('');
            }
        }

        if (cardsContainer) {
            if (filtered.length === 0) {
                cardsContainer.innerHTML = `<div class="p-8 text-center text-gray-400 text-sm">No 3D print orders found.</div>`;
            } else {
                cardsContainer.innerHTML = filtered.map(o => {
                    const st = (o.status || '').toLowerCase();
                    let badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    let badgeIcon = 'fa-clock';
                    let statusLabel = 'Pending Printing';

                    if (st.includes('finish') || st.includes('complete')) {
                        badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                        badgeIcon = 'fa-circle-check';
                        statusLabel = 'Finished';
                    } else if (st.includes('now') || st.includes('progress')) {
                        badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                        badgeIcon = 'fa-spinner fa-spin';
                        statusLabel = 'Printing Now';
                    }

                    const cardFiles = Array.isArray(o.files) && o.files.length > 0 ? o.files : (o.fileAttachment ? [{ name: o.fileName || 'part.stl', data: o.fileAttachment }] : []);
                    let cardFilesHtml = '';
                    if (cardFiles.length > 1) {
                        cardFilesHtml = `<button onclick="showPrintOrderFilesModal(${o.id})" class="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200"><i class="fa-solid fa-layer-group"></i> ${cardFiles.length} Files</button>`;
                    } else if (cardFiles.length === 1) {
                        cardFilesHtml = `<a href="${cardFiles[0].data}" download="${cardFiles[0].name || 'part.stl'}" class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 truncate max-w-[120px]" title="${cardFiles[0].name || 'part.stl'}"><i class="fa-solid fa-download"></i> STL</a>`;
                    }

                    return `
                    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <span class="font-mono font-bold text-gray-900 text-xs">${o.orderNo || '3DP-' + o.id}</span>
                                <h4 class="font-bold text-gray-800 text-base mt-0.5">${o.partName || '-'}</h4>
                                ${o.projectName ? `<p class="text-xs text-brand-600 mt-0.5"><i class="fa-solid fa-diagram-project"></i> ${o.projectName}</p>` : ''}
                            </div>
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}">
                                <i class="fa-solid ${badgeIcon}"></i> ${statusLabel}
                            </span>
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <div><strong>Qty:</strong> ${o.quantity || 1} pcs</div>
                            <div><strong>Material:</strong> ${o.material || 'PLA'}</div>
                            <div><strong>Color:</strong> ${o.color || 'Standard'}</div>
                            <div><strong>Infill:</strong> ${o.infill || '20%'}</div>
                        </div>
                        ${o.requiredDate ? `
                        <div class="text-xs text-gray-700 flex items-center gap-1.5">
                            <i class="fa-regular fa-clock text-amber-500"></i>
                            <span>Needed by: <strong>${o.requiredDate}</strong> ${o.requiredTime ? `at ${o.requiredTime}` : ''}</span>
                        </div>
                        ` : ''}
                        ${o.partnerNotes ? `
                        <div class="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900">
                            <strong><i class="fa-solid fa-comment-dots"></i> Fusion 3D Note:</strong> ${o.partnerNotes}
                        </div>
                        ` : ''}
                        <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div class="flex gap-2">
                                ${o.driveLink ? `<a href="${o.driveLink}" target="_blank" class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200"><i class="fa-brands fa-google-drive"></i> Drive</a>` : ''}
                                ${cardFilesHtml}
                            </div>
                            <div class="flex gap-1.5">
                                <button onclick="sendPrintOrderWA(${o.id})" class="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"><i class="fa-brands fa-whatsapp text-base"></i></button>
                                <button onclick="copyPrintOrderLink(${o.id})" class="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><i class="fa-solid fa-link text-sm"></i></button>
                                <button onclick="openPrintOrderModal(${o.id})" class="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"><i class="fa-solid fa-pen text-sm"></i></button>
                                <button onclick="deletePrintOrder(${o.id})" class="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><i class="fa-solid fa-trash text-sm"></i></button>
                            </div>
                        </div>
                    </div>
                    `;
                }).join('');
            }
        }

    } catch (e) {
        console.error("Error loading print orders:", e);
    }
};

window.filterPrintOrders = function (status) {
    document.querySelectorAll('.print-order-tab-btn').forEach(btn => {
        btn.classList.remove('bg-brand-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-50');
    });
    const activeTab = document.getElementById(`print-tab-${status}`);
    if (activeTab) {
        activeTab.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-50');
        activeTab.classList.add('bg-brand-600', 'text-white', 'shadow-md');
    }
    window.loadPrintOrders(status);
};

window.sendPrintOrderWA = async function (id) {
    const waWindow = window.open('', '_blank');
    try {
        const order = await db.printOrders.get(parseInt(id));
        if (!order) { waWindow.close(); return; }

        const liveUrl = window.getLivePrintJobUrl(order);
        const orderNo = order.orderNo || `3DP-${order.id}`;
        const targetDateTime = (order.requiredDate ? order.requiredDate : '') + (order.requiredTime ? ` at ${order.requiredTime}` : '');

        const files = Array.isArray(order.files) && order.files.length > 0 ? order.files : (order.fileAttachment ? [{ name: order.fileName || 'part.stl', data: order.fileAttachment }] : []);
        let filesText = '';
        if (files.length > 0) {
            filesText = `📁 *Attached 3D Files (${files.length}):*\n` + files.map((f, i) => `  ${i + 1}. ${f.name || 'Model file'}`).join('\n') + '\n\n';
        }

        let msg = `*3D PRINT ORDER - ${orderNo}* 🖨️\n` +
            `*Kutuss Design Lab (Pvt) Ltd*\n\n` +
            `Hi *${order.vendor || 'Fusion 3D'}*,\n` +
            `Here are the specifications for our new 3D printing order:\n\n` +
            `📦 *Part / Item:* ${order.partName || '-'}\n` +
            (order.projectName ? `🏷️ *Project:* ${order.projectName}\n` : '') +
            `🔢 *Quantity:* ${order.quantity || 1} pcs\n` +
            `🧵 *Material:* ${order.material || 'PLA'} (${order.color || 'Standard'})\n` +
            `⚙️ *Infill & Layer:* ${order.infill || '20%'} | ${order.layerHeight || '0.2mm'}\n` +
            (targetDateTime ? `⏰ *Target Completion:* ${targetDateTime}\n\n` : '\n') +
            filesText +
            (order.adminNotes ? `📝 *Admin Note:* ${order.adminNotes}\n\n` : '') +
            `👉 *View Order, Download 3D / STL Files & Update Status Online:*\n` +
            `${liveUrl}\n\n` +
            (order.driveLink ? `📁 *Direct Google Drive Link:* ${order.driveLink}\n\n` : '') +
            `Please update the status on the link once printing starts. Thank you!\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n` +
            `Hotline: 077-88 99 312`;

        const phone = order.vendorPhone || '0766324205';
        shareToWhatsApp(phone, msg, waWindow);
    } catch (e) {
        console.error(e);
        waWindow.close();
    }
};

window.copyPrintOrderLink = async function (id) {
    try {
        const order = await db.printOrders.get(parseInt(id));
        if (!order) return alert('Order not found');
        const url = window.getLivePrintJobUrl(order);
        await navigator.clipboard.writeText(url);
        alert(`Copied 3D Print Job Link for Fusion 3D:\n${url}`);
    } catch (e) {
        console.error(e);
    }
};

window.deletePrintOrder = async function (id) {
    if (!confirm('Are you sure you want to delete this 3D print order?')) return;
    try {
        const numId = parseInt(id, 10);
        const delKey = !isNaN(numId) ? numId : id;
        const existing = await db.printOrders.get(delKey);
        await db.printOrders.delete(delKey);

        // Mark tombstone immediately
        try {
            const tombstones = JSON.parse(localStorage.getItem('kutuss_deleted_records') || '{}');
            tombstones[`printOrders:${delKey}`] = Date.now();
            if (existing && existing.orderNo) {
                tombstones[`printOrders:${existing.orderNo}`] = Date.now();
            }
            localStorage.setItem('kutuss_deleted_records', JSON.stringify(tombstones));
        } catch (e) { }

        // Remove from vendor orders cache
        try {
            const cachedRaw = localStorage.getItem('kutuss_vendor_orders_cache');
            if (cachedRaw) {
                const cached = JSON.parse(cachedRaw);
                if (Array.isArray(cached)) {
                    const filtered = cached.filter(o => String(o.id) !== String(delKey) && (!existing || !existing.orderNo || String(o.orderNo) !== String(existing.orderNo)));
                    localStorage.setItem('kutuss_vendor_orders_cache', JSON.stringify(filtered));
                }
            }
        } catch (e) { }

        // If no more orders in Dexie, clear cache entirely
        const remaining = await db.printOrders.count();
        if (remaining === 0) {
            localStorage.setItem('kutuss_vendor_orders_cache', '[]');
        }

        // Direct Cloud Delete
        if (typeof window.deleteCloudRecord === 'function') {
            window.deleteCloudRecord('printOrders', delKey, existing ? existing.orderNo : null);
        }

        window.loadPrintOrders(currentPrintOrderFilter);
    } catch (e) {
        console.error(e);
    }
};

window.getVendorPortalUrl = function (vendorName = 'Fusion 3D') {
    const origin = window.location.origin + window.location.pathname;
    return `${origin}?vendor=${encodeURIComponent(vendorName)}`;
};

window.copyVendorPortalLink = async function (vendorName = 'Fusion 3D') {
    const url = window.getVendorPortalUrl(vendorName);
    try {
        await navigator.clipboard.writeText(url);
        alert(`Copied ${vendorName} All-Jobs Hub Link:\n${url}\n\nFusion 3D can open this single link to see all their jobs!`);
    } catch (e) {
        prompt(`Copy ${vendorName} All-Jobs Link:`, url);
    }
};

window.shareVendorPortalWA = async function (vendorName = 'Fusion 3D') {
    const waWindow = window.open('', '_blank');
    try {
        const url = window.getVendorPortalUrl(vendorName);
        let vendorPhone = '0766324205';

        if (db.printOrders) {
            const all = await db.printOrders.toArray();
            const matched = all.reverse().find(o => o.vendor && o.vendor.toLowerCase().includes(vendorName.toLowerCase()));
            if (matched && matched.vendorPhone) vendorPhone = matched.vendorPhone;
        }

        const msg = `*3D PRINTING JOBS DASHBOARD* 🖨️\n` +
            `*Kutuss Design Lab (Pvt) Ltd*\n\n` +
            `Hi *${vendorName}*,\n` +
            `Here is your dedicated live workshop link to view and manage *all 3D printing orders* assigned to you in one place:\n\n` +
            `👉 *Open All-Jobs Workshop Portal:*\n` +
            `${url}\n\n` +
            `From this link, you can:\n` +
            `• View all active & completed jobs\n` +
            `• Download 3D STL / 3MF files & open Google Drive folders\n` +
            `• Check target completion dates & times\n` +
            `• Update live status (Pending, Printing Now, Finish)\n` +
            `• Leave notes and progress updates\n\n` +
            `*Kutuss Design Lab (Pvt) Ltd* 🖌️\n` +
            `Hotline: 077-88 99 312`;

        shareToWhatsApp(vendorPhone, msg, waWindow);
    } catch (e) {
        console.error(e);
        waWindow.close();
    }
};



