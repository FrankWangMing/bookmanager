docker login 120.26.170.100:8881

docker build -t 120.26.170.100:8881/bookmanager/backend:latest -f Dockerfile . 

docker push 120.26.170.100:8881/bookmanager/backend:latest


