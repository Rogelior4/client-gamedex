# Gamedex Client

A modern front-end application built with React, TypeScript, and Material UI for managing personal video game collections.

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **UI Components:** Material UI (MUI v7), Emotion
- **HTTP Client:** Axios
- **Typography:** Roboto, Poppins

## Key Features

- **Dynamic Cover Art:** Live cover integration with Steam's library art (600x900).
- **Collection Management:** Add and delete games with smooth instant UI updates.
- **Search & Filtering:** Real-time client-side filtering by game title or platform.
- **Dark / Light Theme:** Custom Material UI theme with persistent color mode toggle.
- **Responsive Layout:** Adaptive grid presentation optimized for desktop and mobile devices.

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

The application will be accessible at `http://localhost:3001`.
