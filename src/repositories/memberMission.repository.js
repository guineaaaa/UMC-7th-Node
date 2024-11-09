import { prisma } from "../db.config.js";

// 이미 도전 중인지, 완료된 미션인지 검증 후, 미션을 도전 중으로 추가한다.
export const addMissionToInProgress = async (memberId, missionId, storeId) => {
  try {
    // 확인용 로그 추가
    console.log("Member ID:", memberId);
    console.log("Mission ID:", missionId);
    console.log("Store ID:", storeId); // storeId 로그 추가

    // missionId를 정수로 변환
    const missionIdInt = parseInt(missionId, 10);

    // 이미 도전 중이거나, 완료된 미션인지 확인
    const existingMission = await prisma.memberMission.findFirst({
      where: {
        AND: [
          { memberId: memberId }, // memberId 필드를 사용
          { missionId: missionIdInt }, // missionId를 Int로 변환하여 사용
        ],
      },
    });

    if (existingMission) {
      const currentStatus = existingMission.status;
      if (currentStatus === "진행중") {
        throw new Error(`해당 미션 (${missionId})는 이미 도전 중 입니다.`);
      }
      if (currentStatus === "진행완료") {
        throw new Error(`해당 미션 (${missionId})는 이미 완료 되었습니다.`);
      }
    }

    console.log("storeId 전달 전에: ", storeId);
    // 미션을 도전 중 상태로 추가한다.
    const memberMission = await prisma.memberMission.create({
      data: {
        member: { connect: { id: memberId } }, // 관계 설정
        mission: { connect: { id: missionIdInt } }, // 관계 설정
        store: { connect: { id: storeId } }, // 관계 설정
        status: "진행중", // 상태 추가
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return memberMission;
  } catch (error) {
    throw new Error(`미션 도전 중 오류 발생: ${error.message}`);
  }
};

// 추가된 미션을 조회하기
export const getMemberMission = async (memberId, missionId) => {
  try {
    const addedMission = await prisma.memberMission.findFirst({
      where: {
        AND: [{ member_id: memberId }, { mission_id: missionId }],
      },
    });

    if (!addedMission) {
      throw new Error(`해당 미션 (${missionId})을 찾을 수 없습니다.`);
    }

    return addedMission;
  } catch (error) {
    throw new Error(`미션 조회 중 오류 발생: ${error.message}`);
  }
};
