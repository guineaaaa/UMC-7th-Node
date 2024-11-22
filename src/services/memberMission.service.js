import {
  addMissionToInProgress,
  getMemberMission,
  getInProgressMissionsByMemberId,
  updateMissionStatusToCompleted,
} from "../repositories/memberMission.repository.js";
import { responseFromMemberMission } from "../dtos/memberMission.dto.js";

export const memberMissionAdd = async (data) => {
  const { member_id, mission_id, store_id } = data;

  // 미션을 도전 중으로 추가한다.
  await addMissionToInProgress(member_id, mission_id, store_id);

  // 추가된 미션을 조회
  const memberMission = await getMemberMission(member_id, mission_id);

  // 반환
  return responseFromMemberMission(memberMission);
};

// 특정 사용자의 진행 중인 미션 목록 조회
export const fetchInProgressMissions = async (memberId, cursor = 0) => {
  // 진행 중인 미션 목록을 커서 기반으로 조회
  const { missions, hasMore } = await getInProgressMissionsByMemberId(
    memberId,
    cursor
  );

  // 진행 중인 미션 목록과 추가 미션이 있는지 여부 반환
  return { missions, hasMore };
};

export const changeMissionStatusToCompleted = async (
  missionId,
  memberId,
  storeId
) => {
  // DB에서 해당 미션의 상태를 '완료'로 변경
  const updatedMission = await updateMissionStatusToCompleted(
    missionId,
    memberId,
    storeId
  );

  if (!updatedMission) {
    throw new Error("해당 미션을 찾을 수 없습니다.");
  }

  return updatedMission;
};
