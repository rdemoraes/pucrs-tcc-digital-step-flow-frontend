# Multi-stage build for frontend
# Stage 1: Build
# checkov:skip=CKV_DOCKER_7: Base image uses specific version tag (24.13.0-r1-dev) via ARG, not 'latest'
ARG NODEJS_VERSION=24.13.0-r1
FROM raphaelmoraes/digital-step-flow-base-node:${NODEJS_VERSION}-dev AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production - Frontend with Nginx
# checkov:skip=CKV_DOCKER_7: Base image uses specific version tag (24.13.0-r1) via ARG, not 'latest'
ARG NODEJS_VERSION=24.13.0-r1
FROM raphaelmoraes/digital-step-flow-base-node:${NODEJS_VERSION}

# Install nginx and wget for healthcheck
RUN apk add --no-cache nginx=1.28.0-r8 wget=1.25.0-r2

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Create /tmp directory for nginx PID file (logs go to stdout/stderr)
RUN mkdir -p /tmp && \
    chown -R appuser:appuser /usr/share/nginx/html /tmp

# Switch to non-root user
USER appuser

# Expose ports for application, health, and metrics
EXPOSE 3000 3001 3002

# Healthcheck - check nginx health endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
