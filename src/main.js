import makeFilter from './make-filter';
import makeTaskCard from './make-task-card';
import {getRandomBoolean, getRandomElementOfArray, getRandomInt} from './random-values';

const sectionForFilters = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const textsForTaskCard = [`This is example of new task, you can add picture, set date and time, add tags.`, `It is example of repeating task. It marks by wave.`, `This is card with missing deadline`, `Here is a card with filled data`, ``];
const colorsForTaskCard = [`black`, `pink`, `yellow`, `blue`, `green`];

const exampleOfCard = {
  text: getRandomElementOfArray(textsForTaskCard),
  color: getRandomElementOfArray(colorsForTaskCard),
  img: getRandomBoolean(),
  gate: getRandomBoolean(),
  repeat: getRandomBoolean(),
  hashtag: getRandomBoolean(),
  deadline: getRandomBoolean()
};

const arrayOfHTMLFilters = [makeFilter(`all`, getRandomInt(0, 15), true),
  makeFilter(`overdue`, getRandomInt(0, 15)),
  makeFilter(`today`, getRandomInt(0, 15)),
  makeFilter(`favorites`, getRandomInt(0, 15)),
  makeFilter(`repeating`, getRandomInt(0, 15)),
  makeFilter(`tags`, getRandomInt(0, 15)),
  makeFilter(`archive`, getRandomInt(0, 15))];
const arrayOfHTMLCards = new Array(7).fill().map(() => makeTaskCard(exampleOfCard));

sectionForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));
boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLCards.join(``));

sectionForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters);
boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLCard);

const filters = document.querySelectorAll(`.filter__label`);
const doFilterCards = () => {
  boardTasks.innerHTML = ``;
  const arrayOfHTMLRandomLengthRandomCard = new Array(getRandomInt(0, 15)).fill().map(() => makeTaskCard({
    text: getRandomElementOfArray(textsForTaskCard),
    color: getRandomElementOfArray(colorsForTaskCard),
    img: getRandomBoolean(),
    gate: getRandomBoolean(),
    repeat: getRandomBoolean(),
    hashtag: getRandomBoolean(),
    deadline: getRandomBoolean()
  }));

  boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLRandomLengthRandomCard.join(``));
};

filters.forEach((el) => el.addEventListener(`click`, doFilterCard));
