const defaultCategories = {
    chi: ['Ăn uống', 'Mỹ phẩm', 'Tiền nhà', 'Tiền điện/nước', 'Di chuyển', 'Mua sắm', 'Khác'],
    thu: ['Tiền lương', 'Tiền thưởng', 'Phụ cấp', 'Khác']
};

export const TX_PAGE_SIZE = 8;

export const state = {
    txType: 'chi',
    transactions: [],
    budgets: {},
    categories: { ...defaultCategories },
    activeTheme: 'teal',
    activeThemeHex: '#0d9488',
    currentLang: 'vi',
    currentCurrency: 'đ',
    isDarkMode: true,
    warnOrange: 80,
    warnRed: 100,
    currentDate: new Date(),
    reportChart: null,
    txDisplayLimit: TX_PAGE_SIZE,
    currentDisplayIncome: 0,
    currentDisplayExpense: 0,
    currentDisplayBalance: 0,
};

export function loadState() {
    const raw = localStorage.getItem(LS_KEYS.TXS);
    if (raw) state.transactions = JSON.parse(raw);

    const rawBudgets = localStorage.getItem(LS_KEYS.BUDGETS);
    if (rawBudgets) state.budgets = JSON.parse(rawBudgets);

    const rawCats = localStorage.getItem(LS_KEYS.CATS);
    if (rawCats) state.categories = JSON.parse(rawCats);

    state.activeTheme = localStorage.getItem(LS_KEYS.THEME) || 'teal';
    state.activeThemeHex = localStorage.getItem(LS_KEYS.HEX) || '#0d9488';
    state.currentLang = localStorage.getItem(LS_KEYS.LANG) || 'vi';
    state.currentCurrency = localStorage.getItem(LS_KEYS.CURRENCY) || 'đ';
    state.isDarkMode = localStorage.getItem(LS_KEYS.DARKMODE) !== 'false';
    state.warnOrange = parseInt(localStorage.getItem(LS_KEYS.WARN_ORANGE)) || 80;
    state.warnRed = parseInt(localStorage.getItem(LS_KEYS.WARN_RED)) || 100;
}

export const LS_KEYS = {
    TXS: 'smart_wallet_txs',
    BUDGETS: 'smart_wallet_budgets',
    CATS: 'smart_wallet_cats',
    THEME: 'smart_wallet_theme',
    HEX: 'smart_wallet_hex',
    LANG: 'smart_wallet_lang',
    CURRENCY: 'smart_wallet_currency',
    DARKMODE: 'smart_wallet_darkmode',
    WARN_ORANGE: 'smart_wallet_warn_orange',
    WARN_RED: 'smart_wallet_warn_red',
};
