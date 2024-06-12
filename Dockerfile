# Use the official Node.js image as the base  
FROM node:20-alpine  

# Set the working directory inside the container  
WORKDIR /app  


# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm ci  

# Copy the app source code to the container  
COPY . .  

# Build the Next.js app  
RUN npm run build  

# Expose the port the app will run on  
EXPOSE 4002  

# setting up ENV and ENV (only available in build process) variables
ENV PORT 4002
ENV NODE_ENV production

# Start the app  
CMD ["npm", "start"]  