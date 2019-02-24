'use strict';

const sectionForFilters = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const textsForTaskCard = [`This is example of new task, you can add picture, set date and time, add tags.`, `It is example of repeating task. It marks by wave.`, `This is card with missing deadline`, `Here is a card with filled data`, ``];
const colorsForTaskCard = [`black`, `pink`, `yellow`, `blue`, `green`];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElementOfArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const doFilterCards = () => {
  boardTasks.innerHTML = ``;
  const arrayOfHTMLRandomLengthRandomCard = new Array(getRandomInt(0, 15)).fill(``).map(() => makeTaskCard({
    text: getRandomElementOfArray(textsForTaskCard),
    color: getRandomElementOfArray(colorsForTaskCard),
    img: getRandomBoolean(),
    gate: getRandomBoolean(),
    repeat: getRandomBoolean(),
    hashtag: getRandomBoolean(),
    deadline: getRandomBoolean()
  }));

  boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLRandomLengthRandomCard);
};

const makeFilter = (caption, amount, isChecked = false) => `<input
type="radio"
id="filter__${caption.toLowerCase()}"
class="filter__input visually-hidden"
name="filter"
${isChecked ? `checked` : ``}
${amount === 0 ? `disabled` : ``}
/>
<label
  for="filter__${caption.toLowerCase()}"
  class="filter__label">
${caption} <span class="filter__${caption.toLowerCase()}-count">${amount}</span></label
>`;

const makeTaskCard = ({text, color, img = false, date = false, repeat = false, hashtag = false, deadline = false}) => `<article
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
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${repeat ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" ${repeat ? `` : `disabled`}>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-2"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-2"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-2"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-2"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-2"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-2"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-2"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-2"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-2"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-2"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-2"
                />
                <label class="card__repeat-day" for="repeat-sa-2"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-2"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-2"
                  >su</label
                >
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
            ${hashtag ? `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="repeat"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #repeat
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>

          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="repeat"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #cinema
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>

          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="repeat"
              class="card__hashtag-hidden-input"
            />
            <button type="button" class="card__hashtag-name">
              #entertaiment
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>` : ``}
            </div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
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
            <input
              type="radio"
              id="color-black-2"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
              ${color === `black` ? `checked` : ``}
            />
            <label
              for="color-black-2"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-2"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
              ${color === `yellow` ? `checked` : ``}
            />
            <label
              for="color-yellow-2"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-2"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
              ${color === `blue` ? `checked` : ``}
            />
            <label
              for="color-blue-2"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-2"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
              ${color === `green` ? `checked` : ``}
            />
            <label
              for="color-green-2"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-2"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
              ${color === `pink` ? `checked` : ``}
            />
            <label
              for="color-pink-2"
              class="card__color card__color--pink"
              >pink</label
            >
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

const exampleOfCard = {
  text: getRandomElementOfArray(textsForTaskCard),
  color: getRandomElementOfArray(colorsForTaskCard),
  img: getRandomBoolean(),
  gate: getRandomBoolean(),
  repeat: getRandomBoolean(),
  hashtag: getRandomBoolean(),
  deadline: getRandomBoolean()
};

const arrayOfHTMLFilters = [makeFilter(`all`, getRandomInt(0, 15), true),
  makeFilter(`overdue`, getRandomInt(0, 15)),
  makeFilter(`today`, getRandomInt(0, 15)),
  makeFilter(`favorites`, getRandomInt(0, 15)),
  makeFilter(`repeating`, getRandomInt(0, 15)),
  makeFilter(`tags`, getRandomInt(0, 15)),
  makeFilter(`archive`, getRandomInt(0, 15))];
const arrayOfHTMLCards = new Array(7).fill(``).map(() => makeTaskCard(exampleOfCard));

sectionForFilters.insertAdjacentHTML(`beforeend`, arrayOfHTMLFilters);
boardTasks.insertAdjacentHTML(`beforeend`, arrayOfHTMLCards);

const filters = document.querySelectorAll(`.filter__label`);

filters.forEach((el) => el.addEventListener(`click`, doFilterCards));
