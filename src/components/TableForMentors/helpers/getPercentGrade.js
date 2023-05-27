import { MAX_GRADE } from "../constants";

export const getPercentGrade = (common, points) =>
  Math.round((points * MAX_GRADE) / common);
