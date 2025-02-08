FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]