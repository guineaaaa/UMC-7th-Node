import { prisma } from "../db.config.js"; // prisma client 임포트

// 새 미션을 member_mission 테이블에 추가하는 함수
export const addMemberMission = async (memberId, missionId, status) => {
  try {
    const newMemberMission = await prisma.memberMission.create({
      data: {
        memberId,
        missionId,
        status,
      },
    });
    return newMemberMission;
  } catch (error) {
    throw new Error("Failed to add member mission: " + error.message);
  }
};

// 특정 회원의 미션 상태를 가져오는 함수
export const getMemberMissionByStatus = async (memberId, status) => {
  try {
    const memberMission = await prisma.memberMission.findFirst({
      where: {
        memberId,
        status,
      },
    });
    return memberMission;
  } catch (error) {
    throw new Error(
      "Failed to fetch member mission by status: " + error.message
    );
  }
};

// 특정 회원의 모든 미션을 가져오는 함수
export const getAllMemberMissions = async (memberId) => {
  try {
    const missions = await prisma.memberMission.findMany({
      where: {
        memberId,
      },
    });
    return missions;
  } catch (error) {
    throw new Error("Failed to fetch all member missions: " + error.message);
  }
};

// 미션 상태 업데이트 함수 (예: "in progress" -> "completed"로 변경)
export const updateMemberMissionStatus = async (memberMissionId, newStatus) => {
  try {
    const updatedMission = await prisma.memberMission.update({
      where: {
        id: memberMissionId,
      },
      data: {
        status: newStatus,
      },
    });
    return updatedMission;
  } catch (error) {
    throw new Error("Failed to update member mission status: " + error.message);
  }
};
