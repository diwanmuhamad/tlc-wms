export const isTemperatureNormal = (temp: number): boolean => {
  return temp >= -20 && temp <= -16 ? true : false;
};
