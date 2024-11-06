import { addStore, getStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const storeAdd = async (data) => {
  const storeId = await addStore({
    regionId: data.regionId,
    name: data.name,
    address: data.address,
  });

  const store = await getStore(storeId);
  return responseFromStore(store); // getStore에서 반환된 객체를 responseFromStore에 전달
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
