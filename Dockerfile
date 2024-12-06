# Base image: Using nginx 1.27 with Alpine Linux for a lightweight container.
FROM nginx:1.27-alpine

# Set the application home directory as an environment variable.
ENV APP_HOME=/usr/share/nginx/html

# Set the working directory to the application home directory.
# All subsequent RUN, CMD, ENTRYPOINT, and COPY instructions will use this directory as their context.
WORKDIR ${APP_HOME}

# Set permissions for the application directory and other nginx-related directories.
# Ensures the nginx user has the required ownership and access rights.
RUN chown -R nginx:nginx ${APP_HOME} && chmod -R 755 ${APP_HOME} && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Create the nginx.pid file (used for tracking the nginx process) and assign ownership to the nginx user.
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to the nginx user for enhanced security.
USER nginx

# (Optional) Uncomment the line below to replace the default nginx configuration with a custom one.
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy the application files from the host machine's ./app directory to the container's application directory.
COPY ./app ${APP_HOME}

# Expose port 80 for HTTP traffic.
EXPOSE 80

# Start nginx in the foreground to keep the container running.
ENTRYPOINT ["nginx", "-g", "daemon off;"]
