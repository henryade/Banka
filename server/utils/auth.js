
export const generateRandomPassword = () => {
  const randomPassword = [];
  for (let i = 0; i < 5; i += 1) {
    randomPassword.push(String.fromCharCode(Math.ceil(Math.random() * 25) + 97));
    randomPassword.push(Math.ceil(Math.random() * 10));
  }
  return randomPassword.join("");
};

export const generateAccountNumber = () => {
  const lengthOfAccountNumber = 999999;
  const bankAccountNumberBranding = 9000000000;
  const uniqueNumber = bankAccountNumberBranding
  + Math.floor(Math.random() * lengthOfAccountNumber);

  return uniqueNumber;
};
