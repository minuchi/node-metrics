FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app

RUN yarn --production

COPY --from=builder /app/dist /app/dist

CMD ["node", "dist/index.js"]
