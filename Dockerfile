FROM node:14.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src .

EXPOSE 3001

CMD [ "npm", "start" ]