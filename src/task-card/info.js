import {getRandomElementOfArray, getRandomBoolean, getRandomInt, getRandomElementOfSet, getRandomDate} from './../random-values';

const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = new Set([`black`, `pink`, `yellow`, `blue`, `green`]);
const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]);

export default () => ({
  title: getRandomElementOfArray(titles),
  dueDate: getRandomDate(7, 2),
  tags: getRandomElementOfSet(tags, getRandomInt(0, 3)),
  picture: getRandomElementOfArray([`http://picsum.photos/100/100?r=${Math.random()}`, false]),
  color: getRandomElementOfSet(colors),
  repeatingDays: {Mo: getRandomBoolean(),
    We: getRandomBoolean(),
    Tu: getRandomBoolean(),
    Th: getRandomBoolean(),
    Fr: getRandomBoolean(),
    Sa: getRandomBoolean(),
    Su: getRandomBoolean()},
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean(),
});
