export const bodyToMemberMission = (body, storeId, missionId) => {
  console.log("storeId 변환 시 확인: ", storeId); // storeId 값 확인
  return {
    member_id: body.memberId,
    mission_id: missionId,
    store_id: storeId, // storeId가 제대로 들어오는지 확인
    status: body.status,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const responseFromMemberMission = (data) => {
  return {
    missions: data.missions.map((mission) => ({
      id: mission.id,
      member_id: mission.member_id,
      mission_id: mission.mission_id,
      store_id: mission.store_id,
      status: mission.status,
      created_at: mission.created_at,
      updated_at: mission.updated_at,
    })),
    pagination: {
      cursor: data.missions.length
        ? data.missions[data.missions.length - 1].id
        : null, // 마지막 미션 ID를 커서로 사용
    },
  };
};
