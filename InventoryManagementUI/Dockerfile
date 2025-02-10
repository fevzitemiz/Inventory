FROM node:lts-slim as build
WORKDIR /src
RUN npm install -g @angular/cli
COPY . ./
RUN npm install -f
RUN npm ci
RUN ng build --configuration=production
FROM nginx:stable AS final
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build src/dist/inventory-management-ui/browser  /usr/share/nginx/html
EXPOSE 80