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

# Copy the custom Nginx configuration file directly to the main Nginx config path.
# This ensures our configuration completely replaces the default one, simplifying setup.
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React application from the 'build' stage to Nginx's web root.
# The '/app/dist' path must match the output directory of your 'npm run build' command.
COPY --from=build /app/dist /usr/share/nginx/html

# Set appropriate permissions for Nginx to read and serve files.
# This is a common fix if Nginx cannot access the files it needs to serve.
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# --- DEBUGGING STEPS (These will show in your Coolify build logs) ---
# List the contents of the Nginx web root to verify files are copied
RUN ls -lR /usr/share/nginx/html

# Print the Nginx configuration to verify it's correctly placed
RUN cat /etc/nginx/nginx.conf
# --- END DEBUGGING STEPS ---

# Expose port 80. Nginx listens for HTTP traffic on port 80 by default.
EXPOSE 80

# Command to run Nginx in the foreground when the container starts.
# 'daemon off;' ensures Nginx stays in the foreground, which is necessary for Docker.
CMD ["nginx", "-g", "daemon off;"]
