export const getCommonPoints = (data) =>
  data
    .map((item) => item.items)
    .map((test) => test.map((value) => value.points))
    .flat()
    .reduce((acc, value) => acc + value);
