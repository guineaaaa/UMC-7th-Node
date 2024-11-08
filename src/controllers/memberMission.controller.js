import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import { memberMissionAdd } from "../services/memberMission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleMemberMissionAdd = async (req, res, next) => {
  console.log("미션 상태 변경 요청을 받았습니다 ");
  console.log("body: ", req.body);

  try {
    // 요청 본문에서 memberId
    const memberId = parseInt(req.body.memberId, 10);

    // URL 경로에서 missionId 추출
    const missionId = parseInt(req.params.missionId, 10);

    // memberId와 missionId를 DTO로 변환
    const memberMissionData = bodyToMemberMission(
      req.body,
      memberId,
      missionId
    );

    // 변환된 데이터를 서비스 계층에 전달하여 미션 상태를 변경
    const updatedMission = await memberMissionAdd(memberMissionData);

    // 변경된 미션 정보를 응답
    res.status(StatusCodes.OK).json({ result: updatedMission });
  } catch (error) {
    console.error(`미션 상태 변경 중 오류 발생: ${error.message}`);
    next(error);
  }
};
