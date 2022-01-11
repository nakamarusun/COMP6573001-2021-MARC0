# Use nginx + rtmp image
FROM tiangolo/nginx-rtmp

# Copy our configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Create error log file
RUN ["touch", "/stream_error.log"]