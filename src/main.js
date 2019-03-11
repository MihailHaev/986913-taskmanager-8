import makeFilter from './task-card/filter';
import makeTaskCards from './task-card/cards';
import {getRandomInt} from './random-values';
import Task from './task-card/task';
import TaskEdit from './task-card/task-edit';
import makeData from './task-card/info';

const containerForFilters = document.querySelector(`.main__filter`);
const date = makeData();
const tasksContainer = document.querySelector(`.board__tasks`);
const taskComponent = new Task(date);
const editTaskComponent = new TaskEdit(date);
const arrayOfHTMLFilters = [makeFilter(`all`, getRandomInt(0, 15), true),
  makeFilter(`overdue`, getRandomInt(0, 15)),
  makeFilter(`today`, getRandomInt(0, 15)),
  makeFilter(`favorites`, getRandomInt(0, 15)),
  makeFilter(`repeating`, getRandomInt(0, 15)),
  makeFilter(`tags`, getRandomInt(0, 15)),
  makeFilter(`archive`, getRandomInt(0, 15))];

containerForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters.join(``));
// boardTasks.insertAdjacentHTML(`beforeend`, makeTaskCards(7));

tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = () => {
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
};

const filters = document.querySelectorAll(`.filter__label`);
const doFilterCards = () => {
  tasksContainer.innerHTML = ``;
  tasksContainer.insertAdjacentHTML(`beforeend`, makeTaskCards(getRandomInt(0, 15)));
};

filters.forEach((el) => el.addEventListener(`click`, doFilterCards));
