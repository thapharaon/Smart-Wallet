import { state, TX_PAGE_SIZE } from './state.js';
import { langDict } from './lang.js';
import { renderCalendar } from './calendar.js';
import { renderReport } from './report.js';
import { renderBudgetTab } from './budget.js';
import { renderSettingsCategoryList } from './settings.js';
import { renderAll } from './transactions.js';

export function showSuccessToast(message) {
    const toast = document.getElementById('success-toast');
    const msgEl = document.getElementById('toast-msg');
    const titleEl = document.getElementById('toast-title');

    titleEl.innerText = state.currentLang === 'vi' ? 'Thành công' : 'Success';
    msgEl.innerText = message;

    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('opacity-0', 'translate-y-[-20px]');
        toast.classList.add('opacity-100', 'translate-y-0');
    }, 50);

    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-[-20px]');
        setTimeout(() => {
            toast.classList.add('hidden');
            const svg = toast.querySelector('svg');
            const newSvg = svg.cloneNode(true);
            svg.parentNode.replaceChild(newSvg, svg);
        }, 500);
    }, 2500);
}

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
            element.innerText = (end >= 0 || elementId !== 'stat-balance' ? '' : '-') + Math.abs(end).toLocaleString() + state.currentCurrency;
        }
    }
    requestAnimationFrame(update);
}

export function switchTab(tabId) {
    const tabs = ['tab-input', 'tab-calendar', 'tab-report', 'tab-budget', 'tab-settings'];

    tabs.forEach(id => {
        const el = document.getElementById(id);
        if (id === tabId) {
            el.classList.remove('hidden');
            setTimeout(() => {
                el.classList.remove('opacity-0', 'translate-y-4');
                el.classList.add('opacity-100', 'translate-y-0');
            }, 20);
        } else {
            el.classList.add('hidden', 'opacity-0', 'translate-y-4');
            el.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    if (tabId === 'tab-calendar') { state.txDisplayLimit = TX_PAGE_SIZE; renderCalendar(); }
    if (tabId === 'tab-report') renderReport();
    if (tabId === 'tab-budget') renderBudgetTab();
    if (tabId === 'tab-settings') renderSettingsCategoryList();
    renderAll(false);

    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove(`text-${state.activeTheme}-400`, 'font-bold', 'scale-105', 'active-nav', 'text-teal-400', 'text-blue-400', 'text-purple-400', 'text-rose-400', 'text-orange-400');
        el.classList.add('text-slate-500', 'font-medium');
        el.style.color = '';
    });

    const navBtn = document.getElementById('nav-' + tabId);
    if (navBtn) {
        navBtn.classList.remove('text-slate-500', 'font-medium');
        navBtn.classList.add(`text-${state.activeTheme}-400`, 'font-bold', 'scale-105', 'active-nav');
        navBtn.style.color = state.activeThemeHex;
    }
}

export function toggleDarkMode() {
    state.isDarkMode = !state.isDarkMode;
    localStorage.setItem('smart_wallet_darkmode', state.isDarkMode);
    applyLightDarkModeStyles();
    if (state.reportChart) renderReport();
}

export function applyLightDarkModeStyles() {
    const body = document.getElementById('app-body');
    const icon = document.getElementById('theme-toggle-icon');
    const toast = document.getElementById('success-toast');
    const aurora = document.getElementById('aurora-bg');

    const b1 = document.getElementById('blob-1');
    const b2 = document.getElementById('blob-2');
    const b3 = document.getElementById('blob-3');

    if (state.isDarkMode) {
        body.classList.add('dark');
        body.className = "bg-slate-950 font-sans antialiased text-slate-100 pb-24 md:pb-6 min-h-screen relative overflow-x-hidden dark";
        icon.className = "fa-solid fa-sun text-amber-300";
        aurora.className = "fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40 transition-opacity duration-500";
        toast.className = "fixed top-6 left-1/2 transform -translate-x-1/2 z-[110] bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-2xl px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[280px] pointer-events-none opacity-0 translate-y-[-20px] transition-all duration-500 ease-out hidden text-slate-100";

        b1.className = "absolute top-10 -left-16 w-80 h-80 bg-teal-500 rounded-full blur-[100px] animate-blob";
        b2.className = "absolute top-1/3 -right-16 w-80 h-80 bg-purple-500 rounded-full blur-[100px] animate-blob animation-delay-2000";
        b3.className = "absolute -bottom-10 left-1/3 w-80 h-80 bg-blue-500 rounded-full blur-[100px] animate-blob animation-delay-4000";

        document.querySelectorAll('.glass-panel').forEach(el => {
            el.classList.remove('bg-white/70', 'border-white/40', 'shadow-lg', 'text-slate-800');
            el.classList.add('bg-slate-900/60', 'border-slate-800', 'shadow-xl', 'text-slate-100');
        });
        document.querySelectorAll('.input-field-toggle').forEach(el => {
            el.classList.remove('bg-white/90', 'border-rose-200/50', 'text-slate-800');
            el.classList.add('bg-slate-950', 'border-slate-800', 'text-slate-200');
        });
        document.querySelectorAll('.input-bg-toggle').forEach(el => {
            el.classList.remove('bg-rose-100/30', 'border-rose-200/30');
            el.classList.add('bg-slate-950/80', 'border-slate-800');
        });
        document.querySelectorAll('.nav-panel-toggle').forEach(el => {
            el.classList.remove('bg-white/80', 'border-rose-200/40');
            el.classList.add('bg-slate-900/80', 'border-slate-800/80');
        });
        document.querySelectorAll('.button-bg-toggle').forEach(el => {
            el.classList.remove('bg-rose-200/40', 'hover:bg-rose-200/60', 'text-slate-700');
            el.classList.add('bg-slate-800', 'hover:bg-slate-700', 'text-slate-300');
        });
        document.querySelectorAll('.border-toggle').forEach(el => {
            el.classList.remove('border-rose-200/40');
            el.classList.add('border-slate-800');
        });
        document.querySelectorAll('.table-divide-toggle').forEach(el => {
            el.classList.remove('divide-rose-100');
            el.classList.add('divide-slate-800/50');
        });
        document.querySelectorAll('.modal-panel-toggle').forEach(el => {
            el.classList.remove('bg-white/95', 'border-rose-200', 'text-slate-800');
            el.classList.add('bg-slate-900', 'border-slate-800', 'text-slate-100');
        });
        document.querySelectorAll('.text-toggle').forEach(el => {
            el.classList.remove('text-slate-600', 'hover:text-rose-600');
            el.classList.add('text-slate-300', 'hover:text-slate-100');
        });
        document.querySelectorAll('.border-white-toggle').forEach(el => {
            el.classList.remove('border-white');
            el.classList.add('border-slate-950');
        });

    } else {
        body.classList.remove('dark');
        body.className = "bg-gradient-to-br from-rose-50 via-rose-100/70 to-pink-50 font-sans antialiased text-slate-800 pb-24 md:pb-6 min-h-screen relative overflow-x-hidden";
        icon.className = "fa-solid fa-moon text-slate-100";
        aurora.className = "fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-45 transition-opacity duration-500";
        toast.className = "fixed top-6 left-1/2 transform -translate-x-1/2 z-[110] bg-white/95 backdrop-blur-md border border-rose-200 shadow-2xl px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[280px] pointer-events-none opacity-0 translate-y-[-20px] transition-all duration-500 ease-out hidden text-slate-800";

        b1.className = "absolute top-10 -left-16 w-80 h-80 bg-emerald-300 rounded-full blur-[100px] animate-blob";
        b2.className = "absolute top-1/3 -right-16 w-80 h-80 bg-amber-300 rounded-full blur-[100px] animate-blob animation-delay-2000";
        b3.className = "absolute -bottom-10 left-1/3 w-80 h-80 bg-cyan-300 rounded-full blur-[100px] animate-blob animation-delay-4000";

        document.querySelectorAll('.glass-panel').forEach(el => {
            el.classList.remove('bg-slate-900/60', 'border-slate-800', 'shadow-xl', 'text-slate-100');
            el.classList.add('bg-white/70', 'border-white/40', 'shadow-lg', 'text-slate-800');
        });
        document.querySelectorAll('.input-field-toggle').forEach(el => {
            el.classList.remove('bg-slate-950', 'border-slate-800', 'text-slate-200');
            el.classList.add('bg-white/90', 'border-rose-200/50', 'text-slate-800');
        });
        document.querySelectorAll('.input-bg-toggle').forEach(el => {
            el.classList.remove('bg-slate-950/80', 'border-slate-800');
            el.classList.add('bg-rose-100/30', 'border-rose-200/30');
        });
        document.querySelectorAll('.nav-panel-toggle').forEach(el => {
            el.classList.remove('bg-slate-900/80', 'border-slate-800/80');
            el.classList.add('bg-white/80', 'border-rose-200/40');
        });
        document.querySelectorAll('.button-bg-toggle').forEach(el => {
            el.classList.remove('bg-slate-800', 'hover:bg-slate-700', 'text-slate-300');
            el.classList.add('bg-rose-200/40', 'hover:bg-rose-200/60', 'text-slate-700');
        });
        document.querySelectorAll('.border-toggle').forEach(el => {
            el.classList.remove('border-slate-800');
            el.classList.add('border-rose-200/40');
        });
        document.querySelectorAll('.table-divide-toggle').forEach(el => {
            el.classList.remove('divide-slate-800/50');
            el.classList.add('divide-rose-100');
        });
        document.querySelectorAll('.modal-panel-toggle').forEach(el => {
            el.classList.remove('bg-slate-900', 'border-slate-800', 'text-slate-100');
            el.classList.add('bg-white/95', 'border-rose-200', 'text-slate-800');
        });
        document.querySelectorAll('.text-toggle').forEach(el => {
            el.classList.remove('text-slate-300', 'hover:text-slate-100');
            el.classList.add('text-slate-600', 'hover:text-rose-600');
        });
        document.querySelectorAll('.border-white-toggle').forEach(el => {
            el.classList.remove('border-slate-950');
            el.classList.add('border-white');
        });
    }

    const balanceVal = state.currentDisplayIncome - state.currentDisplayExpense;
    const balanceEl = document.getElementById('stat-balance');
    if (balanceEl) {
        if (balanceVal >= 0) {
            balanceEl.className = "text-sm md:text-xl font-black mt-0.5 tracking-tight text-emerald-600";
        } else {
            balanceEl.className = "text-sm md:text-xl font-black mt-0.5 tracking-tight text-rose-500 animate-pulse";
        }
    }
}

export function goHome() {
    switchTab('tab-input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
