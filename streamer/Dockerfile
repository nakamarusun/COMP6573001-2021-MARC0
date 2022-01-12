FROM node:16-alpine3.15

WORKDIR /streamer_module

COPY . .

# Install ffmpeg
RUN apk update && \
  apk add --no-cache \
  ffmpeg

# Install node modules
RUN npm ci
CMD ["npm", "start"]
