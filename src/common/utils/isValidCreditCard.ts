export const isValidCreditCard = (cardNumber: string): boolean => {
  if (cardNumber === "") return false;
  const digits = cardNumber.replace(/\D/g, "").split("").map(Number).reverse();
  const sum = digits.reduce((acc, digit, idx) => {
    if (idx % 2 === 1) {
      const doubled = digit * 2;
      return acc + (doubled > 9 ? doubled - 9 : doubled);
    }
    return acc + digit;
  }, 0);
  return sum % 10 === 0;
};
