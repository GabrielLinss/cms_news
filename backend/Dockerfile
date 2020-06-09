FROM node:10-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .
EXPOSE 3333
CMD [ "yarn", "start" ]
