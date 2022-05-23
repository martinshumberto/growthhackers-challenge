FROM node:alpine

WORKDIR /app

COPY ./packages/web/package.json ./
COPY ./packages/web/yarn.lock ./
COPY ./packages/web ./

RUN yarn
# RUN yarn build

CMD ["yarn", "dev"]