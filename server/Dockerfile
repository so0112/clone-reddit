FROM node:14.14.0-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm install pm2 -g
RUN npm install ts-node -g 
RUN pm2 install typescript

# CMD ["npm", "run", "dev"]
CMD ["pm2", "start", "src/server.ts", "--watch"]

# CMD ["pm2", "start", "ecosystem.config.js", "--env", "production", "--watch"]

# CMD ["npm", "run", "dev"]