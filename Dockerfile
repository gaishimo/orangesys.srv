FROM mhart/alpine-node:base-6
ADD . /app
WORKDIR /app

EXPOSE 5001
CMD ["node", "target/server.js"]
