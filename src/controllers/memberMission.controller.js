import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import {
  fetchInProgressMissions,
  memberMissionAdd,
} from "../services/memberMission.service.js";
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

// 진행 중인 미션 조회 핸들러
export const handleGetInProgressMemberMissions = async (req, res, next) => {
  const { memberId } = req.params;
  const { cursor } = req.query; // URL 쿼리에서 cursor 받기

  try {
    console.log("사용자의 진행 중인 미션 목록 조회 요청을 받았습니다.");
    // 커서가 없으면 기본값 0 설정
    const currentCursor = cursor ? parseInt(cursor, 10) : 0;
    const { missions, hasMore } = await fetchInProgressMissions(memberId, currentCursor);

    // 진행 중인 미션을 console에 출력
    console.log("진행 중인 미션 목록:", missions);

    res.status(StatusCodes.OK).json({ missions, hasMore });
  } catch (error) {
    console.error("진행 중인 미션 조회 중 에러 발생: ", error);
    next(error);
  }
};
