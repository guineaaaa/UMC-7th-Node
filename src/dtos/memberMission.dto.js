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
    id: data.id, // 멤버미션 ID
    member_id: data.member_id, // 멤버의 ID
    mission_id: data.mission_id, // 미션의 ID
    store_id: data.store_id, // 가게 ID, 일관성을 위해 `store_id` 사용
    status: data.status, // 현재 미션의 상태
    created_at: data.created_at, // 생성 타임스탬프
    updated_at: data.updated_at, // 업데이트 타임스탬프
  };
};
