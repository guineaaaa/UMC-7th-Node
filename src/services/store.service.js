import { addStore, getStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { getAllStoreReviews } from "../repositories/user.repository.js";

import { responseFromMission } from "../dtos/mission.dto.js";
import { getStoreMissions } from "../repositories/mission.repository.js";

import { InvaildRegionError } from "../errors.js";

export const storeAdd = async (data) => {
  const storeId = await addStore({
    regionId: data.regionId,
    name: data.name,
    address: data.address,
  });
  if (storeId === null) {
    throw new InvaildRegionError("존재하지 않는 지역입니다.", {
      regionId: data.regionId,
    });
  }
  const store = await getStore(storeId);
  return responseFromStore(store); // getStore에서 반환된 객체를 responseFromStore에 전달
};

// 가게의 모든 리뷰들 조회하기
export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReview(reviews);
};

// 특정 가게의 미션 목록들 조회하기
export const listStoreMissions = async (storeId) => {
  const missions = await getStoreMissions(storeId);
  return responseFromMission(missions);
};
