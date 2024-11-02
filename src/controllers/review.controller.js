import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handleReviewAdd = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다.");
  console.log("body: ", req.body);

  try {
    const storeId = req.params.storeId; // URL 파라미터에서 storeId 가져오기
    const review = await reviewAdd(bodyToReview(req.body, storeId)); // storeId 전달
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    next(error);
  }
};
