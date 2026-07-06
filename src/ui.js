import { state } from './state.js';
import { renderCalendar } from './calendar.js';
import { renderReport } from './report.js';
import { renderBudgetTab } from './budget.js';
import { renderSettingsCategoryList } from './settings.js';
import { renderAll } from './transactions.js';

export function animateNumber(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + easeProgress * (end - start));

        element.innerText = (end >= 0 || elementId !== 'stat-balance' ? '' : '-') + Math.abs(currentValue).toLocaleString() + state.currentCurrency;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.innerText = (end >= 0 || elementId !== 'smart-balance' ? '' : '') + end.toLocaleString() + state.currentCurrency;
        }
    }
    requestAnimationFrame(update);
}

export function switchTab(tabId) {
    const currentActiveTab = document.querySelector('.tab-content.active');

    if (currentActiveTab && currentActiveTab.id !== tabId) {
        currentActiveTab.classList.remove('show');
        setTimeout(() => {
            currentActiveTab.classList.remove('active');
            executeTabActivation(tabId);
        }, 150);
    } else {
        executeTabActivation(tabId);
    }

    document.querySelectorAll('.nav-btn').forEach(el => {
        const themeColors = ['text-teal-400', 'text-blue-400', 'text-purple-400', 'text-rose-400', 'text-orange-400'];
        el.classList.remove(`text-${state.activeTheme}-400`, 'font-bold', 'scale-105', ...themeColors);
        el.classList.add('text-slate-500', 'font-medium');
    });

    const navBtn = document.getElementById('nav-' + tabId);
    navBtn.classList.remove('text-slate-500', 'font-medium');
    navBtn.classList.add(`text-${state.activeTheme}-400`, 'font-bold', 'scale-105');
}

export function executeTabActivation(tabId) {
    const targetTab = document.getElementById(tabId);
    targetTab.classList.add('active');
    void targetTab.offsetWidth;
    targetTab.classList.add('show');

    if (tabId === 'tab-calendar') renderCalendar();
    if (tabId === 'tab-report') renderReport();
    if (tabId === 'tab-budget') renderBudgetTab();
    if (tabId === 'tab-settings') renderSettingsCategoryList();
    renderAll(false);
}
