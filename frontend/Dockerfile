FROM node:17-bullseye
COPY . /app
WORKDIR /app

# Install dependencies
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "preview"]