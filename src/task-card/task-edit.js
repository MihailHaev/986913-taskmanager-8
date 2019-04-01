import {inputInLabel, inputDay, inputColor} from './input';
import flatpickr from 'flatpickr';
import moment from 'moment';
import MainTask from './main-task';

class TaskEdit extends MainTask {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavorite = false, isDone = false, id}) {
    super();
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isDone = isDone;
    this._isFavorite = isFavorite;
    this._id = id;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onDelTag = this._onDelTag.bind(this);
    this._onPickColor = this._onPickColor.bind(this);
    this._onChangeRepeatedDay = this._onChangeRepeatedDay.bind(this);
    this._onChangeDateAndTime = this._onChangeDateAndTime.bind(this);
    this._onChangeFavorites = this._onChangeFavorites.bind(this);
    this._onAddTag = this._onAddTag.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._state.isDate = false;
    this._state.isRepeated = this._isRepeated();

    this._onSubmit = null;
    this._onDelete = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      const formData = new FormData(this._element.querySelector(`.card__form`));
      const newData = this._processForm(formData);
      this._state.isDate = false;
      this._onSubmit(newData);
    }
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onDelete(this._id);
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this._partialUpdate();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._partialUpdate();
  }

  _onDelTag(el) {
    if (el.target.classList.contains(`card__hashtag-delete`)) {
      this._tags.delete(el.target.dataset.name);
      this._partialUpdate();
    }
  }

  _onPickColor(el) {
    if (el.target.tagName === `LABEL`) {
      this._color = el.target.textContent;
      this._partialUpdate();
    }
  }
  _onChangeRepeatedDay(el) {
    if (el.path[1].classList.contains(`card__repeat-days-inner`)) {
      this._repeatingDays[el.target.textContent] = !this._repeatingDays[el.target.textContent];
      this._state.isRepeated = this._isRepeated();
      if (!this._isRepeated) {
        this._partialUpdate();
      }
    }
  }
  _onChangeDateAndTime(el) {
    if (el.target.classList.contains(`card__date`)) {
      const [date, month] = el.target.value.split(` `);
      this._dueDate = moment(this._dueDate).set({date, month})._i;
      this._partialUpdate();
    }
    if (el.target.classList.contains(`card__time`)) {
      const [minAndHours, a] = el.target.value.split(` `);
      let [hour, minute] = minAndHours.split(`:`);
      if (a.toLowerCase() === `pm`) {
        hour = +hour;
        if (hour !== 12) {
          hour += 12;
        }
      }
      this._dueDate = moment(this._dueDate).set({minute, hour})._i;
    }
  }

  _onChangeFavorites() {
    this._isFavorite = !this._isFavorite;
    this._partialUpdate();
  }

  _onAddTag(el) {
    if (el.target.value.trim() === ``) {
      return;
    }
    this._tags.add(el.target.value);
    this._partialUpdate();
  }

  _onChangeText(el) {
    this._title = el.target.value;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      dueDate: this._dueDate,
      tags: new Set(),
      color: ``,
      repeatingDays: {mo: false,
        we: false,
        tu: false,
        th: false,
        fr: false,
        sa: false,
        su: false
      },
      isFavorite: false,
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    if (!this._state.isRepeated) {
      entry.repeatingDays = {mo: false,
        we: false,
        tu: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      };
    }
    return entry;
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    }
  }

  set onDelete(fn) {
    if (typeof fn === `function`) {
      this._onDelete = fn;
    }
  }

  get template() {
    return `<article
    class="card card--edit card--${this._color.toLowerCase()} ${this._isRepeated() ? `card--repeat` : ``} ${this._isDeadLine() ? `card--deadline` : ``} ${this._isDone ? `done` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}"
          >
            favorites
          </button>
        </div>
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >
${this._title}</textarea
                    >
                  </label>
                </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
              </button>
              <fieldset class="card__date-deadline" ${this._state.isDate ? `` : `disabled`}>
                ${inputInLabel(`card__input-deadline-wrap`, `card__date`, this._doDate(`date`), `date`)}
                ${inputInLabel(`card__input-deadline-wrap`, `card__time`, this._doDate(`time`), `time`)}
              </fieldset>
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
              </button>
              <fieldset class="card__repeat-days" ${this._state.isRepeated ? `` : `disabled`}>
                <div class="card__repeat-days-inner">
                  ${inputDay(`mo`, this._repeatingDays[`mo`])}
                  ${inputDay(`tu`, this._repeatingDays[`tu`])}
                  ${inputDay(`we`, this._repeatingDays[`we`])}
                  ${inputDay(`th`, this._repeatingDays[`th`])}
                  ${inputDay(`fr`, this._repeatingDays[`fr`])}
                  ${inputDay(`sa`, this._repeatingDays[`sa`])}
                  ${inputDay(`su`, this._repeatingDays[`su`])}
                </div>
              </fieldset>
            </div>
            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${this._addTags()}
              </div>
              ${inputInLabel(``, `card__hashtag-input`, `Type new hashtag here`, `hashtag-input`)}
            </div>
          </div>
          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="${this._picture ? this._picture : `img/add-photo.svg`}"
              alt="task picture"
              class="card__img"
            />
          </label>
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${inputColor(`black`, this._color)}
              ${inputColor(`pink`, this._color)}
              ${inputColor(`yellow`, this._color)}
              ${inputColor(`blue`, this._color)}
              ${inputColor(`green`, this._color)}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`)
      .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__hashtag-list`).addEventListener(`click`, this._onDelTag);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`click`, this._onPickColor);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__btn--favorites`).addEventListener(`click`, this._onChangeFavorites);
    this._element.querySelector(`.card__hashtag-input`).addEventListener(`focusout`, this._onAddTag);
    this._element.querySelector(`.card__text`).addEventListener(`focusout`, this._onChangeText);
    if (this._state.isDate) {
      flatpickr(`.card__date`, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(`.card__time`, {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
      this._element.querySelector(`.card__date-deadline`).addEventListener(`change`, this._onChangeDateAndTime);
    }
    if (this._state.isRepeated) {
      this._element.querySelector(`.card__repeat-days`).addEventListener(`click`, this._onChangeRepeatedDay);
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`)
      .removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`.card__hashtag-list`).removeEventListener(`click`, this._onDelTag);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`click`, this._onPickColor);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__btn--favorites`).removeEventListener(`click`, this._onChangeFavorites);
    this._element.querySelector(`.card__hashtag-input`).removeEventListener(`focusout`, this._onAddTag);
    this._element.querySelector(`.card__text`).removeEventListener(`focusout`, this._onChangeText);
    if (this._state.isDate) {
      this._element.querySelector(`.card__date-deadline`).removeEventListener(`change`, this._onChangeDateAndTime);
    }
    if (this._state.isRepeated) {
      this._element.querySelector(`.card__repeat-days`).removeEventListener(`click`, this._onChangeRepeatedDay);
    }
  }

  delError() {
    this._element.style.border = ``;
  }

  error() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._element.style.border = `4px solid red`;
    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => target.dueDate[value],
    };
  }
}

export default TaskEdit;
