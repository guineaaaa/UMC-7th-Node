import { addMission, getMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

// 미션 추가
export const missionAdd = async (data) => {
  const storeId = parseInt(data.storeId, 10); // storeId를 Int로 변환
  try {
    if (isNaN(storeId)) {
      throw new Error("유효하지 않은 storeId 값입니다.");
    }

    // 미션 추가
    const missionId = await addMission({
      storeId: storeId, // storeId가 Int로 전달됨
      reward: data.reward,
      deadline: data.deadline,
      mission_spec: data.mission_spec, // mission_spec -> missionSpec
    });

    // 추가된 미션을 조회
    const mission = await getMission(missionId);

    // DTO 형식에 맞게 응답 변환 후 반환
    return responseFromMission(mission);
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err.message}`);
  }
};
