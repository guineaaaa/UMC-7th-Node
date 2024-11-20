import { bodyToReview } from "../dtos/review.dto.js";
import { reviewAdd } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

import { InvalidStoreIdError } from "../errors.js";

export const handleReviewAdd = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 추가 API';
    #swagger.parameters['storeId']={
      in:'path',
      required: true,
      description: '리뷰 추가하려는 상점의 ID',
      schema: { type: 'integer' }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId:{type:"integer"},
              body:{type:"string"},
              score:{type:"number", format:"float"}
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 리뷰 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        memberId:{type:"integer"},
                        body:{type:"string"},
                        score:{type:"number", format:"float"}
                      }
                    }
                  },
                  
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 리뷰 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("리뷰 추가를 요청했습니다.");
  console.log("body: ", req.body);

  try {
    // storeId를 URL 파라미터에서 가져오기
    const storeId = parseInt(req.params.storeId, 10); // storeId를 Int로 변환

    if (isNaN(storeId)) {
      throw new InvalidStoreIdError("유효한 storeId가 아닙니다.", {
        storeId: req.params.storeId,
      });
    }
    // storeId를 bodyToReview에 전달
    const review = await reviewAdd(bodyToReview(req.body, storeId));

    res.status(StatusCodes.OK).success(review);
  } catch (error) {
    next(error); // 에러 핸들링 미들웨어로 전달
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.parameters['storeId']={
      in:'path',
      required: true,
      description: '리뷰 조회하려는 상점의 ID',
      schema: { type: 'integer' }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reviewId:{type:"integer"},
              memberId:{type:"integer"},
              body:{type:"string"}
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        reviewId:{type:"integer"},
                        memberId:{type:"integer"},
                        body:{type:"string"}
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "상점 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const storeId = parseInt(req.params.storeId); // storeId를 Int로 변환
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0; // cursor 파라미터 처리

    const reviews = await listStoreReviews(storeId, cursor); // storeId와 cursor를 전달
    res.status(StatusCodes.OK).json(reviews); // .json()을 사용하여 성공 응답 반환
  } catch (error) {
    next(error);
  }
};
