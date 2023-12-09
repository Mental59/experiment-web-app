FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm i

COPY . .

EXPOSE 8080

CMD npm run build && npm run preview
