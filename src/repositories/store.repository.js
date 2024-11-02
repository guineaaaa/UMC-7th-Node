import { pool } from "../db.config.js";

// 가게 추가하기
export const addStore = async (data) => {
  // 디버깅
  // console.log("Data to addStore: ", data);

  const connection = await pool.getConnection();

  try {
    // 해당 지역이 존재하는지 확인
    const [region] = await connection.query(
      `SELECT * FROM region WHERE id = ?`,
      [data.region_id]
    );

    if (region.length === 0) {
      throw new Error(`해당 지역(${data.region_id})을 찾을 수 없습니다.`);
    }

    // 중복된 가게가 있는지 확인
    const [existingStore] = await connection.query(
      `SELECT * FROM store WHERE name = ? AND address = ?`,
      [data.name, data.address]
    );

    if (existingStore.length > 0) {
      throw new Error(`이미 존재하는 가게입니다: ${data.name}`);
    }

    // 중복이 없으면 가게를 추가
    const query = `INSERT INTO store (name, address, region_id) VALUES (?, ?, ?)`;
    const [result] = await connection.query(query, [
      data.name,
      data.address,
      data.region_id, // region[0].id 대신 data.region_id 사용
    ]);

    return result.insertId; // 삽입된 가게의 ID 반환
  } catch (err) {
    throw new Error(`가게 추가 중 오류 발생: ${err.message}`);
  } finally {
    connection.release();
  }
};

// 가게 조회하기
export const getStore = async (storeId) => {
  const connection = await pool.getConnection();

  try {
    const [store] = await connection.query(`SELECT * FROM store WHERE id = ?`, [
      storeId,
    ]);

    if (store.length === 0) {
      return null; // 가게가 존재하지 않으면 null 반환
    }

    return store[0];
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err.message}`);
  } finally {
    connection.release();
  }
};
