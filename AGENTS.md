# Smart Wallet

Multi-module personal finance tracker with Vite + Tailwind CSS 4.

## Project structure

```
index.html          — HTML only, loads /src/main.js as module
src/
  main.js           — Entry point: imports all modules, exposes window.* for onclick handlers, DOMContentLoaded init
  style.css         — All custom CSS (animations, checkmark, scrollbar, glass-panel transitions)
  state.js          — Shared state object, localStorage load/save, LS_KEYS constants
  lang.js           — Language dictionary (vi/en) and applyLocalization()
  ui.js             — Toast, animateNumber, switchTab, dark/light mode toggle, goHome
  transactions.js   — CRUD, renderAll with pagination, search, loadMore
  calendar.js       — Month navigation, calendar grid rendering
  report.js         — Chart.js doughnut chart, month/type filtering
  budget.js         — Budget CRUD, month-filtered progress bars
  settings.js       — Theme, categories, backup/restore, warning thresholds
```

## Run

```bash
npm install
npm run dev
```

Or open `index.html` directly (CDN dependencies load via Vite in dev, or via npm packages).

## Dependencies

- **Tailwind CSS 4** — via `@tailwindcss/vite` plugin (imported in `src/style.css`)
- **Chart.js 4** — npm package, imported in `src/report.js`
- **Font Awesome 6** — CDN link in `index.html`
- **Vite 6** — dev server and bundler

## Data persistence

All data in `localStorage`. Keys defined in `src/state.js` `LS_KEYS`:
- `smart_wallet_txs` — transactions array
- `smart_wallet_budgets` — budget limits dict
- `smart_wallet_cats` — categories (per type)
- `smart_wallet_theme` / `smart_wallet_hex` — theme color
- `smart_wallet_lang` — locale (`vi` / `en`)
- `smart_wallet_currency` — currency symbol
- `smart_wallet_darkmode` — light/dark mode toggle
- `smart_wallet_warn_orange` / `smart_wallet_warn_red` — budget thresholds

## Language

Default: Vietnamese (`vi`). English (`en`) supported. Switch in Settings.

## Architecture

- `index.html` contains zero inline JS/CSS — all logic in ES modules under `src/`
- All `onclick`/`onsubmit`/`onchange` handlers in HTML reference `window.*` functions exported from `src/main.js`
- Dark/light mode uses CSS class toggling via `.toggle` class groups (no Tailwind `dark:` prefix)
- State is centralized in `src/state.js` and imported by all modules

## Git

Remote: `git@github.com:thapharaon/Smart-Wallet.git`
One branch: `main`
