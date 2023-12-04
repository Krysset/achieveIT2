# AchieveIT 2 (TS rewrite)

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
Copy the `.env.example` file and rename the new file to `.env` and make changes if necessary.
Then run `pnpm run dev` to start dev environment.

### Building

If you're in root, run `cd backend`.

Run `docker build -t "achieveit" .` to build an image named **achieveit**

## Good commmands to remember

### View database

Run `pnpm prisma studio` in backend

### Update database

Run `pnpm prisma db push` in backend
