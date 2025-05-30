FROM node:22.16-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN mkdir config && echo '{"debug":false}' > config/server1.json

CMD [ "npm", "start" ]
