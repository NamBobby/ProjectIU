FROM node:latest    

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]

