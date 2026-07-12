import './style.css';
import { state, loadState } from './state.js';
import { applyLocalization } from './lang.js';
import { switchTab, toggleDarkMode, applyLightDarkModeStyles, goHome, showSuccessToast } from './ui.js';
import {
    setTxType, addTransaction, checkCustomCategory,
    openEditModal, closeEditModal, updateTransaction,
    deleteTx, renderAll, loadMoreTx, onSearchInput
} from './transactions.js';
import { changeMonth, renderCalendar } from './calendar.js';
import { renderReport } from './report.js';
import {
    loadBudgetSelector, checkBudgetCustomCategory,
    saveBudget, deleteBudget, renderBudgetTab
} from './budget.js';
import {
    renderSettingsCategoryList, addCustomConfigCategory,
    deleteConfigCategory, exportDataToJSON, importDataFromJSON,
    changeTheme, applyTheme, clearAllData, saveWarningThresholds
} from './settings.js';

window.goHome = goHome;
window.switchTab = switchTab;
window.toggleDarkMode = toggleDarkMode;
window.setTxType = setTxType;
window.addTransaction = addTransaction;
window.checkCustomCategory = checkCustomCategory;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.updateTransaction = updateTransaction;
window.deleteTx = deleteTx;
window.renderAll = renderAll;
window.loadMoreTx = loadMoreTx;
window.onSearchInput = onSearchInput;
window.changeMonth = changeMonth;
window.renderReport = renderReport;
window.loadBudgetSelector = loadBudgetSelector;
window.checkBudgetCustomCategory = checkBudgetCustomCategory;
window.saveBudget = saveBudget;
window.deleteBudget = deleteBudget;
window.renderBudgetTab = renderBudgetTab;
window.renderSettingsCategoryList = renderSettingsCategoryList;
window.addCustomConfigCategory = addCustomConfigCategory;
window.deleteConfigCategory = deleteConfigCategory;
window.exportDataToJSON = exportDataToJSON;
window.importDataFromJSON = importDataFromJSON;
window.changeTheme = changeTheme;
window.clearAllData = clearAllData;
window.saveWarningThresholds = saveWarningThresholds;

window.changeLanguage = function (val) {
    state.currentLang = val;
    localStorage.setItem('smart_wallet_lang', val);
    applyLocalization();
    loadBudgetSelector();
    setTxType(state.txType);
    renderAll(false);
};

window.changeCurrency = function (val) {
    state.currentCurrency = val;
    localStorage.setItem('smart_wallet_currency', val);
    renderAll(false);
    if (!document.getElementById('tab-calendar').classList.contains('hidden')) renderCalendar();
    if (!document.getElementById('tab-budget').classList.contains('hidden')) renderBudgetTab();
};

loadState();

document.getElementById('f-date').valueAsDate = new Date();
const now = new Date();
document.getElementById('report-month-select').value =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
document.getElementById('budget-month-select').value =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
document.getElementById('sett-warn-orange').value = state.warnOrange;
document.getElementById('sett-warn-red').value = state.warnRed;

window.addEventListener('DOMContentLoaded', () => {
    applyLocalization();
    setTxType('chi');
    loadBudgetSelector();
    applyTheme();
    applyLightDarkModeStyles();

    renderAll(true);

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('opacity-0');
            setTimeout(() => splash.remove(), 700);
        }
    }, 1600);
});
