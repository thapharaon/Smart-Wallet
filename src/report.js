import Chart from 'chart.js/auto';
import { state } from './state.js';
import { langDict } from './lang.js';

export function renderReport() {
    const selectedMonth = document.getElementById('report-month-select').value;
    const rType = document.getElementById('report-type').value;

    if (!selectedMonth) return;

    const chartDataObj = {};
    state.transactions.forEach(t => {
        if (t.type === rType && t.date.startsWith(selectedMonth)) {
            chartDataObj[t.category] = (chartDataObj[t.category] || 0) + t.amount;
        }
    });

    const labels = Object.keys(chartDataObj);
    const values = Object.values(chartDataObj);
    const hasData = values.some(v => v > 0);

    if (state.reportChart) state.reportChart.destroy();

    const canvas = document.getElementById('reportChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const labelColor = state.isDarkMode ? '#94a3b8' : '#475569';

    state.reportChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: hasData ? labels : [langDict[state.currentLang].noData],
            datasets: [{
                data: hasData ? values : [1],
                backgroundColor: hasData ?
                    ['#2dd4bf', '#3b82f6', '#a855f7', '#f43f5e', '#f97316', '#eab308', '#10b981', '#64748b'] :
                    (state.isDarkMode ? ['#1e293b'] : ['#e2e8f0']),
                borderColor: state.isDarkMode ? '#0f172a' : '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: labelColor, boxWidth: 12, font: { size: 11, weight: '600' } }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
