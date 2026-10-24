
# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first for build caching
COPY package.json package-lock.json ./

# Install dependencies needed for the Vite build
RUN npm ci

# Copy source code and build production assets
COPY . .
RUN npm run build

# Stage 2: Serve static assets with Nginx
FROM nginx:alpine

# Replace the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the compiled frontend into the runtime image
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
