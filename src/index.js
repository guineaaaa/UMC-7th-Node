import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreAdd } from "./controllers/store.controller.js";
import { handleReviewAdd } from "./controllers/review.controller.js";
import { handleMissionAdd } from "./controllers/mission.controller.js";
import { handleMemberMissionAdd } from "./controllers/memberMission.controller.js";
import { handleListStoreReviews } from "./controllers/review.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("나의 서버입니당");
});

// 0. 회원가입 api
app.post("/api/v1/users/signup", handleUserSignUp);

// 1. 특정 지역에 가게 추가하기 api
app.post("/api/v1/stores", handleStoreAdd);

// 2. 가게에 리뷰 추가하기 api
app.post("/api/v1/stores/:storeId/review", handleReviewAdd);

// 3. 가게에 미션 추가하기 API
app.post("/api/v1/stores/:storeId/mission", handleMissionAdd);

// 4. 가게의 미션을 도전중인 미션에 추가 API
app.post(
  "/api/v1/stores/:storeId/missions/:missionId/in-progress",
  handleMemberMissionAdd
);

// ORM 사용해서 목록 API 만들어보기
// 1. 가게에 속한 모든 리뷰를 조회할 수 있는 API
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
