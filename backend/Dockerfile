FROM node:6.10

ADD apis/ /usr/src/apis/
WORKDIR /usr/src/apis/

RUN npm install

EXPOSE 8000

CMD ["node", "bin/www"]