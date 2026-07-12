import { state, LS_KEYS } from './state.js';
import { langDict } from './lang.js';
import { showSuccessToast } from './ui.js';

export function loadBudgetSelector() {
    const select = document.getElementById('budget-category-select');
    if (!select) return;
    select.innerHTML = `<option value="Tổng ngân sách">${langDict[state.currentLang].budgetGeneral}</option>`;

    (state.categories.chi || []).forEach(c => {
        if (c !== 'Khác' && c !== 'Other') {
            let opt = document.createElement('option');
            opt.value = c; opt.innerText = `${langDict[state.currentLang].budgetLimitLbl}${c}`;
            select.appendChild(opt);
        }
    });

    let customOpt = document.createElement('option');
    customOpt.value = 'CUSTOM_BUDGET';
    customOpt.innerText = langDict[state.currentLang].customOptText;
    select.appendChild(customOpt);

    checkBudgetCustomCategory();
}

export function checkBudgetCustomCategory() {
    const select = document.getElementById('budget-category-select');
    if (!select) return;
    const selectVal = select.value;
    const container = document.getElementById('budget-custom-cat-container');
    if (selectVal === 'CUSTOM_BUDGET') {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

export function saveBudget() {
    let cat = document.getElementById('budget-category-select').value;
    const amount = parseInt(document.getElementById('budget-amount-input').value);

    if (cat === 'CUSTOM_BUDGET') {
        const customName = document.getElementById('budget-custom-name').value.trim();
        if (!customName) {
            alert(langDict[state.currentLang].alertCustomCatReq);
            return;
        }
        cat = customName;
    }

    if (amount > 0) {
        state.budgets[cat] = amount;
        localStorage.setItem(LS_KEYS.BUDGETS, JSON.stringify(state.budgets));

        document.getElementById('budget-amount-input').value = '';
        document.getElementById('budget-custom-name').value = '';
        document.getElementById('budget-category-select').value = 'Tổng ngân sách';

        checkBudgetCustomCategory();
        renderBudgetTab();

        showSuccessToast(langDict[state.currentLang].alertBudSucess + cat);
    }
}

export function deleteBudget(cat) {
    if (confirm(langDict[state.currentLang].alertDelBud.replace('{cat}', cat))) {
        delete state.budgets[cat];
        localStorage.setItem(LS_KEYS.BUDGETS, JSON.stringify(state.budgets));
        renderBudgetTab();
    }
}

export function renderBudgetTab() {
    const container = document.getElementById('budget-list-container');
    if (!container) return;
    container.innerHTML = '';

    const filterMonthStr = document.getElementById('budget-month-select').value;
    if (!filterMonthStr) return;

    const expenseMap = { "Tổng ngân sách": 0 };
    state.transactions.forEach(t => {
        if (t.type === 'chi' && t.date.startsWith(filterMonthStr)) {
            expenseMap["Tổng ngân sách"] += t.amount;
            expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
        }
    });

    const activeBudgets = Object.keys(state.budgets);
    if (activeBudgets.length === 0) {
        container.innerHTML = `<p class="text-xs text-center text-slate-500">${state.currentLang === 'vi' ? 'Chưa có cấu hình hạn mức ngân sách nào.' : 'No budget thresholds configurated.'}</p>`;
        return;
    }

    activeBudgets.forEach(cat => {
        const limit = state.budgets[cat];
        const spent = expenseMap[cat] || 0;
        let pct = (spent / limit) * 100;

        let barColor = 'bg-gradient-to-r from-teal-500 to-emerald-400';
        let warningText = langDict[state.currentLang].budgetSafe;
        let textStyle = 'text-emerald-500 font-bold';
        let remainingLabel = '';

        if (spent > limit) {
            const overAmount = spent - limit;
            remainingLabel = state.currentLang === 'vi' ? ` (Thâm hụt: -${overAmount.toLocaleString()}${state.currentCurrency})` : ` (Deficit: -${overAmount.toLocaleString()}${state.currentCurrency})`;
        } else {
            const leftAmount = limit - spent;
            remainingLabel = state.currentLang === 'vi' ? ` (Còn lại: ${leftAmount.toLocaleString()}${state.currentCurrency})` : ` (Left: ${leftAmount.toLocaleString()}${state.currentCurrency})`;
        }

        if (pct >= state.warnRed) {
            barColor = 'bg-gradient-to-r from-rose-600 to-red-500';
            warningText = langDict[state.currentLang].budgetDanger;
            textStyle = 'text-rose-500 font-extrabold animate-pulse';
        } else if (pct >= state.warnOrange) {
            barColor = 'bg-gradient-to-r from-orange-500 to-amber-400';
            warningText = langDict[state.currentLang].budgetWarning;
            textStyle = 'text-orange-500 font-bold';
        }

        let bCard = document.createElement('div');
        bCard.className = state.isDarkMode ?
            "bg-slate-950/40 p-3 rounded-xl border border-slate-900 space-y-2 hover:border-slate-800 transition-all duration-300 transform hover:-translate-y-0.5" :
            "bg-white p-3 rounded-xl border border-rose-200/50 space-y-2 hover:border-rose-300 hover:bg-rose-50/50 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-0.5";

        const textTitleColor = state.isDarkMode ? 'text-slate-200' : 'text-slate-800';

        bCard.innerHTML = `
            <div class="flex justify-between items-center text-xs font-bold">
                <span class="${textTitleColor}">${cat === 'Tổng ngân sách' ? langDict[state.currentLang].budgetGeneral : cat}</span>
                <div class="flex items-center gap-3">
                    <span class="${pct >= state.warnRed ? 'text-rose-500' : 'text-slate-500'}">${spent.toLocaleString()} / ${limit.toLocaleString()}${state.currentCurrency}</span>
                    <button onclick="deleteBudget('${cat}')" class="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"><i class="fa-solid fa-circle-xmark"></i></button>
                </div>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-300/40 dark:border-slate-800/60">
                <div class="${barColor} h-full transition-all duration-700 ease-out rounded-full" style="width: ${Math.min(pct, 100)}%"></div>
            </div>
            <div class="flex justify-between text-[10px] font-bold">
                <span class="text-slate-500">${pct.toFixed(0)}% ${state.currentLang === 'vi' ? 'đã dùng' : 'used'}${remainingLabel}</span>
                <span class="${textStyle}">${warningText}</span>
            </div>
        `;
        container.appendChild(bCard);
    });
}
