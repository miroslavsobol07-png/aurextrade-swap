# AurexTrade Swap / Bridge UI

Frontend test task built with React, Vite, JavaScript and plain CSS.
Dark responsive UI follows the supplied reference and Aurex Brand Book.

## Run locally

Requires Node.js 22.12+; verified with Node.js 24.16.0 and npm 11.13.0.
From the project directory:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm ci` instead of `npm install` for a
reproducible installation from the lockfile. On PowerShell, use `npm.cmd` if the
execution policy blocks `npm.ps1`.

## Production build and checks

```sh
npm run build
npm run preview
npm run lint
npm test
```

Build output is written to `dist/`. Preview serves that build locally.
Tests use the native Node.js test runner; lint uses Oxlint.

## Implemented

- Responsive Swap widget with desktop, tablet and mobile layouts.
- Live USDT ↔ EMT calculation, decimal input validation and token Reverse.
- Network dropdown with keyboard navigation.
- Independent Slippage and Tip groups, including Custom percentages.
- Minimum received derived from the selected slippage.
- Cross-Chain mock mode with independent From/To networks, direction switch,
  same-network prevention and dynamic Route.
- Accessible labels, semantic controls, tab/radio keyboard navigation and visible focus.
- Separate Swap/Bridge state retained between tabs for the current page session.
- Locally served Poppins 400/500/600 and CSS design tokens.

## Demo scope

No backend, API, blockchain or wallet connection is integrated. Networks and the
exchange rate (`1 USDT = 518.1816 EMT`) are mock data. Price Impact is fixed at
0.12%; estimated fee is fixed at 1.5545 EMT. Tip selection does not change the quote.

Limit is an intentional placeholder: limit-order business logic was not specified.
Settings and token selector buttons are presentation controls. Token symbols are
illustrative, not supplied official assets. Connect Wallet is a styled mock CTA.

Amounts/minimum display up to 4 decimal places, reverse rate up to 8. Calculations
use JavaScript Number; this is a UI exercise, not a production financial engine.
Custom percentages accept 0–100%. Reload resets the session; no localStorage is used.

## Structure

`src/components/` contains the UI; `constants/` and `data/` hold mock data;
`utils/` contains validation/calculations; `styles/` contains global tokens and UI CSS.
Pure-logic tests are in `tests/`.
