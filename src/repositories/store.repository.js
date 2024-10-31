import { pool } from "../db.config.js";

// 가게 추가하기
export const addStore = async (data) => {
  const connection = await pool.getConnection();

  try {
    const [region] = await connection.query(
      `SELECT * FROM region WHERE name=?`,
      [data.region]
    );

    if (region.length === 0) {
      throw new Error(`해당 지역(${data.region})을 찾을 수 없습니다.`);
    }

    const query = `INSERT INTO store (name, category, address, region_id) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query(query, [
      data.name,
      data.category,
      data.address,
      region[0].id,
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
    const [store] = await connection.query(`SELECT * FROM store WHERE id=?`, [
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
