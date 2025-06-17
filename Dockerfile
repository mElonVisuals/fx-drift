# Stage 1: Build the React application
# Use a Node.js image to build the frontend assets
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the React application for production
# Assuming 'npm run build' or 'yarn build' generates static files into a 'dist' directory
RUN yarn build

# Stage 2: Serve the static files with Nginx
# Use a lightweight Nginx image
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's html directory
# This '/app/dist' path must match the output directory of your build command (e.g., 'yarn build')
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration if needed (e.g., for routing, single-page app fallbacks)
# If your app has client-side routing (like React Router), you might need a custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80, as Nginx runs on port 80 by default
EXPOSE 80

# Command to start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]