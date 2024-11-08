export const bodyToMemberMission = (body, memberId, missionId) => {
  return {
    memberId: memberId,
    missionId: missionId,
    status: body.status || "진행중", // status가 없으면 기본값 '진행중'
  };
};

export const responseFromMemberMission = (data) => {
  return {
    id: data.id,
    memberId: data.memberId,
    missionId: data.missionId,
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
};
