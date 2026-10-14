# Gamedex Client

A modern front-end application built with React, TypeScript, and Material UI for managing personal video game collections with full multi-platform store compatibility.

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **UI Components:** Material UI (MUI v7), Emotion
- **HTTP Client:** Axios
- **Typography:** Outfit, Plus Jakarta Sans, Roboto, Poppins

## Key Features

- **Multi-Store Dynamic Cover Art:** Live cover integration across Steam (600x900 library art), Epic Games Store, Nintendo eShop, Riot Games, Battle.net, EA App, Ubisoft Connect, Xbox, and PlayStation.
- **Universal Game Search:** Autocomplete searching across all platforms with one-click store filtering chips.
- **Store & Launcher Direct Actions:** Dynamic store buttons ("Ver en Steam", "Ver en Epic Games", "Ver en Nintendo eShop", etc.) and desktop launcher links (`steam://`, `riotclient://`, `battlenet://`, `uplay://`, etc.).
- **Collection Management:** Full CRUD operations with instant UI updates, status tracking, rating, favorite toggles, and hours played.
- **Search & Filtering:** Real-time client-side filtering by title, gaming status (Jugando, Completados, Pendientes, Deseados, Favoritos), and platform.
- **Dark / Light Theme:** Custom Material UI theme with persistent color mode toggle and glowing gaming aesthetics.
- **Responsive Layout:** Adaptive grid presentation optimized for desktop, tablets, and mobile devices.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Gamedex Server](https://github.com/Rogelior4/server-gamedex) running locally at `http://localhost:3000`

## Getting Started

### 1. Installation

```bash
git clone https://github.com/Rogelior4/client-gamedex.git
cd client-gamedex
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
# Windows PowerShell / CMD
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Default variables in `.env`:

```env
PORT=3001
BROWSER=none
REACT_APP_API_URL=http://localhost:3000
```

> **Note:** The client is configured to run on port `3001` to avoid port collisions with the NestJS backend on port `3000`.

### 3. Start Development Server

```bash
npm start
```
