export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    specAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = (user, preferences) => {
  return { user, preferences };
};
