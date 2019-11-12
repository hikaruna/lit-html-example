FROM node

WORKDIR /
COPY package.json package-lock.json ./
RUN npm i && npm cache clean --force
ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
COPY . ./
VOLUME /app
EXPOSE 8080

CMD ["npx", "webpack-dev-server"]