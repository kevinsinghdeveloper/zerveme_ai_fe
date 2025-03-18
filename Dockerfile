# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to optimize caching
COPY package.json package-lock.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm ci

# Explicitly install the latest Webpack version
RUN npm install webpack@latest --save-dev

# Copy the rest of the project files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
