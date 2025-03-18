# Use the latest LTS version of Node.js
FROM node:18-alpine

# Install Certbot (for Let's Encrypt SSL) and dependencies
RUN apk add --no-cache \
    certbot \
    certbot-nginx \
    bash \
    curl

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose port 80 (for Certbot validation) and 443 (for HTTPS)
EXPOSE 80 443

# Define the command to run your app
CMD ["npm", "start"]