FROM --platform=linux/amd64 node:16.16-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run" ,"start:dev"]