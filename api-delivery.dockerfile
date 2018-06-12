FROM node:8.9.4
MAINTAINER Jaison Pereira
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT [ "npm","start" ]
EXPOSE 3000