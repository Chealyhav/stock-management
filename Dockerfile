# =============================
# 🧱 Build Frontend (Vue)
# =============================
FROM node:18-alpine AS frontend-build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build Vue frontend (assumes code is in src/)
RUN npm run build:frontend


# =============================
# 🚀 Production Image
# =============================
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --production

# Copy backend files (assuming server.js is your backend entry point)
COPY server.js .          
# Or server.ts if transpiled before

# Copy frontend build output
COPY --from=frontend-build /app/dist ./dist

# Expose backend port
EXPOSE 3002

# Start the server
CMD ["node", "server.js"]
