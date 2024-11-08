import {
  addMissionToInProgress,
  getMemberMission,
} from "../repositories/memberMission.repository.js";
import { responseFromMemberMission } from "../dtos/memberMission.dto.js";

export const memberMissionAdd = async (data) => {
  const { memberId, missionId } = data;

  // 미션을 도전 중으로 추가한다.
  await addMissionToInProgress(memberId, missionId);

  // 추가된 미션을 조회
  const memberMission = await getMemberMission(memberId, missionId);

  // 반환
  return responseFromMemberMission(memberMission);
};
