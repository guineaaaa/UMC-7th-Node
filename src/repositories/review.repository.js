import { prisma } from "../db.config.js";

// 리뷰 추가하기
export const addReview = async (data) => {
  // 해당 가게가 존재하는지 확인
  const store = await prisma.store.findUnique({
    where: { id: data.storeId },
  });

  console.log("storeId:", data.storeId);

  if (!store) {
    return null;
  }

  // 리뷰 추가하기
  const createdReview = await prisma.review.create({
    data: {
      memberId: data.memberId,
      storeId: data.storeId,
      body: data.body,
      score: data.score,
    },
  });

  return createdReview.id; // 삽입된 리뷰의 ID 반환
};

// 리뷰 조회하기
export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error(`해당 리뷰(${reviewId})를 찾을 수 없습니다.`);
  }

  return review; // 리뷰 객체 반환
};
