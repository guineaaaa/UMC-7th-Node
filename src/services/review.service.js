import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

import { StoreNotFoundError } from "../errors.js";

export const reviewAdd = async (data) => {
  const reviewId = await addReview({
    memberId: data.memberId,
    storeId: data.storeId,
    body: data.body,
    score: data.score,
  });

  if (reviewId === null) {
    throw new StoreNotFoundError(
      "존재하지 않는 가게에 리뷰 추가 요청 했습니다."
    );
  }

  // 디버깅 reviewId가 제대로 확인됐는지
  console.log("created review id: ", reviewId);

  // 추가된 리뷰를 조회한다.
  const review = await getReview(reviewId);
  return responseFromReview(review);
};
