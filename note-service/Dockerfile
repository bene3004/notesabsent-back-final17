FROM golang:1.23.5-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o note-service .

EXPOSE 8081

CMD [ "./note-service" ]