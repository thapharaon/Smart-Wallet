import './style.css';
import { state, loadState } from './state.js';
import { applyLocalization } from './lang.js';
import { switchTab } from './ui.js';
import {
    setTxType, addTransaction, checkCustomCategory,
    openEditModal, closeEditModal, updateTransaction,
    deleteTx, renderAll
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

window.switchTab = switchTab;
window.setTxType = setTxType;
window.addTransaction = addTransaction;
window.checkCustomCategory = checkCustomCategory;
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.updateTransaction = updateTransaction;
window.deleteTx = deleteTx;
window.renderAll = renderAll;
window.changeMonth = changeMonth;
window.renderReport = renderReport;
window.loadBudgetSelector = loadBudgetSelector;
window.checkBudgetCustomCategory = checkBudgetCustomCategory;
window.saveBudget = saveBudget;
window.deleteBudget = deleteBudget;
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
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.id === 'tab-calendar') renderCalendar();
    if (activeTab && activeTab.id === 'tab-budget') renderBudgetTab();
};

loadState();

document.getElementById('f-date').valueAsDate = new Date();
const now = new Date();
document.getElementById('report-month-select').value =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
document.getElementById('sett-warn-orange').value = state.warnOrange;
document.getElementById('sett-warn-red').value = state.warnRed;

window.addEventListener('DOMContentLoaded', () => {
    applyLocalization();
    setTxType('chi');
    loadBudgetSelector();
    applyTheme();

    renderAll(true);

    document.getElementById('tab-input').classList.add('show');

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.classList.add('opacity-0');
        setTimeout(() => splash.remove(), 700);
    }, 1600);
});
