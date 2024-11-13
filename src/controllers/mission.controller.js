import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd, storeMissionsGet } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleMissionAdd = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다.");
  console.log("body: ", req.body);

  try {
    const storeId = req.params.storeId; // 요청에서 storeId를 가져온다.
    const mission = await missionAdd(bodyToMission(req.body, storeId)); //DTO변환 후 미션 추가

    res.status(StatusCodes.OK).success(mission); // 성공적으로 추가된 미션을 반환한다.
  } catch (error) {
    next(error);
  }
};

// 특정 가게의 미션을 조회
export const handleGetStoreMissions = async (req, res, next) => {
  try {
    // storeId와 cursor 값을 먼저 추출
    const storeId = parseInt(req.params.storeId, 10); // storeId는 정수로 변환
    const cursor = parseInt(req.query.cursor, 10) || 0; // cursor는 쿼리 파라미터로 넘어오는 값

    console.log(`가게 ID: ${storeId}, cursor: ${cursor}`); // 로그 출력 순서 수정

    // 서비스 계층을 호출하여 미션 목록을 조회
    const { missions, hasMore } = await storeMissionsGet(storeId, cursor);

    // 조회된 미션 목록을 응답
    res.status(StatusCodes.OK).json({ missions, hasMore });
  } catch (error) {
    next(error);
  }
};
