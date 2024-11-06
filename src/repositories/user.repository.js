import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  // 기존 사용자 확인
  const user = await prisma.member.findFirst({ where: { email: data.email } });
  if (user) {
    return null; // 이미 존재하는 경우 null 반환
  }

  // 사용자 생성
  const createdUser = await prisma.member.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      spec_address: data.spec_address,
      phone_num: data.phone_num,
      age: data.age,
    },
  });
  return createdUser.id; // 생성된 사용자 ID 반환
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  // 사용자 조회
  const user = await prisma.member.findFirstOrThrow({
    where: { id: userId },
  });
  return user; // 사용자 정보 반환
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  // 선호 카테고리 설정
  await prisma.memberPrefer.create({
    data: {
      memberId: userId,
      categoryId: foodCategoryId, // 필드명 수정
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  // 사용자의 선호 카테고리 목록 조회
  const preferences = await prisma.memberPrefer.findMany({
    select: {
      id: true,
      memberId: true,
      categoryId: true, // 필드명 수정
      foodCategory: {
        select: {
          name: true,
        },
      },
    },
    where: { memberId: userId },
    orderBy: { categoryId: "asc" }, // 필드명 수정
  });

  return preferences;
};

// 목록 API
export const getAllStoreReviews = async (storeId, cursor) => {
  // 특정 가게의 리뷰 목록 조회하기 (커서 기반 페이지네이션)
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true, // `content`를 `body`로 수정
      storeId: true,
      memberId: true,
      store: true,
      member: true,
    },
    where: { storeId: storeId, id: { gt: cursor } }, // greater than ID
    orderBy: { id: "asc" }, // ID 오름차순 정렬
    take: 5, // 최대 5개의 리뷰 반환
  });
  return reviews;
};
