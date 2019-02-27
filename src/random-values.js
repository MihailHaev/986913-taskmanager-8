const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElementOfArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export {getRandomBoolean, getRandomElementOfArray, getRandomInt};
