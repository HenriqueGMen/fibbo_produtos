FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

EXPOSE 3000

CMD ["npm", "run", "start"]
