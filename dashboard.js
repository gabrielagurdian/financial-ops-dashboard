/* ============================================================
   FinOps Dashboard — dashboard.js
   Chart.js 4.x · All chart and table rendering
   ============================================================ */

'use strict';

// ── DATA ─────────────────────────────────────────────────────

const DATA = {
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  actual:   [410, 398, 445, 487, null, null, null, null, null, null, null, null],
  target:   [420, 420, 430, 440, 450, 450, 460, 460, 470, 470, 480, 490],
  forecast: [null, null, null, 487, 510, 520, 505, 515, 500, 525, 530, 540],

  breakdown: {
    labels: ['Payroll', 'Operations', 'Travel', 'Tech & Software'],
    data:   [61, 17, 13, 9],
    colors: ['#0F7A5A', '#1A56A8', '#92620A', '#A3245A'],
  },

  departments: [
    { name: 'Sales',       spent: 548, budget: 490, status: 'over' },
    { name: 'Engineering', spent: 376, budget: 620, status: 'on'   },
    { name: 'Marketing',   spent: 267, budget: 300, status: 'warn' },
    { name: 'Operations',  spent: 412, budget: 480, status: 'warn' },
    { name: 'HR & People', spent: 198, budget: 240, status: 'on'   },
    { name: 'Finance',     spent: 112, budget: 160, status: 'on'   },
  ],

  travel: [
    { icon: '✈',  name: 'Sales — North America', sub: '22 trips · 8 employees',  amt: '$218K', bg: 'rgba(26,86,168,0.07)'   },
    { icon: '🏨', name: 'Executive — Conferences', sub: '6 trips · 4 employees',  amt: '$147K', bg: 'rgba(15,122,90,0.07)'   },
    { icon: '🚗', name: 'Field Ops — APAC',        sub: '14 trips · 11 employees', amt: '$103K', bg: 'rgba(146,98,10,0.07)'  },
    { icon: '🌐', name: 'Engineering — On-site',   sub: '9 trips · 7 employees',  amt: '$89K',  bg: 'rgba(163,36,90,0.07)'  },
  ],

  alerts: [
    { type: 'danger', title: 'Sales — 112% utilized', body: 'Over budget by $48K. Review discretionary travel spend.' },
    { type: 'warn',   title: 'Marketing — 89% utilized', body: 'On pace to exceed budget before quarter end.' },
    { type: 'info',   title: 'Engineering — 61% utilized', body: '$124K available for H2 infrastructure investment.' },
  ],
};

// ── SPARKLINE DATA ────────────────────────────────────────────

const SPARKS = [
  [310, 380, 420, 390, 460, 487],
  [900, 1100, 950, 1180, 1050, 1180],
  [320, 410, 370, 500, 480, 632],
  [2800, 2850, 2900, 2870, 2950, 2940],
];

const SPARK_COLORS = ['#1A56A8', '#0F7A5A', '#92620A', '#0E6E68'];

// ── CHART DEFAULTS ────────────────────────────────────────────

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 800, easing: 'easeOutQuart' },
};

const GRID_COLOR  = 'rgba(0,0,0,0.06)';
const TICK_COLOR  = '#9B9590';
const TICK_FONT   = { family: 'DM Mono', size: 10 };

// ── SPARKLINES ────────────────────────────────────────────────

function drawSparkline(id, values, color) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: values.map((_, i) => i),
      datasets: [{
        data: values,
        borderColor: color,
        borderWidth: 1.5,
        pointRadius: 0,
        fill: {
          target: 'origin',
          above: color.replace(')', ', 0.08)').replace('rgb', 'rgba'),
        },
        tension: 0.4,
      }],
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}

['spark1','spark2','spark3','spark4'].forEach((id, i) => {
  drawSparkline(id, SPARKS[i], SPARK_COLORS[i]);
});

// ── SPEND CHART ───────────────────────────────────────────────

new Chart(document.getElementById('spendChart'), {
  type: 'bar',
  data: {
    labels: DATA.months,
    datasets: [
      {
        label: 'Actual spend',
        data: DATA.actual,
        backgroundColor: 'rgba(15,122,90,0.75)',
        hoverBackgroundColor: '#0F7A5A',
        borderRadius: 4,
        borderSkipped: false,
        order: 2,
      },
      {
        label: 'Forecast',
        data: DATA.forecast,
        backgroundColor: 'rgba(146,98,10,0.30)',
        hoverBackgroundColor: 'rgba(146,98,10,0.50)',
        borderRadius: 4,
        borderSkipped: false,
        order: 3,
      },
      {
        label: 'Budget target',
        data: DATA.target,
        type: 'line',
        borderColor: '#1A56A8',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        fill: false,
        tension: 0.3,
        order: 1,
      },
    ],
  },
  options: {
    ...CHART_DEFAULTS,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(0,0,0,0.10)',
        borderWidth: 1,
        titleColor: '#9B9590',
        bodyColor: '#1A1814',
        titleFont: { family: 'DM Sans', size: 11 },
        bodyFont: { family: 'DM Mono', size: 12 },
        padding: 10,
        callbacks: {
          label: ctx => ctx.parsed.y != null ? ' $' + ctx.parsed.y + 'K' : '',
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: TICK_FONT, color: TICK_COLOR },
        border: { color: GRID_COLOR },
      },
      y: {
        grid: { color: GRID_COLOR },
        ticks: {
          font: TICK_FONT,
          color: TICK_COLOR,
          callback: v => '$' + v + 'K',
        },
        border: { color: 'transparent', dash: [3, 3] },
        min: 340,
        max: 580,
      },
    },
  },
});

// ── DONUT CHART ───────────────────────────────────────────────

new Chart(document.getElementById('donutChart'), {
  type: 'doughnut',
  data: {
    labels: DATA.breakdown.labels,
    datasets: [{
      data: DATA.breakdown.data,
      backgroundColor: DATA.breakdown.colors.map(c => c + 'CC'),
      hoverBackgroundColor: DATA.breakdown.colors,
      borderWidth: 0,
      hoverBorderWidth: 0,
    }],
  },
  options: {
    ...CHART_DEFAULTS,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(0,0,0,0.10)',
        borderWidth: 1,
        titleColor: '#9B9590',
        bodyColor: '#1A1814',
        titleFont: { family: 'DM Sans', size: 11 },
        bodyFont: { family: 'DM Mono', size: 12 },
        padding: 10,
        callbacks: {
          label: ctx => '  ' + ctx.label + ': ' + ctx.parsed + '%',
        },
      },
    },
  },
});

// ── DEPT TABLE ────────────────────────────────────────────────

const statusMeta = {
  over: { label: 'Over budget', cls: 'status-over', barColor: '#F87171' },
  warn: { label: 'Near limit',  cls: 'status-warn', barColor: '#FCD34D' },
  on:   { label: 'On track',    cls: 'status-on',   barColor: '#6EE7B7' },
};

const tbody = document.getElementById('deptBody');

DATA.departments.forEach(dept => {
  const pct = Math.round((dept.spent / dept.budget) * 100);
  const meta = statusMeta[dept.status];
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <div class="dept-name">${dept.name}</div>
    </td>
    <td class="dept-spent">$${dept.spent}K</td>
    <td class="dept-budget">$${dept.budget}K</td>
    <td class="usage-col">
      <div class="bar-wrap">
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.min(pct,100)}%; background:${meta.barColor};"></div>
        </div>
        <span class="bar-pct">${pct}%</span>
      </div>
    </td>
    <td><span class="status-badge ${meta.cls}">${meta.label}</span></td>
  `;
  tbody.appendChild(tr);
});

// ── TRAVEL LIST ───────────────────────────────────────────────

const travelList = document.getElementById('travelList');

DATA.travel.forEach(item => {
  const el = document.createElement('div');
  el.className = 'travel-item';
  el.innerHTML = `
    <div class="travel-icon" style="background:${item.bg}">${item.icon}</div>
    <div class="travel-info">
      <div class="travel-name">${item.name}</div>
      <div class="travel-sub">${item.sub}</div>
    </div>
    <div class="travel-amt">${item.amt}</div>
  `;
  travelList.appendChild(el);
});

// ── ALERTS ────────────────────────────────────────────────────

const alertsList = document.getElementById('alertsList');

DATA.alerts.forEach(alert => {
  const el = document.createElement('div');
  el.className = `alert-item alert-item--${alert.type}`;
  el.innerHTML = `
    <div class="alert-text">
      <strong>${alert.title}</strong>
      <span>${alert.body}</span>
    </div>
  `;
  alertsList.appendChild(el);
});

// ── PERIOD SWITCHER ───────────────────────────────────────────

document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});
