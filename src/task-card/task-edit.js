import {inputInLabel, inputDay, inputColor} from './input';
import doHashtag from './hashtag';
import Component from '../component';

class TaskEdit extends Component {
  constructor({title, dueDate = false, tags, picture, color, repeatingDays, isFavorite = false, isDone = false}) {
    super();
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

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onSubmit = null;
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

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
              </button>
              <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                ${inputInLabel(`card__input-deadline-wrap`, `card__date`, this._doDate(`date`), `date`)}
                ${inputInLabel(`card__input-deadline-wrap`, `card__time`, this._doDate(`time`), `time`)}
              </fieldset>
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${this._isRepeated ? `yes` : `no`}</span>
              </button>
              <fieldset class="card__repeat-days" ${this._isRepeated ? `` : `disabled`}>
                <div class="card__repeat-days-inner">
                  ${inputDay(`mo`, this._repeatingDays[`Mo`])}
                  ${inputDay(`tu`, this._repeatingDays[`Tu`])}
                  ${inputDay(`we`, this._repeatingDays[`We`])}
                  ${inputDay(`th`, this._repeatingDays[`Th`])}
                  ${inputDay(`fr`, this._repeatingDays[`Fr`])}
                  ${inputDay(`sa`, this._repeatingDays[`Sa`])}
                  ${inputDay(`su`, this._repeatingDays[`Su`])}
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
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}

export default TaskEdit;
