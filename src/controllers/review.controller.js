import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handleReviewAdd = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다.");
  console.log("body: ", req.body);

  try {
    // storeId를 URL 파라미터에서 가져오기
    const storeId = parseInt(req.params.storeId, 10); // storeId를 Int로 변환

    if (isNaN(storeId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "유효한 storeId가 아닙니다." });
    }

    // storeId를 bodyToReview에 전달
    const review = await reviewAdd(bodyToReview(req.body, storeId));

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    next(error);
  }
};
