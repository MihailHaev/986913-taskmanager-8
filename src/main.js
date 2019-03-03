import makeFilter from './task-card/filter';
import makeTaskCards from './task-card/cards';
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

sectionForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));
boardTasks.insertAdjacentHTML(`beforeend`, makeTaskCards(7));

const filters = document.querySelectorAll(`.filter__label`);
const doFilterCards = () => {
  boardTasks.innerHTML = ``;
  boardTasks.insertAdjacentHTML(`beforeend`, makeTaskCards(getRandomInt(0, 15)));
};

filters.forEach((el) => el.addEventListener(`click`, doFilterCards));
