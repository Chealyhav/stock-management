# Build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY package*.json ./
COPY server.js ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "server.js"]