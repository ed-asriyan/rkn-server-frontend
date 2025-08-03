FROM node:24 as dev

FROM dev as base

WORKDIR /app

COPY .npmrc .
COPY package.json .
COPY package-lock.json .

RUN npm ci
# https://github.com/npm/cli/issues/4828#issuecomment-1972072806
RUN npm i --no-save -O @rollup/rollup-linux-x64-gnu @rollup/rollup-linux-arm64-gnu

COPY svelte.config.js .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY index.html .
COPY src src

FROM base as builder
ARG NODE_ENV
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_KEY
ARG VITE_VERSION
ARG VITE_ORIGIN
ARG VITE_SUPPORT_LINK

RUN npm run build -- --mode $NODE_ENV

FROM scratch as bundle
COPY --from=builder /app/dist /dist
ENTRYPOINT sh

FROM nginx as app
COPY --from=bundle /dist /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf
