import { isTemperatureNormal } from "../services/isTemperatureNormal";
describe("istemperatureNormal", () => {
  it("should return true if temperature is between -20 and -16", () => {
    expect(isTemperatureNormal(-20)).toBe(true);
    expect(isTemperatureNormal(-18)).toBe(true);
    expect(isTemperatureNormal(-16)).toBe(true);
  });

  it("should return false if temperature is outside -20 to -16", () => {
    expect(isTemperatureNormal(-21)).toBe(false);
    expect(isTemperatureNormal(-15)).toBe(false);
    expect(isTemperatureNormal(0)).toBe(false);
  });
});
