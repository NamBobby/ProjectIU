FROM node:14.17.5-alpine

WORKDIR /app
COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 3000