FROM oven/bun:1-alpine
WORKDIR /app

COPY package.json bunfig.toml bun.lock ./
COPY apps/server/package.json ./apps/server/
RUN bun install --frozen-lockfile --production

COPY apps/server ./apps/server

EXPOSE 3001
CMD ["bun", "apps/server/api/src/index.ts"]
