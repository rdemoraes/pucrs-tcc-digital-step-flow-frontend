# Multi-stage build for frontend
# Stage 1: Build
# checkov:skip=CKV_DOCKER_7: Base image uses specific version tag (24.13.0-r1-dev) via ARG, not 'latest'
ARG BASE_IMAGE_DEV=raphaelmoraes/digital-step-flow-base-node:24.13.0-r1-dev
FROM ${BASE_IMAGE_DEV} AS builder

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

# Stage 2: Production - Frontend static files only (nginx runs as sidecar)
# checkov:skip=CKV_DOCKER_7: Base image uses specific version tag (24.13.0-r1) via ARG, not 'latest'
ARG BASE_IMAGE_PROD=raphaelmoraes/digital-step-flow-base-node:24.13.0-r1
FROM ${BASE_IMAGE_PROD}

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Change ownership
RUN chown -R appuser:appuser /usr/share/nginx/html

# Switch to non-root user
USER appuser

# Expose port (for healthcheck, but nginx sidecar will serve on 3000)
EXPOSE 3000

# Healthcheck - verify container is running (nginx sidecar handles HTTP healthchecks)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD pgrep -f "sleep infinity" || exit 1

# Keep container running (nginx sidecar will serve the files)
CMD ["sleep", "infinity"]
