// 클라이언트 요청 본문에서 데이터 변환
export const bodyToStore = (body) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address,
  };
};

// 데이터베이스에서 가져온 데이터에서 반환
export const responseFromStore = (store) => {
  return {
    regionId: store.regionId,
    name: store.name,
    address: store.address,
  };
};
