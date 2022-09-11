git pull
docker build -t  "next-daruk" .
kill -9 `lsof -t -i:3003`
docker run -it -p 3003:3000 next-daruk