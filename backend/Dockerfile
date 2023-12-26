FROM node AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm config set registry https://registry.npm.taobao.org/
RUN yarn cache clean
RUN yarn

COPY . .

RUN yarn run build

FROM node

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]
