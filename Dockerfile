FROM node:20.10-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./src src/

CMD [ "npm", "run", "dev" ]
