# Use an official lightweight Node.js image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the backend port (make sure it matches your server)
EXPOSE 5000

# Start the Node.js server
CMD ["node", "server.js"]
