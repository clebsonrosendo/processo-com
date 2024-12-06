# This sets up the container with Python 3.10 installed.
FROM nginx:1.27-alpine

# Define variable environment
ENV APP_HOME /var/www/html

# This sets the home/app directory as the working directory for any RUN, CMD, ENTRYPOINT, or COPY instructions that follow.
WORKDIR ${APP_HOME}

# This copies everything in your current directory to the /app directory in the container.
COPY ./app ${APP_HOME}

# Expose port 80
EXPOSE 80

# This command init container and run serve
ENTRYPOINT ["nginx", "-g", "daemon off;"]
