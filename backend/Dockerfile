# Use a stable Node.js version (full version for build tools)
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Set port environment variable
ENV PORT=5000

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
