FROM --platform=linux/amd64 node:16.16-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start"]