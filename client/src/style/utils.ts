import { BASE_FONT_SIZE } from "./constants";

export const pxToRem = (valueInPx: number): string => {
  return `${valueInPx / BASE_FONT_SIZE}rem`;
};
