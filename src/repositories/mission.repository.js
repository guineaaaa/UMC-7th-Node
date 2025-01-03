import { prisma } from "../db.config.js"; // Prisma 클라이언트 불러오기

// 미션 추가하기
export const addMission = async (data) => {
  try {
    // 해당 가게가 존재하는지 확인
    const store = await prisma.store.findUnique({
      where: {
        id: data.storeId, // storeId로 수정
      },
    });

    if (!store) {
      // throw new Error(`해당 가게(${data.storeId})를 찾을 수 없습니다.`);
      return null;
    }

    // 미션 추가하기
    const newMission = await prisma.mission.create({
      data: {
        storeId: data.storeId, // storeId로 수정
        reward: data.reward,
        deadline: new Date(data.deadline), // Date 객체로 변환
        mission_spec: data.mission_spec, // mission_spec -> missionSpec
      },
    });

    return newMission.id; // 생성된 미션의 ID 반환
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err.message}`);
  }
};

// 미션 조회하기
export const getMission = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: {
        id: missionId, // missionId로 수정
      },
    });

    if (!mission) {
      return null;
      // throw new Error(`해당 미션 ${missionId}를 찾을 수 없습니다.`);
    }

    return mission; // 미션 객체 반환
  } catch (err) {
    throw new Error(`미션 조회 중 오류 발생: ${err.message}`);
  }
};

// 특정 가게의 미션을 조회하는 API
export const getStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      store: true,
      storeId: true,
      reward: true,
      deadline: true,
      mission_spec: true,
    },
    where: {
      storeId: storeId, // storeId는 이제 정수로 전달됨
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5, //최대 5개의 미션 반환
  });

  const hasMore = missions.length === 5; // 5개보다 적으면 더 이상 미션이 없다는 의미
  return { missions, hasMore };
};
