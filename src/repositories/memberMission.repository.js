import { prisma } from "../db.config.js";
// 이미 도전 중인지, 완료된 미션인지 검증 후, 미션을 도전 중으로 추가한다.
export const addMissionToInProgress = async (memberId, missionId) => {
  const parsedMemberId = parseInt(memberId, 10);
  const parsedMissionId = parseInt(missionId, 10);

  try {
    // 이미 도전 중이거나 완료된 미션인지 확인
    const existingMission = await prisma.memberMission.findFirst({
      where: {
        memberId: parsedMemberId,
        missionId: parsedMissionId,
      },
    });

    if (existingMission) {
      const currentStatus = existingMission.status;
      if (currentStatus === "진행중") {
        throw new Error(`해당 미션(${missionId})는 이미 도전 중 입니다.`);
      }
      if (currentStatus === "진행완료") {
        throw new Error(`해당 미션(${missionId})는 이미 완료 되었습니다.`);
      }
    }

    // 미션을 도전 중 상태로 추가한다.
    const newMission = await prisma.memberMission.create({
      data: {
        memberId: parsedMemberId,
        missionId: parsedMissionId,
        status: "진행중",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return newMission;
  } catch (error) {
    console.error(`미션 도전 중 오류 발생: ${error.message}`);
    throw new Error(`미션 도전 중 오류 발생: ${error.message}`);
  }
};

// 미션 상태 조회
export const getMemberMission = async (memberId, missionId) => {
  try {
    const memberMission = await prisma.memberMission.findFirst({
      where: {
        memberId: memberId,
        missionId: missionId,
      },
    });

    if (!memberMission) {
      throw new Error(`해당 미션(${missionId})을 찾을 수 없습니다.`);
    }
    return memberMission;
  } catch (error) {
    throw new Error(`미션 조회 중 오류 발생: ${error.message}`);
  }
};
