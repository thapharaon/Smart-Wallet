import { state, TX_PAGE_SIZE, LS_KEYS } from './state.js';
import { langDict } from './lang.js';
import { animateNumber, showSuccessToast, applyLightDarkModeStyles } from './ui.js';
import { renderCalendar } from './calendar.js';

export function setTxType(type) {
    state.txType = type;
    const btnChi = document.getElementById('btn-type-chi');
    const btnThu = document.getElementById('btn-type-thu');
    if (type === 'chi') {
        btnChi.className = "w-1/2 py-2 rounded-lg text-xs md:text-sm font-bold bg-slate-800 text-rose-400 shadow-md active:scale-95 cursor-pointer";
        btnThu.className = "w-1/2 py-2 rounded-lg text-xs md:text-sm font-bold text-slate-500 hover:text-slate-300 transition-all active:scale-95 cursor-pointer";
    } else {
        btnThu.className = "w-1/2 py-2 rounded-lg text-xs md:text-sm font-bold bg-slate-800 text-emerald-400 shadow-md active:scale-95 cursor-pointer";
        btnChi.className = "w-1/2 py-2 rounded-lg text-xs md:text-sm font-bold text-slate-500 hover:text-slate-300 transition-all active:scale-95 cursor-pointer";
    }
    loadFormCategories('f-category', state.txType);
    applyLightDarkModeStyles();
}

export function loadFormCategories(selectId, type, selectValue = '') {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '';
    (state.categories[type] || []).forEach(c => {
        let opt = document.createElement('option');
        opt.value = c; opt.innerText = c;
        if (c === selectValue) opt.selected = true;
        select.appendChild(opt);
    });
    checkCustomCategory(selectId, selectId === 'f-category' ? 'custom-cat-container' : 'edit-custom-cat-container');
}

export function checkCustomCategory(selectId, containerId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const selectVal = select.value;
    const container = document.getElementById(containerId);
    if (selectVal === 'Khác' || selectVal === 'Other') {
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

export function addTransaction(e) {
    e.preventDefault();
    const amount = parseInt(document.getElementById('f-amount').value);
    const date = document.getElementById('f-date').value;
    let category = document.getElementById('f-category').value;
    const note = document.getElementById('f-note').value.trim();

    if (category === 'Khác' || category === 'Other') {
        const customCat = document.getElementById('f-custom-category').value.trim();
        category = customCat || category;
    }

    const tx = { id: Date.now(), type: state.txType, amount, date, category, note: note || category };
    state.transactions.unshift(tx);
    localStorage.setItem(LS_KEYS.TXS, JSON.stringify(state.transactions));

    document.getElementById('f-amount').value = '';
    document.getElementById('f-note').value = '';
    document.getElementById('f-custom-category').value = '';
    document.getElementById('custom-cat-container').classList.add('hidden');
    renderAll(true);

    showSuccessToast(langDict[state.currentLang].alertSaved);
}

export function openEditModal(id) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;

    document.getElementById('edit-id').value = tx.id;
    document.getElementById('edit-type').value = tx.type;
    document.getElementById('edit-date').value = tx.date;
    document.getElementById('edit-amount').value = tx.amount;
    document.getElementById('edit-note').value = tx.note;

    const isDefault = (state.categories[tx.type] || []).includes(tx.category);
    if (isDefault) {
        loadFormCategories('edit-category', tx.type, tx.category);
    } else {
        const triggerKeyword = (state.categories[tx.type] || []).includes('Khác') ? 'Khác' : 'Other';
        loadFormCategories('edit-category', tx.type, triggerKeyword);
        document.getElementById('edit-custom-category').value = tx.category;
        document.getElementById('edit-custom-cat-container').classList.remove('hidden');
    }

    document.getElementById('edit-modal').classList.remove('hidden');
    applyLightDarkModeStyles();
}

export function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

export function updateTransaction(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('edit-id').value);
    const amount = parseInt(document.getElementById('edit-amount').value);
    const date = document.getElementById('edit-date').value;
    let category = document.getElementById('edit-category').value;
    const fontNote = document.getElementById('edit-note').value.trim();

    if (category === 'Khác' || category === 'Other') {
        const customCat = document.getElementById('edit-custom-category').value.trim();
        category = customCat || category;
    }

    state.transactions = state.transactions.map(t => {
        if (t.id === id) return { ...t, amount, date, category, note: fontNote || category };
        return t;
    });

    localStorage.setItem(LS_KEYS.TXS, JSON.stringify(state.transactions));
    closeEditModal();
    renderAll(true);
    if (!document.getElementById('tab-calendar').classList.contains('hidden')) renderCalendar();

    showSuccessToast(langDict[state.currentLang].alertUpdated);
}

export function deleteTx(id) {
    if (confirm(langDict[state.currentLang].alertDelConf)) {
        state.transactions = state.transactions.filter(t => t.id !== id);
        localStorage.setItem(LS_KEYS.TXS, JSON.stringify(state.transactions));
        renderAll(true);
        if (!document.getElementById('tab-calendar').classList.contains('hidden')) renderCalendar();

        showSuccessToast(langDict[state.currentLang].alertDeleted);
    }
}

export function renderAll(triggerCountUp = true) {
    let inc = 0, exp = 0;
    const search = document.getElementById('search-tx').value.toLowerCase();
    const tbody = document.getElementById('tx-table-body');
    if (tbody) tbody.innerHTML = '';

    const filteredTx = [];

    state.transactions.forEach(t => {
        if (t.type === 'thu') inc += t.amount;
        if (t.type === 'chi') exp += t.amount;

        if (t.note.toLowerCase().includes(search) || t.category.toLowerCase().includes(search) || t.date.includes(search)) {
            filteredTx.push(t);
        }
    });

    if (tbody) {
        const txToShow = filteredTx.slice(0, state.txDisplayLimit);
        txToShow.forEach(t => {
            let tr = document.createElement('tr');
            tr.className = state.isDarkMode ? "hover:bg-slate-900/40 transition-colors group" : "hover:bg-rose-100/30 transition-colors group";
            let d = t.date.split('-');

            const textDescColor = state.isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-800 group-hover:text-rose-700';
            const amountExpColor = state.isDarkMode ? 'text-slate-300' : 'text-slate-700';

            tr.innerHTML = `
                <td class="py-3 text-slate-500 font-normal group-hover:text-slate-400 transition-colors">${d[2]}/${d[1]}</td>
                <td class="py-3"><span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${t.type === 'thu' ? 'bg-emerald-950/50 text-emerald-400' : 'bg-rose-950/50 text-rose-400'}">${t.type === 'thu' ? 'THU' : 'CHI'}</span></td>
                <td class="py-3"><span class="block font-bold ${textDescColor} transition-colors">${t.category}</span><span class="block text-[11px] text-slate-500 font-normal">${t.note}</span></td>
                <td class="py-3 text-right font-black ${t.type === 'thu' ? 'text-emerald-500' : amountExpColor}">${t.type === 'thu' ? '+' : '-'}${t.amount.toLocaleString()}${state.currentCurrency}</td>
                <td class="py-3 text-center flex justify-center gap-2 mt-1">
                    <button onclick="openEditModal(${t.id})" class="text-slate-500 hover:text-teal-500 transition-all transform hover:scale-110 p-1 cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="deleteTx(${t.id})" class="text-slate-600 hover:text-rose-500 transition-all transform hover:scale-110 p-1 cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        renderLoadMoreState(filteredTx.length);
    }

    let balance = inc - exp;

    if (triggerCountUp) {
        animateNumber('stat-income', state.currentDisplayIncome, inc, 800);
        animateNumber('stat-expense', state.currentDisplayExpense, exp, 800);
        animateNumber('stat-balance', state.currentDisplayBalance, balance, 800);
    } else {
        document.getElementById('stat-income').innerText = inc.toLocaleString() + state.currentCurrency;
        document.getElementById('stat-expense').innerText = exp.toLocaleString() + state.currentCurrency;
        document.getElementById('stat-balance').innerText = (balance >= 0 ? '' : '-') + Math.abs(balance).toLocaleString() + state.currentCurrency;
    }

    state.currentDisplayIncome = inc;
    state.currentDisplayExpense = exp;
    state.currentDisplayBalance = balance;

    const balanceEl = document.getElementById('stat-balance');
    if (balance >= 0) {
        balanceEl.className = state.isDarkMode ? "text-sm md:text-xl font-black mt-0.5 tracking-tight text-teal-400" : "text-sm md:text-xl font-black mt-0.5 tracking-tight text-emerald-600";
    } else {
        balanceEl.className = "text-sm md:text-xl font-black mt-0.5 tracking-tight text-rose-500 animate-pulse";
    }
}

function renderLoadMoreState(totalCount) {
    const btn = document.getElementById('btn-load-more');
    const countTxt = document.getElementById('txt-showing-count');
    if (!btn || !countTxt) return;

    const shown = Math.min(state.txDisplayLimit, totalCount);

    if (totalCount === 0) {
        countTxt.innerText = '';
    } else {
        countTxt.innerText = langDict[state.currentLang].showingCount
            .replace('{shown}', shown)
            .replace('{total}', totalCount);
    }

    if (totalCount > state.txDisplayLimit) {
        btn.classList.remove('hidden');
    } else {
        btn.classList.add('hidden');
    }
}

export function loadMoreTx() {
    state.txDisplayLimit += TX_PAGE_SIZE;
    renderAll(false);
}

export function onSearchInput() {
    state.txDisplayLimit = TX_PAGE_SIZE;
    renderAll(false);
}
