import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

// 사용자 등록
export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    spec_address: data.spec_address || "",
    phone_num: data.phone_num || "",
    age: data.age,
  });

  if (joinUserId === null) {
    // throw new Error("이미 존재하는 이메일입니다.");
    throw new DuplicateUserEmailError("이미 존재하는 이메일 입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
