import makeFilter from './task-card/filter';
import makeTaskCard from './task-card/task-card';
import makeTaskInfo from './task-card/info';
import {getRandomInt} from './random-values';

const sectionForFilters = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const arrayOfHTMLFilters = [makeFilter(`all`, getRandomInt(0, 15), true),
  makeFilter(`overdue`, getRandomInt(0, 15)),
  makeFilter(`today`, getRandomInt(0, 15)),
  makeFilter(`favorites`, getRandomInt(0, 15)),
  makeFilter(`repeating`, getRandomInt(0, 15)),
  makeFilter(`tags`, getRandomInt(0, 15)),
  makeFilter(`archive`, getRandomInt(0, 15))];
const arrayOfHTMLCards = new Array(7).fill().map(() => makeTaskCard(makeTaskInfo()));

sectionForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));
boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLCards.join(``));

const filters = document.querySelectorAll(`.filter__label`);
const doFilterCards = () => {
  boardTasks.innerHTML = ``;
  const arrayOfHTMLRandomLengthRandomCard = new Array(getRandomInt(0, 15)).fill().map(() => makeTaskCard(makeTaskInfo()));

  boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLRandomLengthRandomCard.join(``));
};

filters.forEach((el) => el.addEventListener(`click`, doFilterCards));
