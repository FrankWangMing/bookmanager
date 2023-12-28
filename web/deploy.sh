
Tag=1.2

docker-compose build
docker tag  fronted-bookmanager:latest  console.frankwm.cn/travelgo/fe:$Tag
docker push console.frankwm.cn/travelgo/fe:$Tag
