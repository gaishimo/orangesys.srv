FROM mhart/alpine-node:6.9.1
ADD . /app
WORKDIR /app
RUN npm install \
  && npm run build

EXPOSE 5001
CMD ["npm", "start"]
