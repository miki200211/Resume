# Miki Hsieh — Engineering Portfolio

> **This repository is a static frontend presentation layer.**  
> The Go / Python computation cores behind the quantitative trading and automation projects live in separate private repositories.

🔗 **Live site**: https://miki200211.github.io/Resume/

---

## About

Electronic engineering graduate (NKUST, 2025) with one year of hands-on internship at **Garmin Taiwan AOEM — Customer Service Engineering (CSE)**.  
Built automation tooling in Go / Python, coordinated overseas technical support in Japan, and shipped Android + desktop applications as personal side projects.

**Core positioning**: Automation / systems engineer with an EE foundation and JLPT N2 bilingual (Chinese / Japanese) cross-border capability.

---

## Work Projects — Garmin CSE Internship

Four internal tools built for the AOEM team, all shipped to production:

| Project | Stack | Key Result |
|---|---|---|
| [After-sales Case Tracker](project-case-tracker.html) | Python · Selenium · Tesseract OCR · JIRA API | Automated cross-system case matching; Union-Find grouping eliminates manual follow-up errors |
| [Auto Workflow Integration](project-carmax.html) | Python · Selenium · LLM API · JIRA API · Threading | One-click pipeline: download → match → LLM parse → JIRA upload — **30 min → 2 min** per case |
| [OOW Process Integration](project-oow.html) | Python · Tkinter · JIRA API | Integrated repair quoting + LINE notifications with online-updatable templates — **3 min → 1 min** |
| [Credential Bridge](project-credential-bridge.html) | Go · AES-256-GCM · Windows DPAPI · PBKDF2 · HMAC | **Zero plaintext passwords** stored across all automation scripts |

---

## Personal Projects — Side Work

Quantitative trading systems and mobile apps built off the clock:

| Project | Stack | Note |
|---|---|---|
| [Alpaca — US Stock Quant System](project-stock.html) | **Go** · Alpaca API · Monte Carlo | Point-in-time S&P 500 filter; backtests 8,114-stock universe; CAGR 29.61% *(backtest only)* |
| crypto-dashboard | **Go** · Wails · Parquet · Binance API · goroutines | Full Go port of a ~4,000-line Python quant stack; max-drawdown hard cap + monthly circuit-breaker |
| MemeWatch | **Kotlin** · Jetpack Compose · Wear OS · Room | Meme soundboard for Android + Wear OS; AdMob + Google Play Billing; signed .aab |
| Book of Fate | **Kotlin** · Compose · Gemini API | Shake-to-query oracle book with server-side Gemini integration |
| SoftEther VPN Bridge | **Go** · VPNGate API | Auto NIC check, quality scoring, one-click connect via browser GUI |
| AI_Web | **Go** · NIC Binding · HTTP Proxy | Dual-network routing to specific domains without virtual drivers |
| Excel → PDF Batch Converter | **Python** · Tkinter · Win32 COM | Batch-converts entire directories of workbooks while preserving page layout |

> **Architecture note — Quant systems:**  
> The trading dashboards shown here are **Go desktop applications**, not browser-based web apps.  
> All heavy computation — VCP screening, Monte Carlo simulation (10,000 paths), backtesting across 8,114 stocks — runs entirely inside the Go binary.  
> This portfolio site displays screenshots and architecture write-ups only; no financial logic runs in the browser.

---

## Portfolio Site — Tech Stack

```
HTML · Vanilla CSS (custom properties) · Vanilla JavaScript
```

Intentionally zero-dependency:

- No build pipeline, no npm, no bundler — just open `index.html`
- Dark / light theme via CSS custom properties (`:root` design tokens)
- Chinese ↔ English via `data-en` attribute swap with `try/catch` guard per element
- Scroll-reveal via `IntersectionObserver`
- Print-to-PDF via `window.print()`

---

## Repository Structure

```
Resume/
├── index.html                      # Landing / home
├── resume.html                     # CV (bilingual, print-to-PDF)
├── projects.html                   # Work projects overview
├── personal.html                   # Personal side projects
├── project-case-tracker.html       # Detail: After-sales Case Tracker
├── project-carmax.html             # Detail: Auto Workflow Integration
├── project-oow.html                # Detail: OOW Process Integration
├── project-credential-bridge.html  # Detail: Credential Bridge (Go)
├── project-stock.html              # Detail: Alpaca US Stock Quant System (Go)
├── assets/
│   ├── style.css                   # Shared styles + CSS design tokens
│   └── app.js                      # Theme / i18n / nav / scroll-reveal
└── images/                         # Screenshots, icons, certificates
```

---

## Key Highlights

- 🇯🇵 **JLPT N2 + Japan on-site deployment** — dispatched to Japan for product rework; served as bilingual (Chinese / Japanese) technical coordinator under live production pressure
- 📈 **Quantitative trading** — Go system backtested at CAGR 29.61%, Sharpe 0.82 over 5.8 years with zero look-ahead bias *(clearly labeled backtest, not live performance)*
- 🔐 **Security-first automation** — zero plaintext credentials across all team scripts via Go credential bridge with AES-256-GCM + DPAPI + HMAC audit logging
- ⚡ **93% efficiency gain** — per-case handling time reduced from 30 min to 2 min via one-click automation pipeline

---

> ℹ️ Internal tool source code and confidential business data are intentionally excluded from this repository.
