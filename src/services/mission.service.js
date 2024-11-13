import {
  addMission,
  getMission,
  getStoreMissions,
} from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";
import { StoreNotFoundError } from "../errors.js";

// 미션 추가
export const missionAdd = async (data) => {
  const storeId = parseInt(data.storeId, 10); // storeId를 Int로 변환
  try {
    if (isNaN(storeId)) {
      throw new Error("유효하지 않은 storeId 값입니다.");
    }

    if (storeId === null) {
      throw new StoreNotFoundError(
        "존재하지 않는 가게에 미션 추가 요청을 했습니다."
      );
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

// 특정 가게의 미션 목록 조회
export const storeMissionsGet = async (storeId, cursor) => {
  try {
    // 주어진 storeId와 cursor를 사용하여 미션 목록을 조회합니다.
    const missions = await getStoreMissions(storeId, cursor);

    // 미션이 없다면 빈 배열을 반환
    if (!missions || missions.length === 0) {
      return { missions: [], hasMore: false };
    }

    // 다음 페이지를 확인할 수 있도록 마지막 미션의 ID를 cursor로 사용
    const hasMore = missions.length === 5;

    return { missions, hasMore };
  } catch (error) {
    throw new Error(`가게의 미션 목록 조회 중 오류 발생: ${error.message}`);
  }
};
