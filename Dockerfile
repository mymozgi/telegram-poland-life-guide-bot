FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npx tsc

FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY content ./content
COPY assets ./assets
RUN mkdir -p data

EXPOSE 3000
CMD ["node", "dist/index.js"]
