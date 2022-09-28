FROM node:16-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN mkdir config && touch config/server1.json

CMD [ "npm", "start" ]
