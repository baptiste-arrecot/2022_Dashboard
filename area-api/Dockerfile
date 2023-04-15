FROM node:17 as builder
WORKDIR /app
COPY package*.json ./
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install

FROM node:17-alpine3.14 as runner

WORKDIR /app

COPY . /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 4000

CMD ["node", "src/server.ts"]
