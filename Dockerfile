# This stage installs our modules
FROM mhart/alpine-node:12 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12 AS serverdeps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn add daruk

FROM deps AS builder
COPY . .
RUN yarn build
RUN npx tsc -p tsconfig.server.json

FROM serverdeps AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/server.js ./
COPY --from=builder /app/server ./server

ENV NODE_ENV=production
ENV BASE_PATH=/next-daruk
CMD ["node","server.js"]