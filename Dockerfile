FROM node:14

RUN apt update && apt install -y netcat

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 5000

CMD node dist/server.js
