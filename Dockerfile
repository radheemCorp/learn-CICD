FROM node:lts-alpine AS builder
WORKDIR /app
COPY yarn.lock package.json tsconfig.json  tsconfig.build.json ./
RUN apk update && apk add --no-cache python3
ENV PYTHON /usr/bin/python3
RUN apk update && apk add --no-cache build-base
RUN yarn cache clean
RUN yarn --frozen-lockfile
COPY src ./src
COPY local ./local
RUN yarn install
RUN yarn build
RUN yarn install --pure-lockfile --production


#fresh image for output
FROM node:lts-alpine
WORKDIR /app

COPY yarn.lock package.json tsconfig.json tsconfig.build.json ./
COPY --from=builder  /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# Setup ubuntu environment for to be able to use glibc compiled binaries
RUN apk update && apk upgrade && apk add --no-cache gcompat

ENTRYPOINT ["sh", "-c", "yarn start:prod"]