# MERN Blog

MERN 스택은 MongoDB, Express.js, React, node.js의 약자로, 풀스택 자바스크립트 애플리케이션 개발을 위한 기술 스택입니다. 각 구성 요소는 특정한 역할을 하며, 함께 사용하면 서버 사이드와 클라이언트사이드를 모두 자바스크립트로 작업하였습니다.


vite(https://ko.vitejs.dev/guide/)
tailwindcss(https://tailwindcss.com/)
mongodb(https://cloud.mongodb.com/)
redux (https://ko.redux.js.org/introduction/getting-started/)


````bash
# 클라이언트 세팅 부분 (vite를 이용함)
npm create vite@latest
cd client
npm install
npm run dev 
npm i react-router-dom
npm i react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install @reduxjs/toolkit
npm install react-redux
npm install redux-persist

npm install firebase
````

## GIT 연동

모든 파일은 git에 연동하여 사용하였습니다.

````bash
git init 
git add .
git commit -m "first"
git remote add origin https://github.com/nicejmp1/mern-blog.git
git branch -M main
git push -u origin main

````

## API 설치

````bash
npm init -y
npm i express
npm i nodemon
npm i mongoose
npm i dotenv
npm i bcrypt
npm i jsonwebtoken
npm i cookie-parser
````


## 작업 순서
1. client 레이아웃 작업

