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
| [Alpaca — US Equities Algorithmic Trading & PIT Backtesting Engine](project-stock.html) | **Go (Golang)** · Wails v2 · Alpaca API · PIT Backtesting · Stationary Block Bootstrap | Self-contained desktop & CLI engine; causal S&P 500 PIT hygiene, dual-engine regime routing, HWM circuit breakers & broker server-side hard stops |
| [crypto-dashboard — 24/7 Crypto Quant Engine](project-crypto-dashboard.html) | **Go (Golang)** · Wails v2 · Binance API · WebSocket · Apache Parquet · Goroutines | 24/7 sub-ms WebSocket in-memory cache, year-partitioned Parquet store (incl. delisted pairs), dynamic concentration rebalancing, MaxDD/monthly circuit breakers & Walk-Forward validation |
| MemeWatch | **Kotlin** · Jetpack Compose · Wear OS · Room | Meme soundboard for Android + Wear OS; AdMob + Google Play Billing; signed .aab |
| Book of Fate | **Kotlin** · Compose | Shake-to-query oracle book fusing classic literature and spatial acoustics |
| AI_Web | **Go** · NIC Binding · HTTP Proxy | Dual-network routing to specific domains without virtual drivers |
| Excel → PDF Batch Converter | **Python** · Tkinter · Win32 COM | Batch-converts entire directories of workbooks while preserving page layout |

> **Architecture note — Quant systems:**  
> The trading systems shown here are **Go + Wails v2 native desktop applications** compiled into self-contained binaries (zero external runtime dependencies), not browser-based web apps.  
> All heavy computation — Binance WebSocket in-memory streaming and year-partitioned Apache Parquet columnar I/O (`crypto-dashboard`), local historical OHLCV caching and causal S&P 500 Point-In-Time (PIT) backtesting (`Alpaca`), Walk-Forward validation, and Block Bootstrap stress testing — runs natively inside the Go binaries.  
> This portfolio site displays architecture write-ups only; proprietary alpha parameters, signal thresholds, and return figures are intentionally omitted, and no financial logic runs in the browser.

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
├── project-stock.html              # Detail: Alpaca US Equities & PIT Backtesting Engine (Go)
├── project-crypto-dashboard.html   # Detail: 24/7 Crypto Quant Engine (Go)
├── assets/
│   ├── style.css                   # Shared styles + CSS design tokens
│   └── app.js                      # Theme / i18n / nav / scroll-reveal
└── images/                         # Screenshots, icons, certificates
```

---

## Key Highlights

- 🇯🇵 **JLPT N2 + Japan on-site deployment** — dispatched to Japan for product rework; served as bilingual (Chinese / Japanese) technical coordinator under live production pressure
- 📈 **Quantitative trading & bias-free backtesting** — Self-contained Go + Wails v2 engines across US equities (`Alpaca`: causal S&P 500 PIT hygiene, dual-engine regime routing, Stationary Block Bootstrap, HWM breakers & broker server-side hard stops) and crypto (`crypto-dashboard`: 24/7 sub-ms WebSocket in-memory cache, Apache Parquet store incl. delisted pairs, multi-stage stops & drawdown circuit breakers)
- 🔐 **Security-first automation** — zero plaintext credentials across all team scripts via Go credential bridge with AES-256-GCM + DPAPI + HMAC audit logging
- ⚡ **93% efficiency gain** — per-case handling time reduced from 30 min to 2 min via one-click automation pipeline

---

> ℹ️ Internal tool source code and confidential business data are intentionally excluded from this repository.
