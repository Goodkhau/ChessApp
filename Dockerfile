FROM node:24.14.0 AS builder


WORKDIR /ChessApp

COPY Frontend/ChessApp/ .
RUN npm i
RUN npm run build


FROM nginx:latest

RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /ChessApp/dist /usr/share/nginx/html

EXPOSE 8080