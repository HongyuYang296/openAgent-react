# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the source code
COPY . .

# Step 6: Expose the port that Vite or React will run on
EXPOSE 5000

# Step 7: Run the development server (or you can use `npm run build` and `npm run start` for production)
CMD ["npm", "run", "dev"]
