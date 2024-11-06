import { prisma } from "../db.config.js";

// 가게 추가하기
export const addStore = async (data) => {
  try {
    // 해당 지역이 존재하는지 확인
    const region = await prisma.region.findUnique({
      where: { id: data.regionId },
    });

    if (!region) {
      throw new Error(`해당 지역(${data.regionId})을 찾을 수 없습니다.`);
    }

    // 중복된 가게가 있는지 확인
    const existingStore = await prisma.store.findFirst({
      where: {
        name: data.name,
        address: data.address,
      },
    });

    if (existingStore) {
      throw new Error(`이미 존재하는 가게입니다: ${data.name}`);
    }

    // 중복이 없으면 가게를 추가
    const newStore = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        region: { connect: { id: data.regionId } }, // region과 연결
      },
    });

    return newStore.id; // 삽입된 가게의 ID 반환
  } catch (err) {
    throw new Error(`가게 추가 중 오류 발생: ${err.message}`);
  }
};

// 가게 조회하기
export const getStore = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return null; // 가게가 존재하지 않으면 null 반환
    }

    return store;
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err.message}`);
  }
};
