
Tag=1.2

docker-compose build
docker tag  web-fe-travelgo:latest  console.frankwm.cn/travelgo/fe:$Tag
docker push console.frankwm.cn/travelgo/fe:$Tag
