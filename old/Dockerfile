FROM node:20-alpine AS builder
MAINTAINER Amadeusz Starzykiewicz <megawebmaster@gmail.com>

WORKDIR /app

ARG PUBLIC_URL=http://localhost:3000
ARG REACT_APP_API_URL=http://localhost:8080
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install -s

# Copy sources
COPY . .

# Build package
RUN yarn build

FROM nginx:stable-alpine AS runner
MAINTAINER Amadeusz Starzykiewicz <megawebmaster@gmail.com>

COPY --chmod=0755 docker/nginx/default.conf.template /etc/nginx/templates/

WORKDIR /usr/share/nginx/html

# Copy built package
COPY --from=builder /app/build/ ./
