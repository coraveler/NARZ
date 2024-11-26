# 1. 베이스 이미지 설정
FROM node:16

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 4. 소스 코드 복사
COPY . .

# 5. 앱 빌드
RUN NODE_OPTIONS=--max-old-space-size=4096 npm run build

# 6. 정적 파일을 제공하기 위해 Nginx 사용
FROM nginx:alpine
# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# mime.types 파일을 복사
COPY nginx/mime.types /etc/nginx/mime.types
COPY --from=0 /app/build /usr/share/nginx/html

# 이미지 파일 복사
COPY public/img/map /usr/share/nginx/html/img/map

# 포트 설정
EXPOSE 80

# 8. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]