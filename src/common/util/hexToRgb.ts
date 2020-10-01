export const hexToRgb = (hex: string) => {
  const parseRgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = {
    red: parseInt(parseRgb[1], 16),
    green: parseInt(parseRgb[2], 16),
    blue: parseInt(parseRgb[3], 16),
  };
  rgb.red /= 256;
  rgb.green /= 256;
  rgb.blue /= 256;
  return rgb;
};
