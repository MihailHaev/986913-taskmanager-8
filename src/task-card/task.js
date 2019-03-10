import {inputInLabel} from './input';
import doHashtag from './hashtag';
import createElement from '../element';

class Task {
  constructor({title, dueDate = false, tags, picture, color, repeatingDays, isFavorite = false, isDone = false}) {
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isDone = isDone;
    this._isFavorite = isFavorite;
    this._element = null;
    this._state = {

    };

    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadLine() {
    return (this._dueDate < new Date());
  }

  _addTags() {
    const tagsHTML = [];
    [...this._tags].forEach((el, i) => {
      tagsHTML[i] = doHashtag(el);
    });
    return tagsHTML.join(``);
  }

  _doDate(nameOfDate) {
    const formatDate = new Date(this._dueDate).toLocaleString(`en-US`, {
      year: `numeric`,
      month: `long`,
      day: `numeric`,
      weekday: `long`,
      timezone: `UTC`,
      hour: `numeric`,
      minute: `numeric`
    });
    if (nameOfDate === `date`) {
      let date = formatDate.split(`,`)[1].trim().split(` `);
      [date[1], date[0]] = [date[0], date[1]];
      return date.join(` `);
    } else if (nameOfDate === `time`) {
      return formatDate.split(`,`)[3].trim();
    }
    return false;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article
    class="card card--${this._color.toLowerCase()} ${this._isRepeated() ? `card--repeat` : ``} ${this._isDeadLine() ? `card--deadline` : ``} ${this._isDone ? `done` : ``}">
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
        <div class="card__titlearea-wrap">
          <label>
            <titlearea
              class="card__title"
              placeholder="Start typing your title here..."
              name="title"
            >
  ${this._title}</titlearea
            >
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
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

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }
}

export default Task;
