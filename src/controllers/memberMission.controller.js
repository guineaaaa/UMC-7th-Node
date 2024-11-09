import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import { memberMissionAdd } from "../services/memberMission.service.js";
import { StatusCodes } from "http-status-codes";

// handleMemberMissionAdd 함수 수정
export const handleMemberMissionAdd = async (req, res, next) => {
  try {
    const { status, memberId, storeId } = req.body; // storeId는 req.body에서 받는다
    const { missionId } = req.params; // missionId는 URL 파라미터에서 받는다

    console.log("미션 상태 변경 요청을 받았습니다");
    console.log("body: ", req.body);
    console.log("URL 파라미터: ", req.params);
    console.log("Extracted storeId:", storeId); // storeId가 제대로 출력되는지 확인

    if (!storeId) {
      return res.status(400).json({ error: "storeId is required" });
    }

    const memberMissionData = bodyToMemberMission(req.body, storeId, missionId);
    console.log("memberMissionAdd에 전달된 데이터:", memberMissionData);

    await memberMissionAdd(memberMissionData);

    res.status(200).json({ message: "Mission status updated to in-progress" });
  } catch (error) {
    console.error("미션 상태 변경 중 에러 발생:", error);
    next(error);
  }
};
