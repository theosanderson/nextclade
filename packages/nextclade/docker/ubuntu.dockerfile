FROM ubuntu:focal

COPY ./dist/nextclade-linux /usr/bin/nextclade

CMD ['/usr/bin/nextclade']
