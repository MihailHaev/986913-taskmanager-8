import {inputInLabel} from './input';
import MainTask from './main-task';

class Task extends MainTask {
  constructor({title, dueDate, tags, picture, color, repeatingDays, isFavorite = false, isDone = false}) {
    super();
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isDone = isDone;
    this._isFavorite = isFavorite;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);

    this._state.isDate = !!dueDate;
    this._state.isRepeated = this._isRepeated();

    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    if (typeof fn === `function`) {
      this._onEdit = fn;
    }
  }

  get template() {
    return `<article
    class="card card--${this._color.toLowerCase()} ${this._state.isRepeated ? `card--repeat` : ``} ${this._isDeadLine() ? `card--deadline` : ``} ${this._isDone ? `done` : ``}">
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
              <fieldset class="card__date-deadline" ${this._state.isDate ? `` : `disabled`}>
                ${inputInLabel(`card__input-deadline-wrap`, `card__date`, this._doDate(`date`), `date`)}
                ${inputInLabel(`card__input-deadline-wrap`, `card__time`, this._doDate(`time`), `time`)}
              </fieldset>
            </div>
            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${this._addTags()}
              </div>
            </div>
          </div>
          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
            <img
              src="${this._picture ? this._picture : `img/add-photo.svg`}"
              alt="task picture"
              class="card__img"
            />
          </label>
        </div>
      </div>
    </form>
  </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }
}

export default Task;
