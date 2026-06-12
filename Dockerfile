FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npx tsc

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY content ./content
COPY assets ./assets
RUN mkdir -p data

EXPOSE 3000
CMD ["node", "--experimental-sqlite", "dist/index.js"]
