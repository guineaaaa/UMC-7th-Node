export const bodyToStore = (body) => {
  return {
    store_id: body.store_id,
    name: body.name,
    store_category: body.store_category,
    store_address: body.store_address,
  };
};

export const responseFromStore = ({ store }) => {
  return {
    store_id: store.store_id,
    name: store.name,
    store_category: store.store_category,
    store_address: store.store_address,
  };
};
