# Build react frontend and place it in nginx directory
FROM node:16-alpine3.15
COPY ./frontend /frontendsrc
WORKDIR /frontendsrc

RUN npm ci
RUN npm run build

# Use nginx + rtmp image
FROM tiangolo/nginx-rtmp

# Copy our configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir --parents /var/www/html
COPY --from=0 /frontendsrc/build /var/www/html/

# Create temporary recording directory and change the owner
RUN ["mkdir", "/tmp/rec"]
RUN ["chown", "-R", "nobody:nogroup", "/tmp/rec"]

# Create error log file
RUN ["touch", "/stream_error.log"]
