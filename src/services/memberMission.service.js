import {
  addMissionToInProgress,
  getMemberMission,
} from "../repositories/memberMission.repository.js";
import { responseFromMemberMission } from "../dtos/memberMission.dto.js";

export const memberMissionAdd = async (data) => {
  const { member_id, mission_id, store_id } = data;

  if (!member_id || !mission_id || !store_id) {
    throw new Error("member_id or mission_id  or store_id is missing.");
  }
  // 미션을 도전 중으로 추가한다.
  await addMissionToInProgress(member_id, mission_id, store_id);

  // 추가된 미션을 조회
  const memberMission = await getMemberMission(member_id, mission_id);

  // 반환
  return responseFromMemberMission(memberMission);
};
