FROM node:17 AS builder
WORKDIR /app
COPY package*.json ./
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN yarn install

FROM node:17-alpine3.14 AS runner
WORKDIR /app

COPY . /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000

CMD ["react-scripts", "--openssl-legacy-provider",  "start"]
