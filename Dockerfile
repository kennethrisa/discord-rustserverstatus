FROM node:14-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD [ "npm", "start" ]