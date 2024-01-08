FROM node AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./
COPY nginx ./

# Install app dependencies
RUN npm config set registry https://registry.npm.taobao.org/

RUN yarn cache clean
RUN apt-get update && apt-get install -y \
    libvips \
RUN yarn

COPY . .

RUN yarn run build


FROM hub.c.163.com/library/nginx


WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/nginx/nginx.conf  /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf
# COPY --from=builder /app/nginx/certs/blog.frankwm.cn_bundle.crt ./certs/server.crt
# COPY --from=builder /app/nginx/certs/blog.frankwm.cn.key  ./certs/server.key

EXPOSE 80
