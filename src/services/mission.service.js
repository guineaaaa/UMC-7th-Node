import { addMission, getMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const missionAdd = async (data) => {
  const missionId = await addMission({
    store_id: data.store_id,
    reward: data.reward,
    deadline: data.deadline,
    mission_spec: data.mission_spec,
  });

  // 추가된 미션을 조회한다.
  const mission = await getMission(missionId);
  return responseFromMission(mission);
};
