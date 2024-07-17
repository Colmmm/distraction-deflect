# Stage 1: Build the application
FROM node:18 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Run the build command to generate the dist directory
RUN npm run build

# Stage 2: Serve the application or for further steps
FROM node:18 as serve-stage

# Set the working directory
WORKDIR /app

# Copy built assets from build-stage
COPY --from=build-stage /app/dist /app/dist

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev"]
