export const bodyToUser = (body) => {

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: body.birth,
    age: body.age,
    address: body.address || "",
    spec_address: body.spec_address || "",
    phone_num: body.phone_num || "",
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
