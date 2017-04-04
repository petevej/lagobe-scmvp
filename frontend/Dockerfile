#FROM debian:8

#FROM debian:jessie

#RUN apt-get update;


#RUN apt-get install -y nginx

FROM node:6.10.1

#FROM nginx:1.11.12

RUN mkdir -p /usr/src/www
WORKDIR /usr/src/www

#RUN apt-get install -y curl
#RUN curl -sL https://deb.nodesource.com/setup_6.x | -E bash -
#RUN apt-get install -y nodejs

#RUN apt-get install -y nginx
RUN npm install -g gulp
RUN npm install -g bower

RUN mkdir -p app
RUN mkdir -p assets

COPY index.html     /usr/src/www/
COPY app/           /usr/src/www/app
COPY assets/        /usr/src/www/assets
COPY bower.json     /usr/src/www/
COPY package.json   /usr/src/www/
COPY gulpfile.js   /usr/src/www/

#COPY index.html     /usr/share/nginx/html/
#COPY app/           /usr/share/nginx/html/
#COPY assets/        /usr/share/nginx/html/
#COPY bower.json     /usr/share/nginx/html/
#COPY package.json   /usr/share/nginx/html/
#COPY gulpfile.js   /usr/share/nginx/html/

#RUN cd 

RUN bower install --allow-root
RUN npm install --allow-root

EXPOSE 4000

#RUN ls -l

#RUN which gulp

#RUN ls -ld

#RUN gulp connect

CMD ["gulp", "connect"]

#CMD ["ls", "-l"]