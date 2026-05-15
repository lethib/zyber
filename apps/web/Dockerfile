FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bunfig.toml bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY apps/server/package.json ./apps/server/
RUN bun install --frozen-lockfile

COPY apps/web ./apps/web
COPY apps/server ./apps/server

RUN cd apps/web && bun run build

FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
