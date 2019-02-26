import {inputInLabel, inputDay, inputColor} from './do-input-html';
import doHashtag from './do-hashtag';

export default ({text, color, img = false, date = false, repeat = false, hashtag = false, deadline = false}) => `<article
  class="card card--${color.toLowerCase()} ${repeat ? `card--repeat` : ``} ${deadline ? `card--deadline` : ``}">
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
          class="card__btn card__btn--favorites card__btn--disabled"
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
${text}</textarea
          >
        </label>
      </div>
      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${date ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__date-deadline" ${date ? `` : `disabled`}>
              ${inputInLabel(`card__input-deadline-wrap`, `card__date`, `23 September`, `date`)}
              ${inputInLabel(`card__input-deadline-wrap`, `card__time`, `11:15 PM`, `time`)}
            </fieldset>
            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${repeat ? `yes` : `no`}</span>
            </button>
            <fieldset class="card__repeat-days" ${repeat ? `` : `disabled`}>
              <div class="card__repeat-days-inner">
                ${inputDay(`mo`)}
                ${inputDay(`tu`, true)}
                ${inputDay(`we`)}
                ${inputDay(`th`)}
                ${inputDay(`fr`, true)}
                ${inputDay(`sa`)}
                ${inputDay(`su`, true)}
              </div>
            </fieldset>
          </div>
          <div class="card__hashtag">
            <div class="card__hashtag-list">
            ${hashtag ? doHashtag(`repeat`) + doHashtag(`cinema`) + doHashtag(`entertaiment`) : ``}
            </div>
            ${inputInLabel(``, `card__hashtag-input`, `Type new hashtag here`, `hashtag-input`)}
          </div>
        </div>
        <label class="card__img-wrap ${img ? `` : `card__img-wrap--empty`}">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="${img ? `img/sample-img.jpg` : `img/add-photo.svg`}"
            alt="task picture"
            class="card__img"
          />
        </label>
        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            ${inputColor(`black`, `${color === `black` ? true : false}`)}
            ${inputColor(`black`, `${color === `yellow` ? true : false}`)}
            ${inputColor(`black`, `${color === `blue` ? true : false}`)}
            ${inputColor(`black`, `${color === `green` ? true : false}`)}
            ${inputColor(`black`, `${color === `pinl` ? true : false}`)}
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
