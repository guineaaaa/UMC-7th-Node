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
        AND: [
          { member_id: parseInt(memberId, 10) },
          { mission_id: parseInt(missionId, 10) },
        ],
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

export const getInProgressMissionsByMemberId = async (memberId, cursor) => {
  try {
    // memberId 파싱
    const parsedMemberId = parseInt(memberId, 10);
    if (isNaN(parsedMemberId)) {
      throw new Error("Invalid memberId provided. Must be an integer.");
    }

    // 커서가 전달되지 않았다면 기본값 설정 (0부터 시작)
    const parsedCursor = cursor ? parseInt(cursor, 10) : 0;

    const missions = await prisma.memberMission.findMany({
      where: {
        memberId: parsedMemberId,
        status: "진행중", // 진행 중인 미션만 조회
        id: {
          gt: parsedCursor, // 커서보다 큰 ID 값을 찾음
        },
      },
      include: {
        mission: true, // 미션 정보도 포함
      },
      orderBy: {
        id: "asc", // ID 기준으로 오름차순 정렬
      },
      take: 5, // 한 번에 최대 5개의 미션 반환
    });

    // 진행 중인 미션 목록을 콘솔에 출력
    if (missions.length === 0) {
      console.log(`회원 ${parsedMemberId}의 진행 중인 미션이 없습니다.`);
    } else {
      console.log("진행 중인 미션 목록:", missions);
    }

    // 5개 미션을 반환하면 추가 미션이 있을 수 있음
    const hasMore = missions.length === 5;

    return { missions, hasMore }; // 페이지네이션 정보를 함께 반환
  } catch (error) {
    throw new Error(`진행 중인 미션 조회 중 오류 발생: ${error.message}`);
  }
};

export const updateMissionStatusToCompleted = async (
  missionId,
  memberId,
  storeId
) => {
  try {
    // 파싱된 값으로 사용
    const parsedMissionId = parseInt(missionId, 10);
    const parsedMemberId = parseInt(memberId, 10);
    const parsedStoreId = parseInt(storeId, 10);

    // 유효성 검사
    if (
      isNaN(parsedMissionId) ||
      isNaN(parsedMemberId) ||
      isNaN(parsedStoreId)
    ) {
      throw new Error(
        "Invalid missionId, memberId, or storeId provided. Must be integers."
      );
    }

    // 상태가 '진행중'인 미션을 찾아서 해당 id를 사용하여 업데이트
    const mission = await prisma.memberMission.findFirst({
      where: {
        missionId: parsedMissionId,
        memberId: parsedMemberId,
        storeId: parsedStoreId,
        status: "진행중", // 상태가 '진행중'인 미션만
      },
    });

    if (!mission) {
      throw new Error("진행중인 미션을 찾을 수 없습니다.");
    }

    // 상태를 '완료'로 업데이트
    const updatedMission = await prisma.memberMission.update({
      where: {
        id: mission.id, // 찾은 미션의 id로 업데이트
      },
      data: {
        status: "완료", // 상태를 '완료'로 변경
        updated_at: new Date(), // 수정된 시간
      },
    });

    return updatedMission;
  } catch (error) {
    throw new Error(`미션 상태 업데이트 실패: ${error.message}`);
  }
};
