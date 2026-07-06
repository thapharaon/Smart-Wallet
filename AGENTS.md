# Smart Wallet

Single-file offline personal finance tracker.

## Project structure

Only `index.html` — all JS, CSS, and HTML in one file.

## Run

Open `index.html` in browser. No build step, no server, no install.

## Dependencies (CDN — internet required)

- Tailwind CSS 4 (Browser CDN)
- Chart.js (doughnut charts)
- Font Awesome 6

## Data persistence

All data in `localStorage`. Keys:
- `smart_wallet_txs` — transactions array
- `smart_wallet_budgets` — budget limits dict
- `smart_wallet_cats` — categories (per type)
- `smart_wallet_theme` / `smart_wallet_hex` — theme color
- `smart_wallet_lang` — locale (`vi` / `en`)
- `smart_wallet_currency` — currency symbol
- `smart_wallet_warn_orange` / `smart_wallet_warn_red` — budget thresholds

Clear data via Settings > Danger Zone > Clear All, or `localStorage.clear()` in console.

## Language

Default: Vietnamese (`vi`). English (`en`) supported. Switch in Settings.

## No tooling

No tests, lint, typecheck, bundler, or package manager.

## Git

Remote: `git@github.com:thapharaon/Smart-Wallet.git`
One branch: `main`

## Editing

Open `index.html`, edit inline `<script>` and `<style>`. All IDs prefixed with `lbl-` are localization targets in `langDict`.
