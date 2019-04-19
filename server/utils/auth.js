export const generateRandomPassword = () => {
  const randomPassword = [];
  for (let i = 0; i < 5; i += 1) {
    randomPassword.push(String.fromCharCode(Math.ceil(Math.random() * 25) + 97));
    randomPassword.push(Math.ceil(Math.random() * 10));
  }
  return randomPassword.join("");
};

export const generateId = (type) => {
  if (type === "client") {
    return Math.ceil(Math.random() * 200) + 30000;
  }
  if (type === "staff") {
    return Math.ceil(Math.random() * 200) + 20000;
  }
  return Math.ceil(Math.random() * 200) + 10000;
};
