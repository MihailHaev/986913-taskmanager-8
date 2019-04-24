import ModelTask from "./task-card/model-task";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  getTasks() {
    if (this._isOnline()) {
      return this._api.getTasks()
      .then((tasks) => {
        tasks.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
        return tasks;
      });
    } else {
      const rawTaskMap = this._store.getAll();
      const rawTasks = objectToArray(rawTaskMap);
      const tasks = ModelTask.parseTasks(rawTasks);

      return tasks;
    }
  }

  createTask({task}) {
    if (this._isOnline()) {
      return this._api.createTask({task})
      .then((newTask) => {
        this._store.setItem({key: newTask.id, item: newTask.toRAW()});
        return newTask;
      });
    } else {
      task.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: task.id, item: task.toRAW()});
      return Promise.resolve(ModelTask.parseTask(task));
    }
  }

  update({id, data}) {
    if (this._isOnline()) {
      return this._api.update({id, data})
      .then((updatedTask) => {
        this._store.setItem({key: updatedTask.id, item: updatedTask.toRAW()});
        return updatedTask;
      });
    } else {
      this._needSync = true;

      this._store.setItem({key: data.id, item: data.toRAW()});
      return Promise.resolve(ModelTask.parseTask(data));
    }
  }

  delete({id}) {
    if (this._isOnline()) {
      return this._api.delete({id})
      .then((response) => {
        this._store.removeItem({key: id});
        return response;
      });
    } else {
      this._needSync = true;

      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  syncTasks() {
    this._needSync = false;
    return this._api.syncTasks({tasks: objectToArray(this._store.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}

export default Provider;
