FROM node:10.11.0-alpine

# Set working directory for any command that follows
WORKDIR /auth-service

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

# Copy everything from the root dir to the working directory
COPY . .

EXPOSE 3001

CMD [ "npm", "start"]