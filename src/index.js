// const express=require('express');

import express from "express"; //-> ES module
import { signup } from "./controllers/user.controller.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world, 안녕하세요");
});

app.post("/users/signup", signup);

// 라우팅, 내부에 실행되는 함수가 컨트롤러

// 라우팅을 한 파일에 때려박는건 비효율적인 방법이다.
// routers라는 파일을 하나 만든다. 그 후에 index.js에서 라우팅을 한다, 라우팅 파일에서만 라우팅 처리를 한다.

// app.use('/users', userRouters);
// *** 예외 처리 *** 를 위해 app.use("/api/v1", );, v2 ,...이런식으로 처리를 해주자

// 사실은 컨트롤러도 분리를 해야한다 (파일 분리..)
// 컨트롤러 폴더를 하나 생성한다

// userController.js  ->  const login =()=>{ console.log("컨트롤러 분리");}
// 사용할때는 함수 명만 가져온다
// 또 컨트롤러도 분리할 수도있다!! DB 사용 등......

// ====> MVC 패턴이 된다
// 3 layer 계층!

// import, export

// postman 사용해서 요청을 보내보자

// 속도 차이????

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
