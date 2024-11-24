# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
