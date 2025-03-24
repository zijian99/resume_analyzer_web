# FOR PRODUCTION
# # Use the official Node.js image as a base
# FROM node:lts-alpine AS builder

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the Vite project
# RUN npm run build

# # Use an Nginx image to serve the static files
# FROM nginx:alpine

# # Copy built files to Nginx's default public folder
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


#FOR DEVELOPMENT
FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

