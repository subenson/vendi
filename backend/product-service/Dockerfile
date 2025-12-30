FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package.json ./

COPY backend ./backend
RUN npm install

RUN npm run build --workspace=@vendi/core

COPY backend/product-service/dev-entrypoint.sh /app/dev-entrypoint.sh
RUN chmod +x /app/dev-entrypoint.sh

WORKDIR /app

CMD ["/app/dev-entrypoint.sh"]
