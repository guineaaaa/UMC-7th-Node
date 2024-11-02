import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import { memberMissionAdd } from "../services/memberMission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleMemberMissionAdd = async (req, res, next) => {
  console.log("미션 상태 변경 요청을 받았습니다 ");
  console.log("body: ", req.body);

  try {
    const storeId = req.params.storeId; //URL 경로에서 storeId를 가져오기
    const missionId = req.params.missionId; //URL 경로에서 missionId를 가져오기

    // DTO를 사용해 body 데이터를 변환하기
    const memberMissionData = bodyToMemberMission(req.body, storeId, missionId);

    // 서비스 계층에 미션 상태 변경 요청을 보낸다.
    const updatedMission = await memberMissionAdd(memberMissionData);

    // 상태 코드와 함께 응답 반환
    res.status(StatusCodes.OK).json({ result: updatedMission });
  } catch (error) {
    next(error);
  }
};
