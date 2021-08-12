FROM node:14.17.4-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn

ENV NODE_ENV=production

EXPOSE 9000/tcp

ENTRYPOINT ["node", "src/index.js"]