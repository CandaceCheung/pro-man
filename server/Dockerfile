FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install && \ 
    yarn knex migrate:latest &&\
    cd dist && node app.js