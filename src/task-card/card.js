import {inputInLabel, inputDay, inputColor} from './input';
import doHashtag from './hashtag';

export default ({title, dueDate = false, tags, picture, color, repeatingDays, isFavorite = false, isDone = false}) => {
  dueDate = new Date(dueDate);

  let isRepeating = false;
  let isDeadline = false;
  let isTags = true;
  let tagsHTML = [];
  for (let i in repeatingDays) {
    if (repeatingDays[i]) {
      isRepeating = true;
      break;
    }
  }
  isDeadline = (dueDate < new Date());
  if (tags.size === 0) {
    isTags = false;
  } else {
    [...tags].forEach((el, i) => {
      tagsHTML[i] = doHashtag(el);
    });
  }
  const dateTime = dueDate.toLocaleString(`en-US`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
    weekday: `long`,
    timezone: `UTC`,
    hour: `numeric`,
    minute: `numeric`
  });

  let date = dateTime.split(`,`)[1].trim().split(` `);
  [date[1], date[0]] = [date[0], date[1]];
  date = date.join(` `);
  let time = dateTime.split(`,`)[3].trim();


  return `<article
  class="card card--${color.toLowerCase()} ${isRepeating ? `card--repeat` : ``} ${isDeadline ? `card--deadline` : ``} ${isDone ? `done` : ``}">
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
          class="card__btn card__btn--favorites ${isFavorite ? `` : `card__btn--disabled`}"
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
${title}</titlearea
          >
        </label>
      </div>
      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${dueDate ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__date-deadline" ${dueDate ? `` : `disabled`}>
              ${inputInLabel(`card__input-deadline-wrap`, `card__date`, date, `date`)}
              ${inputInLabel(`card__input-deadline-wrap`, `card__time`, time, `time`)}
            </fieldset>
            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__repeat-days" ${isRepeating ? `` : `disabled`}>
              <div class="card__repeat-days-inner">
                ${inputDay(`mo`, repeatingDays[`Mo`])}
                ${inputDay(`tu`, repeatingDays[`Tu`])}
                ${inputDay(`we`, repeatingDays[`We`])}
                ${inputDay(`th`, repeatingDays[`Th`])}
                ${inputDay(`fr`, repeatingDays[`Fr`])}
                ${inputDay(`sa`, repeatingDays[`Sa`])}
                ${inputDay(`su`, repeatingDays[`Su`])}
              </div>
            </fieldset>
          </div>
          <div class="card__hashtag">
            <div class="card__hashtag-list">
            ${isTags ? tagsHTML.join(``) : ``}
            </div>
            ${inputInLabel(``, `card__hashtag-input`, `Type new hashtag here`, `hashtag-input`)}
          </div>
        </div>
        <label class="card__img-wrap ${picture ? `` : `card__img-wrap--empty`}">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="${picture ? picture : `img/add-photo.svg`}"
            alt="task picture"
            class="card__img"
          />
        </label>
        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            ${inputColor(`black`, color)}
            ${inputColor(`black`, color)}
            ${inputColor(`black`, color)}
            ${inputColor(`black`, color)}
            ${inputColor(`black`, color)}
          </div>
        </div>
      </div>
      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`;
};
