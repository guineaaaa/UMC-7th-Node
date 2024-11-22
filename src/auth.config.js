import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

// passport-google-oauth20 라이브러리가 제공하는 Google 로그인 Strategy 클래스를 통해 옵션 제공
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

/** 먼저 Google 로그인 후 전달받은 사용자의 프로필 정보에 이메일이 포함되었는지 확인하고
 * 이메일을 통해서 사용자를 조회해 본다.
 * 그리고 사용자가 존재하지 않으면 기본 값과 함께 사용자 정보를 자동으로 생성하는 함수이다. */
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const member = await prisma.member.findFirst({ where: { email } });
  if (member !== null) {
    return { id: member.id, email: member.email, name: member.name };
  }

  const created = await prisma.member.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: "추후 수정",
      address: "추후 수정",
      spec_address: "추후 수정",
      phone_num: "추후 수정",
      age: 1,
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};
