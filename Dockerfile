FROM node:20-alpine AS development-dependencies-env
COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
COPY . /app/
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY ./package.json ./package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
COPY ./healthcheck.js /healthcheck.js
WORKDIR /app
EXPOSE $PORT
CMD ["npm", "run", "start"]
HEALTHCHECK --interval=30s --timeout=1s --start-period=30s --retries=2 CMD node /healthcheck.js
