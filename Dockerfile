FROM node:lts-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=production

COPY . .

# Create config dir
RUN mkdir /usr/src/app/config

# Create an example config to be able to use container variables (Fix Kubernetes issue)
COPY example_config.json /usr/src/app/config/server1.json

CMD [ "npm", "start" ]