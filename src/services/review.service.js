import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

import { StoreNotFoundError, UserNotFoundError } from "../errors.js";

export const reviewAdd = async (data) => {
  const reviewId = await addReview({
    memberId: data.memberId,
    storeId: data.storeId,
    body: data.body,
    score: data.score,
  });

  if (!reviewId) {
    throw new StoreNotFoundError(
      "존재하지 않는 가게입니다."
    );
  }

  // 디버깅 reviewId가 제대로 확인됐는지
  console.log("created review id: ", reviewId);

  // 추가된 리뷰를 조회한다.
  const review = await getReview(reviewId);

  if (!review) {
    throw new UserNotFoundError("해당 리뷰를 찾을 수 없습니다.");
  }

  return responseFromReview(review);
};
