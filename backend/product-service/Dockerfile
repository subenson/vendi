FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make

COPY . /app

RUN npm install --force

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
