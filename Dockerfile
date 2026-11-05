# Base Image
FROM mcr.microsoft.com/playwright:v1.64.1-noble

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copying files
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]