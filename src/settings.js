import { state, LS_KEYS } from './state.js';
import { langDict } from './lang.js';
import { loadFormCategories, setTxType } from './transactions.js';
import { loadBudgetSelector } from './budget.js';

export function renderSettingsCategoryList() {
    const type = document.getElementById('sett-cat-type').value;
    const container = document.getElementById('sett-cat-list');
    container.innerHTML = '';

    (state.categories[type] || []).forEach(cat => {
        let badge = document.createElement('span');
        badge.className = "inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-300 shadow-sm";
        const isSystemKeyword = ['Khác', 'Other'].includes(cat);

        badge.innerHTML = `
            <span>${cat}</span>
            ${!isSystemKeyword ? `<button onclick="deleteConfigCategory('${type}', '${cat}')" class="text-slate-500 hover:text-rose-400 font-bold ml-0.5 transition-colors cursor-pointer"><i class="fa-solid fa-xmark"></i></button>` : ''}
        `;
        container.appendChild(badge);
    });
}

export function addCustomConfigCategory() {
    const type = document.getElementById('sett-cat-type').value;
    const input = document.getElementById('sett-cat-new-name');
    const name = input.value.trim();

    if (!name) return;

    if (!state.categories[type].includes(name)) {
        const keywordIndex = state.categories[type].findIndex(c => ['Khác', 'Other'].includes(c));
        if (keywordIndex !== -1) {
            state.categories[type].splice(keywordIndex, 0, name);
        } else {
            state.categories[type].push(name);
        }

        localStorage.setItem(LS_KEYS.CATS, JSON.stringify(state.categories));
        input.value = '';
        renderSettingsCategoryList();
        loadBudgetSelector();
        setTxType(state.txType);
    }
}

export function deleteConfigCategory(type, catName) {
    state.categories[type] = state.categories[type].filter(c => c !== catName);
    localStorage.setItem(LS_KEYS.CATS, JSON.stringify(state.categories));
    renderSettingsCategoryList();
    loadBudgetSelector();
    setTxType(state.txType);
}

export function exportDataToJSON() {
    const backupData = {
        transactions: state.transactions, budgets: state.budgets, categories: state.categories,
        warnOrange: state.warnOrange, warnRed: state.warnRed, theme: state.activeTheme, themeHex: state.activeThemeHex,
        currency: state.currentCurrency, lang: state.currentLang
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `smart_wallet_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

export function importDataFromJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const parsedData = JSON.parse(e.target.result);
            if (parsedData.transactions) {
                state.transactions = parsedData.transactions;
                state.budgets = parsedData.budgets || {};
                state.categories = parsedData.categories || { chi: ['Ăn uống', 'Mỹ phẩm', 'Tiền nhà', 'Tiền điện/nước', 'Di chuyển', 'Mua sắm', 'Khác'], thu: ['Tiền lương', 'Tiền thưởng', 'Phụ cấp', 'Khác'] };
                state.warnOrange = parsedData.warnOrange || 80;
                state.warnRed = parsedData.warnRed || 100;
                state.activeTheme = parsedData.theme || 'teal';
                state.activeThemeHex = parsedData.themeHex || '#0d9488';
                state.currentCurrency = parsedData.currency || 'đ';
                state.currentLang = parsedData.lang || 'vi';

                localStorage.setItem(LS_KEYS.TXS, JSON.stringify(state.transactions));
                localStorage.setItem(LS_KEYS.BUDGETS, JSON.stringify(state.budgets));
                localStorage.setItem(LS_KEYS.CATS, JSON.stringify(state.categories));
                localStorage.setItem(LS_KEYS.WARN_ORANGE, state.warnOrange);
                localStorage.setItem(LS_KEYS.WARN_RED, state.warnRed);
                localStorage.setItem(LS_KEYS.THEME, state.activeTheme);
                localStorage.setItem(LS_KEYS.HEX, state.activeThemeHex);
                localStorage.setItem(LS_KEYS.CURRENCY, state.currentCurrency);
                localStorage.setItem(LS_KEYS.LANG, state.currentLang);

                alert(langDict[state.currentLang].alertImportSuccess);
                window.location.reload();
            } else {
                alert(langDict[state.currentLang].alertImportFail);
            }
        } catch (err) {
            alert(langDict[state.currentLang].alertImportFail);
        }
    };
    reader.readAsText(file);
}

export function changeTheme(themeName, hexColor) {
    state.activeTheme = themeName;
    state.activeThemeHex = hexColor;
    localStorage.setItem(LS_KEYS.THEME, themeName);
    localStorage.setItem(LS_KEYS.HEX, hexColor);
    applyTheme();
}

export function applyTheme() {
    document.getElementById('app-header').style.backgroundColor = state.activeThemeHex + 'cc';
    document.getElementById('btn-submit-form').style.backgroundColor = state.activeThemeHex;
    document.getElementById('btn-save-modal').style.backgroundColor = state.activeThemeHex;
    document.querySelectorAll('.header-icon-color').forEach(el => el.style.color = state.activeThemeHex);
    document.querySelectorAll('.modal-icon-color').forEach(el => el.style.color = state.activeThemeHex);
    document.querySelectorAll('.btn-theme-color').forEach(el => el.style.backgroundColor = state.activeThemeHex);

    const activeTabId = document.querySelector('.tab-content.active').id;

    document.querySelectorAll('.nav-btn').forEach(el => {
        if (el.id === 'nav-' + activeTabId) {
            el.style.color = state.activeThemeHex;
        } else {
            el.style.color = '';
        }
    });
}

export function clearAllData() {
    if (confirm(langDict[state.currentLang].alertClearConf)) {
        localStorage.clear();
        alert(langDict[state.currentLang].alertCleaned);
        window.location.reload();
    }
}

export function saveWarningThresholds() {
    state.warnOrange = parseInt(document.getElementById('sett-warn-orange').value) || 80;
    state.warnRed = parseInt(document.getElementById('sett-warn-red').value) || 100;
    localStorage.setItem(LS_KEYS.WARN_ORANGE, state.warnOrange);
    localStorage.setItem(LS_KEYS.WARN_RED, state.warnRed);
}
