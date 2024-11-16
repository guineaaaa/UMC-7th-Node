import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

// 가게 추가
export const handleStoreAdd = async (req, res, next) => {
  /*
    #swagger.summary = '특정 지역에 가게 추가하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              regionId:{type:"integer"},
              name:{type:"string"},
              address:{type:"string"}
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "특정 지역에 가게 추가 성공 응답",
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
                  regionId:{type:"integer"},
                  name:{type:"string"},
                  address:{type:"string"}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "특정 지역에 가게 추사 실패 응답",
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
  console.log("가게 추가를 요청했습니다");
  console.log("body: ", req.body);

  // 디버깅
  // console.log("Converted store data: ", bodyToStore(req.body));

  try {
    const store = await storeAdd(bodyToStore(req.body));
    // res.status(StatusCodes.CREATED).json({ result: store });
    res.status(StatusCodes.OK).success(store);
  } catch (error) {
    next(error);
  }
};
