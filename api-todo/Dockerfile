# base image
FROM node:12.2.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./package.json ./package.json
RUN npm config set unsafe-perm true
RUN npm install
RUN npm install -g @adonisjs/cli

# add app
COPY . .

# start app
CMD cp .env.example .env && adonis serve --dev
