# This stage installs our modules
FROM mhart/alpine-node:12
WORKDIR /app
COPY package.json package-lock.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python3
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm i 
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV BASE_PATH=/next-daruk
CMD ["npm","run", "start:prd"]