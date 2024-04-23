FROM node:21.6.2 
WORKDIR /app
COPY package.json .
COPY package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 5000
CMD ["node", "./index.js"]