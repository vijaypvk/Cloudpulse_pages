# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./ 

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm install; \
  fi

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Run the Next.js app
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only the needed files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
