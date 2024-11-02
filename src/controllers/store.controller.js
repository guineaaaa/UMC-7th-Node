import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

export const handleStoreAdd = async (req, res, next) => {
  console.log("가게 추가를 요청했습니다");
  console.log("body: ", req.body);

  // 디버깅
  // console.log("Converted store data: ", bodyToStore(req.body));

  try {
    const store = await storeAdd(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (error) {
    next(error);
  }
};
