
Tag=1.3

docker-compose build
docker tag  bookmanager:latest  console.frankwm.cn/travelgo/backend:$Tag
docker push console.frankwm.cn/travelgo/backend:$Tag
