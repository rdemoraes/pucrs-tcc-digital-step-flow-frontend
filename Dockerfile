# Multi-stage build for frontend
# Stage 1: Build
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

# Stage 2: Production
ARG BASE_IMAGE_PROD=raphaelmoraes/digital-step-flow-base-node:24.13.0-r1
FROM ${BASE_IMAGE_PROD}

# Install nginx and wget for healthcheck
RUN apk add --no-cache nginx wget

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Change ownership
RUN chown -R appuser:appuser /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx && \
    chown -R appuser:appuser /var/log/nginx && \
    chown -R appuser:appuser /etc/nginx/nginx.conf && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appuser /var/run/nginx.pid

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
