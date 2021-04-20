FROM node:14-alpine
WORKDIR /app
COPY . /app
EXPOSE 5000
RUN ["npm", "install"]
CMD ["npm", "start"]