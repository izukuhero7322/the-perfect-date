# The Perfect Date 💕

A creative interactive dating personality quiz. Answer 7 real-life
dating scenarios and discover your date personality — complete with
a personality breakdown, a custom perfect-date itinerary, and a
shareable result.

No backend, no build step, no frameworks. Open it and play.

## Features

- Interactive 7-question scenario-based quiz
- Hidden personality scoring across 6 categories (romantic, adventurous,
  chill, spontaneous, foodie, dreamer) — deterministic, never random
- Animated multi-step result reveal
- Animated personality breakdown bars
- Personalized "perfect date" itinerary
- Result sharing via the Web Share API, with a clipboard fallback
- Remembers your name via LocalStorage (and degrades gracefully without it)
- Fully responsive: mobile, tablet, desktop
- Respects `prefers-reduced-motion`
- No backend required — 100% static

## How to Run

Open `index.html` in any modern browser. That's it.

```bash
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

Or serve it locally for a closer-to-production feel:

```bash
npx serve .
```

## Project Structure

```text
the-perfect-date/
│
├── index.html            Main single-page app (all 4 screens live here)
├── README.md              This file
├── .gitignore
│
├── css/
│   ├── style.css          Variables, typography, layout, cards, buttons
│   ├── animations.css     Keyframes + prefers-reduced-motion handling
│   └── responsive.css     Mobile / tablet / desktop breakpoints
│
├── js/
│   ├── app.js              Entry point — DOM wiring, screen switching
│   ├── questions.js         Quiz question + scoring data (no UI logic)
│   ├── results.js           Personality result definitions
│   ├── game.js               Quiz state: current question, scores, result logic
│   ├── animations.js         Reusable effects: hearts, progress, reveal sequence
│   ├── storage.js            LocalStorage wrapper with safe fallbacks
│   └── share.js               Web Share API + clipboard fallback
│
├── assets/
│   ├── images/              Optional imagery (app works fine without any)
│   ├── icons/                Optional SVG icons
│   └── sounds/                Optional sound effects (not required)
│
└── pages/
    └── result.html          Placeholder for a future shareable result URL
```

The app is intentionally asset-optional: if `assets/` is empty, everything
still works because all visuals are built from CSS gradients, emoji, and
animation — no image or audio file is required for the experience to run.

## How Scoring Works

Every answer silently contributes points to one or more of six hidden
categories. After the final question, the category with the highest
score wins. Ties are broken using a fixed priority order defined in
`results.js` (`TIE_BREAK_ORDER`) — the outcome is always deterministic.

## Future Improvements

- Backend + persistent user accounts
- Database-backed result history
- More quiz packs (friendship, career, travel personality, etc.)
- Dating profile matching between two completed quizzes
- AI-generated, personalized date ideas
- Online leaderboard / most common personality stats
- Per-result shareable URLs (`pages/result.html?type=romantic`)

## Future Architecture (not built in v1)

```text
Frontend
   │
   ↓
Nginx
   │
   ↓
Backend API
   │
   ├── Authentication
   ├── Quiz API
   ├── Result API
   └── User API
          │
          ↓
       Database
```

Version 1 is intentionally 100% frontend — no server, no build tools,
no dependencies.
