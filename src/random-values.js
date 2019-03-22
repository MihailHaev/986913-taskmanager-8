const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElementOfArray = (array, count = false) => {
  array = [...array];
  if (count === false) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return new Array(count).fill()
    .map(() => array[Math.floor(Math.random() * array.length)]);
};

const getRandomElementOfSet = (set, count = false) => {
  const array = [...set];
  if (count === false) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return new Set(new Array(count).fill()
  .map(() => array[Math.floor(Math.random() * array.length)]));
};

const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const getRandomDate = (dayPlus, dayMinus) => new Date((Date.now()
  + (Math.floor(Math.random() * dayPlus * 24 * 60) * 60 * 1000)
  - (Math.floor(Math.random() * dayMinus * 24 * 60) * 60 * 1000)));

export {getRandomBoolean, getRandomElementOfArray, getRandomInt, getRandomElementOfSet, getRandomDate};
