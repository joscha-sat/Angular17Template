
### STAGE 1: Build ###
FROM node:22-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build



### STAGE 2: NGINX ###
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/browser /usr/share/nginx/html
COPY --from=builder /app/dist/3rdpartylicenses.txt /usr/share/nginx/html/

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
