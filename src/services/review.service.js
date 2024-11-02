import { addReview, getReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const reviewAdd = async (data) => {
  const reviewId = await addReview({
    member_id: data.member_id,
    store_id: data.store_id,
    body: data.body,
    score: data.score,
  });

  // 추가된 리뷰를 조회한다.
  const review = await getReview(reviewId);
  return responseFromReview(review);
};
