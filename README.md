# AchievIT 2 (TS rewrite)

A rewrite and update of IT:s achievement service.

## Requirements

- NodeJS
- pnpm
- docker

## Running

### Starting dev docker

Run `docker compose -f docker-compose.dev.yml up -d` to start dev docker

### Backend

If you're in root, run `cd backend`.
Run `pnpm install` to download all dependencies.
Then run `pnpm run dev` to start dev environment.

## Good commmands to remember

### View database

Run `pnpm prisma studio` in backend

### Update database

Run `pnpm prisma db push` in backend
