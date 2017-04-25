FROM node:6.10

ADD entrypoint.sh .
ADD apis/ /usr/src/apis/

RUN npm install

EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]