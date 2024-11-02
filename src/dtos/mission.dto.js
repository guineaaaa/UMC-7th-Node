export const bodyToMission = (body, store_id) => {
  return {
    store_id: store_id,
    reward: body.reward,
    deadline: body.deadline,
    mission_spec: body.mission_spec,
  };
};

export const responseFromMission = (data) => {
  return {
    mission_id: data.mission_id,
    store_id: data.store_id,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec,
    created_at: data.created_at,
  };
};
