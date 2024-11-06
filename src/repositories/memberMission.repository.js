import { pool } from "../db.config.js";

// 이미 도전 중인지, 완료된 미션인지 검증 후, 미션을 도전 중으로 추가한다.
export const addMissionToInProgress = async (memberId, missionId) => {
  const connection = await pool.getConnection();

  try {
    // 이미 도전 중이거나, 완료된 미션인지 확인
    const [existingMission] = await connection.query(
      `SELECT * FROM member_mission WHERE member_id=? AND mission_id=?`,
      [memberId, missionId] // memberId로 변경
    );

    if (existingMission.length > 0) {
      const currentStatus = existingMission[0].status;
      if (currentStatus === "진행중") {
        throw new Error(`해당 미션 (${missionId})는 이미 도전 중 입니다.`);
      }
      if (currentStatus === "진행완료") {
        throw new Error(`해당 미션 (${missionId})는 이미 완료 되었습니다.`);
      }
    }

    // 미션을 도전 중 상태로 추가한다.
    const insertQuery = `
            INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at)
            VALUES(?, ?, '진행중', NOW(), NOW())`;
    await connection.query(insertQuery, [memberId, missionId]); // memberId로 변경
  } catch (error) {
    throw new Error(`미션 도전 중 오류 발생: ${error.message}`);
  } finally {
    connection.release();
  }
};

// 추가된 미션을 조회하기
export const getMemberMission = async (memberId, missionId) => {
  const connection = await pool.getConnection();
  try {
    const [addedMission] = await connection.query(
      `SELECT * FROM member_mission WHERE member_id=? AND mission_id=?`,
      [memberId, missionId] // memberId로 변경
    );

    if (addedMission.length === 0) {
      throw new Error(`해당 미션 (${missionId})을 찾을 수 없습니다.`);
    }

    return {
      id: addedMission[0].id,
      member_id: addedMission[0].member_id, // member_id로 변경
      mission_id: addedMission[0].mission_id,
      status: addedMission[0].status,
      created_at: addedMission[0].created_at,
      updated_at: addedMission[0].updated_at,
    };
  } catch (error) {
    throw new Error(`미션 조회 중 오류 발생: ${error.message}`);
  } finally {
    connection.release();
  }
};
