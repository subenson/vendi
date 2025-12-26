FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package.json ./

COPY backend ./backend
RUN npm install

RUN npm run build --workspace=@vendi/multi-tenancy

WORKDIR /app/backend/product-service

CMD ["npm", "run", "start:dev"]
