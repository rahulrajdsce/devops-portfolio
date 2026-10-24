
# Use a lightweight Node.js 22 image
FROM node:22-alpine

# Set the application working directory
WORKDIR /app

# Copy dependency manifests first for better build caching
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source and database schema
COPY server.js db.js schema.sql ./

# Run the application as a non-root user
USER node

# Document the API port
EXPOSE 3001

# Start the API server
CMD ["npm", "start"]
