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

    const ctx = document.getElementById('reportChart').getContext('2d');
    state.reportChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: hasData ? labels : [langDict[state.currentLang].noData],
            datasets: [{
                data: hasData ? values : [1],
                backgroundColor: hasData ?
                    ['#2dd4bf', '#3b82f6', '#a855f7', '#f43f5e', '#f97316', '#eab308', '#10b981', '#64748b'] :
                    ['#1e293b'],
                borderColor: '#0f172a',
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
                    labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11, weight: '600' } }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
