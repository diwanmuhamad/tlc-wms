const isExpiryClose = (expiryDate: string, daysThreshold: number): boolean => {
  const currentDate = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (daysDiff <= daysThreshold) return true;
  return false;
};

export default isExpiryClose;
