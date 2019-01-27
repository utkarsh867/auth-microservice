FROM node:11
WORKDIR usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm test
EXPOSE 6020
CMD ["npm", "start"]