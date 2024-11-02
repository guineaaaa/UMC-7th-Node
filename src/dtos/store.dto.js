export const bodyToStore = (body) => {
  return {
    region_id: body.region_id,
    name: body.name,
    address: body.address,
  };
};

export const responseFromStore = (store) => {
  return {
    region_id: store.region_id,
    store_name: store.name,
    store_address: store.address,
  };
};
