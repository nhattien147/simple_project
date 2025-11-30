# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package.json package-lock.json* ./

# Install dependencies (use npm ci when lockfile is present)
RUN npm ci --only=production && npm cache clean --force

# Copy app source
COPY . .

# Runtime stage
FROM node:20-alpine
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the production node_modules from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Switch to non-root user
USER appuser 

# Expose the port the app listens on
EXPOSE 6969

ENTRYPOINT ["node", "server.js"]

