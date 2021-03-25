FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
RUN npm install node-zabbix-sender -g
RUN npm install pm2 -g
RUN npm install express -g
RUN npm install ejs -g
RUN npm audit fix

COPY . .

EXPOSE 80

CMD ["npm", "start"]