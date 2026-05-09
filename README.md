# Vibe Aquarium

A 3D aquarium demo showcasing **WithVibe**: clients chat with the system and modify the running app — add fish, change behaviors, add features, change physics, anything.

The starter is intentionally minimal so that AI-driven changes feel dramatic.

## Stack

- Next.js 14 (App Router) — frontend + API in one service
- React Three Fiber + drei — 3D scene, declarative and easy for AI to modify
- SQLite (better-sqlite3) — single-file persistence
- Single Docker container

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

## Run in Docker

Copy the env template first:

```bash
cp .env.example .env
# edit values as needed
```

### Standalone mode (local / single instance)

```bash
docker compose up --build
# http://localhost:3000  (or whatever PORT you set in .env)
```

### Traefik mode (per-client sandboxes behind a reverse proxy)

Each client gets their own deployment, each on its own subdomain, all
routed by a shared Traefik instance. Pre-reqs on the host:

```bash
# one-time: create the shared network Traefik listens on
docker network create traefik
# (and have a Traefik container running on that network)
```

Then per client, set `CLIENT_ID` and `HOSTNAME` in `.env` and run:

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

The overlay strips the host port (`ports: !reset []`) so only Traefik
talks to the container, and adds the routing labels driven by `.env`.

State persists in the `aquarium-data` named volume per project directory.

## Project shape

```
src/
  app/
    page.tsx              # entry — renders the Aquarium
    api/state/route.ts    # GET aquarium state
  components/
    Aquarium.tsx          # the 3D scene
    Fish.tsx              # one fish entity
  lib/
    db.ts                 # SQLite setup + seed
```

## Things to ask WithVibe to add

- "Add a shark that chases the small fish"
- "Make it nighttime with bioluminescent jellyfish"
- "Add a feed button that drops food pellets"
- "Give every fish a name tag"
- "Add bubbles rising from the floor"
- "Let visitors click a fish to rename it"
