FROM node:14.17.4-alpine

WORKDIR /app
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn --silent --frozen-lockfile --production
COPY . /app
RUN yarn build
RUN rm -rf node_modules/

RUN npm i -g serve

WORKDIR /app

EXPOSE 5000/tcp
EXPOSE 5000/udp

ENTRYPOINT ["serve", "-s", "build/"]