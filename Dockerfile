# Stage 1: Build the application
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Optional: Check the contents of the output directory
RUN ls -la /app/dist

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3001
EXPOSE 3001

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
