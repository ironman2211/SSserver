# Use an official Node.js runtime as the base image
FROM node:14

# Set a working directory in the container
WORKDIR /app

# Copy application files to the container
COPY . .

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port your application will listen on
EXPOSE 3000

# Define the command to run your Node.js application
CMD [ "node", "app.js" ]
