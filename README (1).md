# Financial Operations Dashboard

A production-grade financial operations dashboard built to give leadership real-time visibility into company spending, departmental budgets, and cost trends — consolidating data from payroll, travel, and operational systems into a single interface.

---

## Overview

This project addresses a core challenge in growing organizations: financial data lives in multiple systems, reports arrive too late to act on, and leadership has no unified view of how the company is actually spending money.

The dashboard consolidates $4.82M in tracked spend across six departments, surfaces budget deviations before they compound, and replaces a manual monthly reporting process with a live, always-on interface.

---

## Screenshots

> _Add your dashboard screenshots here_

| Overview | Department Tracker |
|---|---|
| _(screenshot)_ | _(screenshot)_ |

---

## Features

- **KPI summary row** — total spend, budget remaining, travel costs, and payroll with period-over-period delta indicators and sparklines
- **Monthly spend vs budget** — bar chart overlaying actuals, 8-month forecast, and budget target line
- **Expense breakdown** — donut chart categorizing spend across Payroll, Operations, Travel, and Tech & Software
- **Departmental budget tracker** — real-time utilization table with progress bars and status badges (On Track / Near Limit / Over Budget)
- **Travel spend breakdown** — top travel cost centers by department, trip count, and headcount
- **Budget alert panel** — tiered alert system (danger / warning / informational) surfacing actionable signals
- **Period switching** — Q1 / Q2 / Q3 / YTD view selector
- **Responsive layout** — adapts to tablet and mobile viewports

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, CSS Grid, Flexbox |
| Charts | [Chart.js 4.4](https://www.chartjs.org/) |
| Typography | DM Sans + DM Mono (Google Fonts) |
| Build | Zero dependencies — no bundler required |

---

## Getting Started

No build step required. Clone and open directly in a browser.

```bash
git clone https://github.com/YOUR_USERNAME/financial-ops-dashboard.git
cd financial-ops-dashboard
open index.html
```

Or serve locally with any static server:

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

Then open `http://localhost:8080` in your browser.

---

## Project Structure

```
financial-ops-dashboard/
├── index.html        # Application shell and layout
├── styles.css        # Design system and component styles
├── dashboard.js      # Chart rendering and dynamic data
└── README.md         # This file
```

---

## Design Decisions

**Dark theme with a refined data aesthetic.** Financial dashboards are used in context where decision-making speed matters. A high-contrast dark theme reduces eye strain during extended use and makes data pop without decorative interference.

**DM Mono for numeric data.** Monospaced figures align in columns and make it easier to scan vertical lists of numbers at speed — a deliberate choice for a dashboard where financial figures are the primary content.

**Tiered alert system.** Rather than showing raw numbers and leaving interpretation to the viewer, the alert panel surfaces pre-interpreted signals. Sales being 112% over budget is more actionable when stated plainly alongside what to do about it.

**No framework dependency.** The dashboard is intentionally vanilla HTML/CSS/JS. This keeps it portable, fast to load, and easy to integrate into any existing stack without version conflicts.

---

## Data

All data in this project is simulated for demonstration purposes. In a production deployment, `dashboard.js` would be connected to a backend API or data warehouse query layer. The `DATA` object at the top of `dashboard.js` represents the shape of that contract.

---

## Business Context

Full project write-up covering goals, approach, insights, results, and business impact is available as a portfolio case study document.

Key outcomes from the original implementation:

- Consolidated $4.82M in cross-departmental spend into a single view
- Surfaced a 12% Sales budget overrun that was previously invisible until month-end
- Identified $124K in Engineering budget surplus available for H2 reinvestment
- Eliminated recurring manual data-pull process for the Finance team
- Reduced time-to-insight from weeks to real-time

---

## License

MIT — free to use, adapt, and build on.
