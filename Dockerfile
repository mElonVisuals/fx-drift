# Stage 1: Build the React application using Node.js
# We use a Node.js image to install dependencies and build the frontend assets.
FROM node:20-alpine AS build

# Set the working directory inside the container for the build process.
WORKDIR /app

# Copy package.json and package-lock.json (for npm users).
# If you are using 'yarn', you should change this line to:
# COPY package.json yarn.lock ./
COPY package.json package-lock.json ./

# Install project dependencies.
# If you are using 'yarn', change this line to:
# RUN yarn install --frozen-lockfile
RUN npm ci --force

# Copy the rest of your application source code into the container.
COPY . .

# Build the React application for production.
# Vite typically outputs optimized static files into a 'dist' directory.
# This command must match your 'build' script in package.json (e.g., "vite build").
RUN npm run build

# Stage 2: Serve the static files with Nginx
# We use a lightweight Nginx Alpine image for serving the static content.
FROM nginx:alpine

# Remove default Nginx configuration to avoid conflicts and ensure our config is used.
RUN rm /etc/nginx/conf.d/default.conf

# Copy a custom Nginx configuration file.
# This configuration is essential for single-page applications (SPAs) like React,
# ensuring that all non-file requests are routed back to index.html for client-side routing.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the 'build' stage to Nginx's web root.
# The '/app/dist' path must match the output directory of your 'npm run build' command.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80. Nginx listens for HTTP traffic on port 80 by default.
EXPOSE 80

# Command to run Nginx in the foreground when the container starts.
# 'daemon off;' ensures Nginx stays in the foreground, which is necessary for Docker.
CMD ["nginx", "-g", "daemon off;"]
