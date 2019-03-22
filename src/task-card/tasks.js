import Task from './task';
import TaskEdit from './task-edit';
import makeData from './info';

export default (container, length = false) => {
  if (!length) {
    const data = makeData();
    const taskComponent = new Task(data);
    const editTaskComponent = new TaskEdit(data);

    container.appendChild(taskComponent.render(container));

    taskComponent.onEdit = () => {
      editTaskComponent.render(container);
      container.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (updateData) => {
      data.title = updateData.title;
      data.tags = updateData.tags;
      data.dueDate = updateData.dueDate;
      data.isFavorite = updateData.isFavorite;
      data.repeatingDays = updateData.repeatingDays;
      data.color = updateData.color;

      taskComponent.update(data);
      taskComponent.render(container);
      container.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
  } else {
    for (let i = 0; i < length; i++) {
      const data = makeData();
      const taskComponent = new Task(data);
      const editTaskComponent = new TaskEdit(data);

      container.appendChild(taskComponent.render(container));

      taskComponent.onEdit = () => {
        editTaskComponent.render(container);
        container.replaceChild(editTaskComponent.element, taskComponent.element);
        taskComponent.unrender();
      };

      editTaskComponent.onSubmit = (updateData) => {
        data.title = updateData.title;
        data.tags = updateData.tags;
        data.dueDate = updateData.dueDate;
        data.isFavorite = updateData.isFavorite;
        data.repeatingDays = updateData.repeatingDays;
        data.color = updateData.color;

        taskComponent.update(data);
        taskComponent.render(container);
        container.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();
      };
    }
  }
};
