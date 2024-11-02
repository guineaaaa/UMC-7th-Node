export const bodyToReview = (body, store_id) => {
  return {
    member_id: body.user_id,
    store_id: store_id,
    body: body.body,
    score: body.score,
  };
};

export const responseFromReview = (data) => {
  return {
    review_id: data.review_id,
    member_id: data.member_id,
    body: data.body,
    score: data.score,
    created_at: data.created_at,
  };
};
