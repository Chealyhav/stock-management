# ---------- Build stage ----------
    FROM node:18-alpine AS build

    # Set working directory
    WORKDIR /app
    
    # Install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy source code
    COPY . .
    
    # Build the app (if it's a frontend app like React/Vite)
    # Uncomment below if applicable
    # RUN npm run build
    
    # ---------- Production stage ----------
    FROM node:18-alpine
    
    # Set working directory
    WORKDIR /app
    
    # Copy only the production dependencies
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copy built files or source files
    COPY --from=build /app .
    
    # Use this if it's a frontend app (e.g., built to /app/dist)
    # COPY --from=build /app/dist ./dist
    
    # Environment setup
    ENV NODE_ENV=production
    
    # Expose port (change if needed)
    EXPOSE 3000
    
    # Command to run app
    CMD ["node", "server.js"]
    