FROM golang:1.23.5-alpine

WORKDIR /app

COPY package*.json /.
RUN npm install

COPY . .

CMD ["npm", "run-script", "dev"]
EXPOSE 4001