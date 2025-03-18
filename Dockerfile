# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files first to optimize caching
COPY package.json ./

# Step 4: Clean up and install dependencies
RUN npm install

# Step 6: Copy the rest of the project files into the container
COPY . .

# Step 7: Build the React app for production
RUN npm run build

# Step 8: Expose the port that React app will run on
EXPOSE 3000

# Step 10: Start the React app
CMD ["npm", "start"]
