import {
  addMissionToInProgress,
  getMemberMission,
  getInProgressMissionsByMemberId,
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

//특정 사용자의 진행 중인 미션 목록 조회
export const fetchInProgressMissions = async (memberId,cursor=0) => {
  try {
    // 진행 중인 미션 목록을 커서 기반으로 조회
    const { missions, hasMore } = await getInProgressMissionsByMemberId(memberId, cursor);

    // 진행 중인 미션 목록과 추가 미션이 있는지 여부 반환
    return { missions, hasMore };
  } catch (error) {
    throw new Error(`진행 중인 미션 조회 중 오류 발생: ${error.message}`);
  }
};