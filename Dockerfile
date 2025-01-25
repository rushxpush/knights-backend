FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]