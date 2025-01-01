import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, kakaoStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreAdd } from "./controllers/store.controller.js";
import {
  handleReviewAdd,
  handleListStoreReviews,
} from "./controllers/review.controller.js";
import {
  handleMissionAdd,
  handleGetStoreMissions,
} from "./controllers/mission.controller.js";
import {
  handleMemberMissionAdd,
  handleGetInProgressMemberMissions,
  handleChangeMissionStatus,
} from "./controllers/memberMission.controller.js";

passport.use(googleStrategy); // passport 라이브러리에 정의한 로그인 방식 등록
passport.use(kakaoStrategy);
passport.serializeUser((user, done) => done(null, user)); // 세션에 사용자 정보를 저장할 때, 세션 정보를 가져올 때 사용
passport.deserializeUser((user, done) => done(null, user));

import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT;
/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수를 등록한다.
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

/**
 * Swager 세팅
 */
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/kakao", passport.authenticate("kakao"));
app.get(
  "/oauth2/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/oauth2/login/kakao",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  console.log(req.user);
  // console.log(req.session);
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
app.post("/api/v1/missions/:missionId/in-progress", handleMemberMissionAdd);

// 1. 가게에 속한 모든 리뷰를 조회할 수 있는 API
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 2. 특정 가게의 미션 목록 조회할 수 있는 API
app.get("/api/v1/stores/:storeId/missions", handleGetStoreMissions);

// 3. 내가 진행 중인 미션 목록 조회할 수 있는 API
app.get(
  "/api/v1/users/missions/:memberId/inprogress",
  handleGetInProgressMemberMissions
);

// 4. 내가 진행 중인 미션을 진행 완료로 바꾸기 API
app.post(
  "/api/v1/users/missions/:missionId/completed",
  handleChangeMissionStatus
);

/*------------------------------------------------------------------------
 * 전역 오류를 처리하기 위한 미들웨어
 * Controller 내에서 별도로 처리하지 않은 오류가 발생할 경우,
 * 모두 잡아서 공통된 오류 응답으로 내려준다.
 * ------------------------------------------------------------------------
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });

  // 모든 오류를 공통으로 로깅하기
  console.log({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
