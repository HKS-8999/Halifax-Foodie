# DOCKER FILE TO CREATE THE CONTAINER
# Referenced from: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:alpine 
WORKDIR /usr/src/app 
COPY package*.json ./ 
RUN npm install --save --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm","run","start"]