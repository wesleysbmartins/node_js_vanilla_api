FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
