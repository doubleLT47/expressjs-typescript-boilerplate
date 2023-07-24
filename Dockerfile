FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:latest AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]