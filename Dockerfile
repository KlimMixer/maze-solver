FROM node:14.17.1-alpine3.12 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
