import { correctGrade, OLD_MAX_GRADE } from "../constants";

export const getPointsGrade = (common, points) => {
  const currentGrade = ((points * OLD_MAX_GRADE) / common).toFixed(1);
  const [integerValue, decimalValue] = currentGrade.split(".");

  return +integerValue + correctGrade[decimalValue];
};
