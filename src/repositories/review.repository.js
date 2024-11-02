import { pool } from "../db.config.js";

// 리뷰 추가하기
export const addReview = async (data) => {
  const connection = await pool.getConnection();

  // 해당 가게가 존재하는지 확인
  try {
    const [store] = await connection.query(`SELECT * FROM store WHERE id=?`, [
      data.store_id,
    ]);

    if (store.length == 0) {
      throw new Error(`해당 가게(${data.store_id})를 찾을 수 없습니다.`);
    }

    // 리뷰 추가하기
    const query = `INSERT INTO review (member_id, store_id, body, score, created_at) VALUES (?,?,?,?,NOW())`;
    const [result] = await connection.query(query, [
      data.member_id,
      data.store_id,
      data.body,
      data.score,
    ]);

    return result.insertId; // 삽입된 리뷰의 ID 반환
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류 발생: ${err.message}`);
  } finally {
    connection.release();
  }
};

// 리뷰 조회하기
export const getReview = async (reviewId) => {
  const connection = await pool.getConnection();

  try {
    const [review] = await connection.query(
      `SELECT * FROM review WHERE id = ?`,
      [reviewId]
    );

    if (review.length === 0) {
      throw new Error(`해당 리뷰(${reviewId})를 찾을 수 없습니다.`);
    }

    return review[0]; // 리뷰 객체 반환
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류 발생: ${err.message}`);
  } finally {
    connection.release();
  }
};
