FROM alpine:3.11

COPY ./dist/nextclade-alpine /usr/bin/nextclade

RUN apk add --update --no-cache \
  libstdc++ \
> /dev/null

CMD ['/usr/bin/nextclade']
