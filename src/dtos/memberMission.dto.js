export const bodyToMemberMission = (body, memberId, missionId) => {
  return {
    member_id: memberId, // 멤버의 ID로 변경
    mission_id: missionId, // 도전할 미션의 ID
    status: body.status || "진행중", // 기본 상태를 '진행 중'으로 설정
  };
};

export const responseFromMemberMission = (data) => {
  return {
    id: data.id, // 멤버미션 ID
    member_id: data.member_id, // 멤버의 ID
    mission_id: data.mission_id, // 미션의 ID
    status: data.status, // 현재 미션의 상태
    created_at: data.created_at, // 생성 타임스탬프
    updated_at: data.updated_at, // 업데이트 타임 스탬프
  };
};
