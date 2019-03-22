import makeFilter from './task-card/filter';
import {getRandomInt} from './random-values';
import makeTasks from './task-card/tasks.js';

const tasksContainer = document.querySelector(`.board__tasks`);
const containerForFilters = document.querySelector(`.main__filter`);

const arrayOfHTMLFilters = [makeFilter(`all`, getRandomInt(0, 15), true),
  makeFilter(`overdue`, getRandomInt(0, 15)),
  makeFilter(`today`, getRandomInt(0, 15)),
  makeFilter(`favorites`, getRandomInt(0, 15)),
  makeFilter(`repeating`, getRandomInt(0, 15)),
  makeFilter(`tags`, getRandomInt(0, 15)),
  makeFilter(`archive`, getRandomInt(0, 15))];
containerForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));

makeTasks(tasksContainer, 7);

const filters = document.querySelectorAll(`.filter__label`);
const doFilterCards = () => {
  tasksContainer.innerHTML = ``;
  makeTasks(tasksContainer, getRandomInt(0, 15));
};

filters.forEach((el) => el.addEventListener(`click`, doFilterCards));
