FROM node:6.10

ADD entrypoint.sh   /usr/src/apis/
ADD apis/           /usr/src/apis/
WORKDIR /usr/src/apis/

RUN npm install

EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]