import { bodyToMission } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleMissionAdd = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다.");
  console.log("body: ", req.body);

  try {
    const storeId = req.params.storeId; // 요청에서 storeId를 가져온다.
    const mission = await missionAdd(bodyToMission(req.body, storeId)); //DTO변환 후 미션 추가
    res.status(StatusCodes.CREATED).json({ result: mission }); // 성공적으로 추가된 미션을 반환한다.
  } catch (error) {
    next(error);
  }
};
