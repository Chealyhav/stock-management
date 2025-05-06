# Build stage for frontend
FROM node:16-alpine as frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:frontend

# Build stage for backend
FROM node:16-alpine as backend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:backend
RUN npm run build:backend


# Production stage
FROM node:16-alpine as production-stage
WORKDIR /app

# Copy frontend build
COPY --from=frontend-build /app/dist /app/dist

# Copy backend build
COPY --from=backend-build /app/server.js /app/server.js

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3002

# Command to run the application
CMD ["node", "server.js"]