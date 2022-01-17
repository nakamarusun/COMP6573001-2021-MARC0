FROM node:16-alpine3.15

WORKDIR /peerjs

COPY . .

# Install node modules
RUN npm ci
CMD ["npm", "start"]
