FROM node AS builder


# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

COPY yarn.lock ./
COPY .yarnrc.yml ./

# COPY nginx ./


# Install app dependencies

RUN yarn set version 4.1.0

RUN npm config set registry https://registry.npm.taobao.org/

RUN yarn cache clean

RUN yarn install


COPY . .

RUN yarn set version 4.1.0

RUN yarn build



# RUN yarn run build



FROM hub.c.163.com/library/nginx:alpine


WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/nginx/nginx.conf  /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf
# COPY --from=builder /app/nginx/certs/blog.frankwm.cn_bundle.crt ./certs/server.crt
# COPY --from=builder /app/nginx/certs/blog.frankwm.cn.key  ./certs/server.key

EXPOSE 80



# FROM hub.c.163.com/library/nginx:latest

# COPY dist /usr/share/nginx/html

# EXPOSE 80
