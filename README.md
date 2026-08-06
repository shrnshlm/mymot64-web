# לאן? — MyMot64 web app

A tiny, dependency-free **public web app** for Israeli public-transport routing.
Type an origin and destination (or use your location) and get real bus plans with
transfers, times, live-schedule data, and shared scooters nearby.

No account, no login, no paywall — it's a static page that calls the public
**MyMot64** transit API. Installable to the home screen as a PWA.

## How it works

```
index.html  ──fetch──▶  https://89-167-124-21.sslip.io/api/trips/plan?from=…&to=…&time=HH:MM
   (browser)                     (OpenTripPlanner + GTFS/SIRI/GBFS, CORS open)
```

- `from` / `to`: a place name (Hebrew or English), a stop name, or `"lat,lon"`.
- Nearby scooters (Lime/Bird, with battery or range) come back attached to the trip.
- The same API powers the Claude/ChatGPT/Gemini MCP connector — this is just a browser front-end for it.

## Files
- `index.html` — the whole app (inline CSS + JS, RTL Hebrew, theme-aware).
- `manifest.json`, `sw.js`, `icons/` — PWA shell (installable, offline app shell).

## Run locally
```bash
python3 -m http.server 8137   # then open http://localhost:8137
```
(localhost is a secure context, so geolocation + PWA install work.)

## Deploy
Any static host works — GitHub Pages, Netlify, or served by Caddy on the same box
as the API (same-origin, no CORS needed). Because it's one HTML file plus a
manifest, there's no build step.

---
Built on Israel's open transit data (Ministry of Transport GTFS · SIRI real-time · GBFS).
A personal project — real-time can occasionally blink; just try again.
