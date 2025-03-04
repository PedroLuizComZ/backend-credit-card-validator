export const isValidExpiryDate = (expiryDate: string): boolean => {
    const [month, year] = expiryDate.split("/");
  
    const monthNumber = parseInt(month, 10);
    if (monthNumber < 1 || monthNumber > 12) {
      return false;
    }
  
    const currentYear = new Date().getFullYear() % 100; 
    const yearNumber = parseInt(year, 10);
  
    if (yearNumber < currentYear) {
      return false; 
    }
  
    return true;
  };