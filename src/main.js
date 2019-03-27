import {getRandomInt} from './random-values';
import Task from './task-card/task';
import TaskEdit from './task-card/task-edit';
import makeTasksData from './task-card/data';
import moment from 'moment';
import Filter from './filter';
import {openStatistic, openTasks} from './control';

const tasksContainer = document.querySelector(`.board__tasks`);
const filtersContainer = document.querySelector(`.main__filter`);
const statisticButton = document.querySelector(`#control__statistic`);
const tasksButton = document.querySelector(`#control__task`);

const initailDataTask = makeTasksData(7);

const filtersCaptions = [`All`,
  `Overdue`, `Today`,
  `Favorites`, `Repeating`,
  `Tags`, `Archive`
];

const updateTask = (dataTasks, dataToUpdate, newData) => {
  const i = dataTasks.indexOf(dataToUpdate);
  dataTasks[i] = Object.assign({}, dataTasks[i], newData);
  return dataTasks[i];
};

const deleteTask = (dataTasks, dataToRemove) => {
  const i = dataTasks.indexOf(dataToRemove);
  dataTasks.splice(i, 1);
};

const filterTasks = (dataTasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return dataTasks;
    case `filter__overdue`:
      return dataTasks.filter((it) => it.dueDate < Date.now());
    case `filter__today`:
      return dataTasks.filter((it) => {
        const startOfToday = moment(Date.now()).startOf(`day`).toDate();
        const endOfToday = moment(Date.now()).endOf(`day`).toDate();
        const dayOfTask = moment(it.dueDate).toDate();
        return (startOfToday <= dayOfTask && endOfToday >= dayOfTask);
      });
    case `filter__favorites`:
      return dataTasks.filter((it) => it.isFavorite);
    case `filter__repeating`:
      return dataTasks.filter((it) => (Object.values(it.repeatingDays).some((day) => day === true)));
    case `filter__tags`:
      return dataTasks.filter((it) => it.tags.size > 0);
    case `filter__archive`:
      return dataTasks.filter((it) => it.isDone);
  }
  return dataTasks;
};

const renderFilters = (filtersNames, container) => {
  container.innerHTML = ``;
  for (let nameOfFilter of filtersNames) {
    const filterComponent = new Filter(nameOfFilter, getRandomInt(0, 15), (nameOfFilter === `All`));

    container.appendChild(filterComponent.render(container));

    filterComponent.onFilter = (evt) => {
      const filterName = evt.target.id;
      const filteredTasks = filterTasks(initailDataTask, filterName);
      renderTasks(filteredTasks, tasksContainer);
    };
  }
};

const renderTasks = (dataTasks, container) => {
  container.innerHTML = ``;
  for (let data of dataTasks) {
    const taskComponent = new Task(data);
    const editTaskComponent = new TaskEdit(data);

    container.appendChild(taskComponent.render(container));

    taskComponent.onEdit = () => {
      editTaskComponent.render(container);
      container.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newData) => {
      const updatedTask = updateTask(dataTasks, data, newData);

      taskComponent.update(updatedTask);
      taskComponent.render(container);
      container.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      deleteTask(dataTasks, data);
      container.removeChild(editTaskComponent.element);
      editTaskComponent.unrender();
    };
  }
};

renderFilters(filtersCaptions, filtersContainer);
renderTasks(initailDataTask, tasksContainer);

statisticButton.addEventListener(`change`, () => {
  openStatistic(initailDataTask);
});
tasksButton.addEventListener(`change`, openTasks);
document.querySelector(`.statistic__period-input`).addEventListener(`change`, () => {
  openStatistic(initailDataTask);
});
