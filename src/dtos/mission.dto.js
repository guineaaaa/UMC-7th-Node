// 미션 dto
export const bodyToMission = (body, storeId) => {
  return {
    storeId: storeId,
    reward: body.reward,
    deadline: body.deadline,
    mission_spec: body.mission_spec,
  };
};

// 미션 응답을 처리하는 DTO
export const responseFromMission = (data) => {
  return {
    missionId: data.id,
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec,
    createdAt: data.created_at,
  };
};
