import {getRandomInt} from "./random-values";
import Task from "./task-card/task";
import TaskEdit from "./task-card/task-edit";
import moment from "moment";
import Filter from "./filter";
import {openStatistic, openTasks} from "./control";
import API from "./api";
import Provider from "./provider";
import Store from "./task-card/store";


const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const TASKS_STORE_KEY = `tasks-store-key`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: TASKS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => (Date.now() + Math.random())});

if (window.navigator.onLine) {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
} else {
  document.title = `${document.title}[OFFLINE]`;
}
window.addEventListener(`offline`, function () {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});

const statisticButton = document.querySelector(`#control__statistic`);
const tasksButton = document.querySelector(`#control__task`);

const filtersCaptions = [`All`,
  `Overdue`, `Today`,
  `Favorites`, `Repeating`,
  `Tags`, `Archive`
];

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

const renderFilters = (filtersNames) => {
  const container = document.querySelector(`.main__filter`);
  container.innerHTML = ``;
  for (let nameOfFilter of filtersNames) {
    const filterComponent = new Filter(nameOfFilter, getRandomInt(0, 15), (nameOfFilter === `All`));

    container.appendChild(filterComponent.render(container));

    filterComponent.onFilter = (evt) => {
      const filterName = evt.target.id;
      provider.getTasks()
        .then((tasks) => {
          const filteredTasks = filterTasks(tasks, filterName);
          renderTasks(filteredTasks);
        });
    };
  }
};

const renderTasks = (tasks) => {
  const container = document.querySelector(`.board__tasks`);
  const boardNoTasks = document.querySelector(`.board__no-tasks`);

  boardNoTasks.textContent = `Congratulations, all tasks were completed! To create a new click on
  «add new task» button.`;
  if (tasks.length !== 0) {
    boardNoTasks.classList.add(`visually-hidden`);
  }

  container.innerHTML = ``;
  for (let task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    container.appendChild(taskComponent.render(container));

    taskComponent.onEdit = () => {
      editTaskComponent.render(container);
      container.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newData) => {
      const buttonSave = editTaskComponent.element.querySelector(`.card__save`);
      const buttonDel = editTaskComponent.element.querySelector(`.card__delete`);
      editTaskComponent.delError();
      const block = () => {
        buttonSave.disabled = true;
        buttonDel.disabled = true;
        buttonSave.textContent = `Saving...`;
      };
      const unblock = () => {
        buttonSave.disabled = false;
        buttonDel.disabled = false;
        buttonSave.textContent = `save`;
      };

      block();

      for (let key in newData) {
        if (newData.hasOwnProperty(key)) {
          task[key] = newData[key];
        }
      }
      provider.update({id: task.id, data: task.toRAW()})
        .then((newTask) => {
          taskComponent.update(newTask);
          taskComponent.render();
          container.replaceChild(taskComponent.element, editTaskComponent.element);

          editTaskComponent.unrender();
          unblock();
        })
        .catch(() => {
          unblock();
          editTaskComponent.error();
        });
    };

    editTaskComponent.onDelete = (id) => {
      editTaskComponent.delError();
      const buttonSave = editTaskComponent.element.querySelector(`.card__save`);
      const buttonDel = editTaskComponent.element.querySelector(`.card__delete`);
      editTaskComponent.delError();
      const block = () => {
        buttonSave.disabled = true;
        buttonDel.disabled = true;
        buttonSave.textContent = `Deleting...`;
      };
      const unblock = () => {
        buttonSave.disabled = false;
        buttonDel.disabled = false;
        buttonSave.textContent = `delete`;
      };

      block();

      provider.delete({id})
      .then(() => provider.getTasks())
      .then((tasksNew) => {
        renderTasks(tasksNew);
      })
      .catch(() => {
        unblock();
        editTaskComponent.error();
      });
    };
  }
};

renderFilters(filtersCaptions);
console.log(provider.getTasks());
provider.getTasks()
  .then((tasks) => {
    renderTasks(tasks);
  })
  .catch(() => {
    document.querySelector(`.board__no-tasks`).textContent = `Something went wrong while loading your tasks. Check your connection or try again later`;
  });

statisticButton.addEventListener(`change`, () => {
  provider.getTasks()
  .then((tasks) => {
    openStatistic(tasks);
  });
});
tasksButton.addEventListener(`change`, openTasks);
document.querySelector(`.statistic__period-input`).addEventListener(`change`, () => {
  provider.getTasks()
  .then((tasks) => {
    openStatistic(tasks);
  });
});
