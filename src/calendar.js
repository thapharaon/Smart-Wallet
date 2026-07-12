import { state, TX_PAGE_SIZE } from './state.js';
import { renderAll } from './transactions.js';

export function changeMonth(dir) {
    state.currentDate.setMonth(state.currentDate.getMonth() + dir);
    renderCalendar();
}

export function renderCalendar() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    document.getElementById('calendar-title').innerText = `${state.currentLang === 'vi' ? 'Tháng' : 'Month'} ${String(month + 1).padStart(2, '0')} / ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        let blank = document.createElement('div');
        blank.className = state.isDarkMode ? "bg-slate-900/10 rounded-lg p-2 h-14" : "bg-rose-100/20 rounded-lg p-2 h-14";
        grid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        let dayInc = 0, dayExp = 0;

        state.transactions.forEach(t => {
            if (t.date === dayStr) {
                if (t.type === 'thu') dayInc += t.amount;
                if (t.type === 'chi') dayExp += t.amount;
            }
        });

        let cell = document.createElement('div');
        cell.className = state.isDarkMode ?
            "bg-slate-950/40 border border-slate-900 rounded-lg p-1 h-14 flex flex-col justify-between items-center hover:bg-slate-800 hover:border-slate-700 transition-all transform hover:-translate-y-0.5 cursor-pointer" :
            "bg-white/80 border border-rose-100 rounded-lg p-1 h-14 flex flex-col justify-between items-center hover:bg-rose-50 hover:border-rose-300 hover:shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer";

        cell.onclick = () => {
            document.getElementById('search-tx').value = dayStr;
            state.txDisplayLimit = TX_PAGE_SIZE;
            renderAll(false);
            document.getElementById('search-tx').scrollIntoView({ behavior: 'smooth' });
        };

        let html = `<span class="font-bold text-slate-400">${day}</span><div class="w-full text-[9px] scale-90 leading-tight text-center">`;
        if (dayInc > 0) html += `<p class="text-emerald-500 font-bold">+${(dayInc / 1000).toFixed(0)}k</p>`;
        if (dayExp > 0) html += `<p class="text-rose-500 font-bold">-${(dayExp / 1000).toFixed(0)}k</p>`;
        html += `</div>`;

        cell.innerHTML = html;
        grid.appendChild(cell);
    }
}
