const defaultCategories = {
    chi: ['Ăn uống', 'Mỹ phẩm', 'Tiền nhà', 'Tiền điện/nước', 'Di chuyển', 'Mua sắm', 'Khác'],
    thu: ['Tiền lương', 'Tiền thưởng', 'Phụ cấp', 'Khác']
};

export const state = {
    txType: 'chi',
    transactions: [],
    budgets: {},
    categories: { ...defaultCategories },
    activeTheme: 'teal',
    activeThemeHex: '#0d9488',
    currentLang: 'vi',
    currentCurrency: 'đ',
    warnOrange: 80,
    warnRed: 100,
    currentDate: new Date(),
    reportChart: null,
    currentDisplayIncome: 0,
    currentDisplayExpense: 0,
    currentDisplayBalance: 0,
};

export function loadState() {
    const raw = localStorage.getItem('smart_wallet_txs');
    if (raw) state.transactions = JSON.parse(raw);

    const rawBudgets = localStorage.getItem('smart_wallet_budgets');
    if (rawBudgets) state.budgets = JSON.parse(rawBudgets);

    const rawCats = localStorage.getItem('smart_wallet_cats');
    if (rawCats) state.categories = JSON.parse(rawCats);

    state.activeTheme = localStorage.getItem('smart_wallet_theme') || 'teal';
    state.activeThemeHex = localStorage.getItem('smart_wallet_hex') || '#0d9488';
    state.currentLang = localStorage.getItem('smart_wallet_lang') || 'vi';
    state.currentCurrency = localStorage.getItem('smart_wallet_currency') || 'đ';
    state.warnOrange = parseInt(localStorage.getItem('smart_wallet_warn_orange')) || 80;
    state.warnRed = parseInt(localStorage.getItem('smart_wallet_warn_red')) || 100;
}

export const LS_KEYS = {
    TXS: 'smart_wallet_txs',
    BUDGETS: 'smart_wallet_budgets',
    CATS: 'smart_wallet_cats',
    THEME: 'smart_wallet_theme',
    HEX: 'smart_wallet_hex',
    LANG: 'smart_wallet_lang',
    CURRENCY: 'smart_wallet_currency',
    WARN_ORANGE: 'smart_wallet_warn_orange',
    WARN_RED: 'smart_wallet_warn_red',
};
