FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm i

COPY . .

EXPOSE 5002

CMD npm run build && npm run preview
