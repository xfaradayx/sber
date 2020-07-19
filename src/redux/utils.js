export const arrToMap = (arr) => {
  return arr.reduce((acc, el) => {
    return { ...acc, [el.id]: el };
  }, {});
};
