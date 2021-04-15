FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npm.taobao.org --global
RUN npm install
COPY . .
EXPOSE 80

CMD [ "npm", "start" ]
