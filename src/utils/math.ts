export const clamp = (num: number, min?: number, max?: number) =>
  min != null && max != null ? Math.min(Math.max(num, min), max) : num;
