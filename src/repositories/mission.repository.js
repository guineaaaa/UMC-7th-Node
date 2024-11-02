import { pool } from "../db.config.js";

// 미션 추가하기
export const addMission = async (data) => {
  const connection = await pool.getConnection();

  // 해당 가게가 존재하는지 확인
  try {
    const [store] = await connection.query(`SELECT * FROM store WHERE id=?`, [
      data.store_id,
    ]);
    if (store.length == 0) {
      throw new Error(`해당 가게(${data.store_id})를 찾을 수 없습니다.`);
    }

    // 미션 추가하기
    const query = `INSERT INTO mission(store_id, reward, deadline, mission_spec, created_at) VALUES (?, ?, ?, ?, NOW())`;
    const [result] = await connection.query(query, [
      data.store_id,
      data.reward,
      data.deadline,
      data.mission_spec,
    ]);
    return result.insertId; // 삽입된 미션의 ID를 반환
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err.message}`);
  } finally {
    connection.release();
  }
};

// 미션 조회하기
export const getMission = async (missionId) => {
  const connection = await pool.getConnection();

  try {
    const [mission] = await connection.query(
      `SELECT * FROM mission WHERE id=?`,
      [missionId]
    );

    if (mission.length == 0) {
      throw new Error(`해당 미션 ${missionId}를 찾을 수 없습니다.`);
    }
    return mission[0]; // 미션 객체 반환
  } catch (err) {
    throw new Error(`미션 조회 중 오류 발생: ${err.message}`);
  } finally {
    connection.release();
  }
};
