ARG NODE_VERSION=24-bookworm-slim
FROM node:${NODE_VERSION} AS base
RUN corepack enable
ENV CI=true
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY api/package.json ./api/
COPY web/package.json ./web/
RUN pnpm i --frozen-lockfile

FROM deps AS dev
COPY . .
