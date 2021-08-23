FROM node:16.7.0-buster-slim

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci  

COPY . .

CMD ./entrypoint.sh 