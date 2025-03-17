# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Expose the port that React app will run on
EXPOSE 3000

# Step 8: Define the command to start the React app
CMD ["npm", "start"]