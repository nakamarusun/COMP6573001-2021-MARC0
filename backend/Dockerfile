FROM node:16-alpine3.15

WORKDIR /backend

COPY . .

# Install node modules
RUN npm ci
CMD ["npm", "start"]
