import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import {
  fetchInProgressMissions,
  memberMissionAdd,
  changeMissionStatusToCompleted,
} from "../services/memberMission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleMemberMissionAdd = async (req, res, next) => {
  /*
    #swagger.summary = '가게의 미션을 도전중인 미션에 추가 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      description: '도전 중으로 바꿀 미션 ID',
      schema: { type: 'integer' }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
                        member_id:{type:"integer"},       
                        store_id:{type:"integer"},
                        status:{type:"string"},
                        created_at: { type: "string", format: "date-time"  },
                        updated_at: { type: "string", format: "date-time"  }
              
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게의 미션을 도전중인 미션에 추가 성공 응답",
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
                        member_id:{type:"integer"},       
                        store_id:{type:"integer"},
                        status:{type:"string"},
                        created_at: { type: "string", format: "date-time"  },
                        updated_at: { type: "string", format: "date-time"  }
              
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "integer", nullable: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  #swagger.responses[400] = {
      description: "가게의 미션을 도전중인 미션에 추가 실패 응답",
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
    const { status, memberId, storeId } = req.body; // storeId는 req.body에서 받는다
    const { missionId } = req.params; // missionId는 URL 파라미터에서 받는다

    console.log("미션 상태 변경 요청을 받았습니다");
    console.log("body: ", req.body);
    console.log("URL 파라미터: ", req.params);
    console.log("Extracted storeId:", storeId); // storeId가 제대로 출력되는지 확인

    if (!storeId) {
      return res.status(400).json({ error: "storeId is required" });
    }

    const memberMissionData = bodyToMemberMission(req.body, storeId, missionId);
    console.log("memberMissionAdd에 전달된 데이터:", memberMissionData);

    await memberMissionAdd(memberMissionData);

    res
      .status(200)
      .success({ message: "Mission status updated to in-progress" });
  } catch (error) {
    console.error("미션 상태 변경 중 에러 발생:", error);
    next(error);
  }
};

// 진행 중인 미션 조회 핸들러
export const handleGetInProgressMemberMissions = async (req, res, next) => {
  /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API'
    
    #swagger.parameters['memberId'] = {
      in: 'path',
      required: true,
      description: '멤버 ID',
      schema: { type: 'integer' }
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      description: '커서 기반 페이징을 위한 커서 값',
      schema: { type: 'integer', example: 0 }
    }
    #swagger.responses[200] = {
      description: '진행 중 미션 목록 조회 성공 응답',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    missionId: { type: "integer" },
                    storeId: { type: "integer" },
                    status: { type: "string" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                    mission: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        storeId: { type: "integer" },
                        reward: { type: "integer" },
                        deadline: { type: "string", format: "date-time" },
                        mission_spec: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" }
                      }
                    }
                  }
                }
              },
              hasMore: { type: "boolean" }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: '진행 중 미션 목록 조회 실패 응답',
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
                  reason: { type: "string" }
                }
              },
              success: { type: "object", nullable: true }
            }
          }
        }
      }
    }
  */
  const { memberId } = req.params;
  const { cursor } = req.query; // URL 쿼리에서 cursor 받기

  try {
    console.log("사용자의 진행 중인 미션 목록 조회 요청을 받았습니다.");
    // 커서가 없으면 기본값 0 설정
    const currentCursor = cursor ? parseInt(cursor, 10) : 0;
    const { missions, hasMore } = await fetchInProgressMissions(
      memberId,
      currentCursor
    );

    // 진행 중인 미션을 console에 출력
    console.log("진행 중인 미션 목록:", missions);

    res.status(StatusCodes.OK).json({ missions, hasMore });
  } catch (error) {
    console.error("진행 중인 미션 조회 중 에러 발생: ", error);
    next(error);
  }
};

export const handleChangeMissionStatus = async (req, res, next) => {
  /*
    #swagger.summary = '내가 진행 중인 미션을 진행 완료로 바꾸기 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      description: '진행 완료로 바꿀 미션 ID',
      schema: { type: 'integer' }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
                        id:{type:"integer"},
                        memberId:{type:"integer"},
                        storeId:{type:"integer"},
                        status:{type:"string"},
                        created_at: { type: "string", format: "date-time"  },
                        updated_at: { type: "string", format: "date-time"  }
              
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션을 진행 완료로 바꾸기 성공 응답",
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
                        id:{type:"integer"},
                        memberId:{type:"integer"},
                        storeId:{type:"integer"},
                        status:{type:"string"},
                        created_at: { type: "string", format: "date-time"  },
                        updated_at: { type: "string", format: "date-time"  },
                        
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "integer", nullable: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  #swagger.responses[400] = {
      description: "진행 중인 미션을 진행 완료로 바꾸기 실패 응답",
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
  const { missionId } = req.params;
  const { memberId, storeId } = req.body; // request body에서 memberId, storeId를 받습니다.

  try {
    console.log("Received missionId:", missionId);
    console.log("Received memberId:", memberId);
    console.log("Received storeId:", storeId);
    // 진행 중인 미션을 완료 상태로 변경
    const result = await changeMissionStatusToCompleted(
      missionId,
      memberId,
      storeId
    );

    res.status(200).success({
      message: "미션이 완료 상태로 변경되었습니다.",
      mission: result,
    });
  } catch (error) {
    next(error); // 오류가 발생하면 에러 핸들러로 전달
  }
};
