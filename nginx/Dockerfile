# Use nginx + rtmp image
FROM tiangolo/nginx-rtmp

# Copy our configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Create temporary recording directory and change the owner
RUN ["mkdir", "/tmp/rec"]
RUN ["chown", "-R", "nobody:nogroup", "/tmp/rec"]

# Create error log file
RUN ["touch", "/stream_error.log"]