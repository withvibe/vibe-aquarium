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

```bash
docker compose up --build
# http://localhost:3000
```

To run on a different host port, set `PORT` in `.env` (see `.env.example`).
State persists in the `aquarium-data` named volume.

## Deploying with WithVibe

This template is designed to be deployed by WithVibe. The platform's
compose-rewriter handles per-env subdomain routing automatically — it
strips host ports, attaches the service to its proxy network, and
generates the right `Host(...)` Traefik labels per env. The template
itself declares zero variables; the platform injects what it needs.

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

## License

[Apache License 2.0](LICENSE). Built by [WithVibe](https://withvibe.dev).
