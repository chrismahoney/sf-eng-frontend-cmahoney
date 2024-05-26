FROM node:18-alpine

WORKDIR /app/frontend

COPY public/ /app/frontend/public
COPY src/ /app/frontend/src
COPY package.json /app/frontend/

RUN npm i
RUN ["npm", "start"]

EXPOSE 3000
