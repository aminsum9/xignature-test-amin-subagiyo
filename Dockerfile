# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Menyalin file .env
COPY .env ./.env

# Expose port 3000 for the NestJS server
EXPOSE 3000

# Start the NestJS server
CMD ["npm", "run", "start:prod"]
