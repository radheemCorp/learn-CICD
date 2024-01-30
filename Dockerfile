# Builder Stage
FROM node:lts-alpine AS builder
WORKDIR /usr/src/app

COPY yarn.lock package.json tsconfig.json tsconfig.build.json ./
COPY src ./src

RUN apk update \
    && apk add --no-cache python3 build-base \
    && export PYTHON=/usr/bin/python3 \
    && yarn cache clean \
    && yarn --frozen-lockfile \
    && yarn install \
    && yarn build \
    && yarn install --pure-lockfile --production

# Production image Stage
FROM node:lts-alpine
WORKDIR /app

# Copying only necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Creating a new non-root user
RUN adduser -D radheem

# Switching to the non-root user
USER radheem

CMD ["sh", "-c", "yarn start:prod"]
