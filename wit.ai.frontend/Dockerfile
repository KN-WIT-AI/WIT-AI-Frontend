FROM node:21-alpine

WORKDIR /

COPY ./express-package.json /package.json
RUN npm install

COPY ./build /build
COPY ./server.js /server.js

EXPOSE 3000

CMD node server.js
