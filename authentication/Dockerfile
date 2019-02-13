FROM node:10
WORKDIR usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm test
EXPOSE 6010
CMD ["npm", "start"]