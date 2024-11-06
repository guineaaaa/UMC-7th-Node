export const bodyToReview = (body, storeId) => {
  return {
    memberId: body.memberId, 
    storeId: storeId, 
    body: body.body,
    score: body.score,
  };
};


export const responseFromReview = (data) => {
  return {
    reviewId: data.id, 
    memberId: data.memberId, // 리뷰 작성자의 ID
    storeId: data.storeId, // 리뷰가 작성된 가게의 ID
    body: data.body,
    score: data.score,
    created_at: data.created_at, // 리뷰 작성 시간
  };
};
