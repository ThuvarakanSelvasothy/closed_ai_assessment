# Stage 1 - Build React App
FROM node:latest AS build

WORKDIR /app/client

# Copy package.json and package-lock.json
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application
COPY client/ ./

# Build the React app
RUN npm run build

# Stage 2 - Build Node.js Server
FROM node:latest AS server

WORKDIR /app/server

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy built React app from previous stage
COPY --from=build /app/client/build ./client/build

# Copy the rest of the server application
COPY server/ ./

# Expose server port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]