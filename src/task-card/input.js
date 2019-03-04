const inputInLabel = (classNameLabel, classNameInput, placeholder, name) => `<label class="${classNameLabel}">
<input
  class="${classNameInput}"
  type="text"
  placeholder="${placeholder}"
  name="${name}"
/>
</label>`;

const inputDay = (name, isChecked = false) => `<input
class="visually-hidden card__repeat-day-input"
type="checkbox"
id="repeat-${name}-2"
name="repeat"
value="${name}"
${isChecked ? `checked` : ``}
/>
<label class="card__repeat-day" for="repeat-${name}-2"
>${name}</label
>`;

const inputColor = (color, isChecked) => `<input
type="radio"
id="color-${color}-2"
class="card__color-input card__color-input--${color} visually-hidden"
name="color"
value="${color}"
${isChecked ? `checked` : ``}
/>
<label
for="color-${color}-2"
class="card__color card__color--${color}"
>${color}</label
>`;
export {inputInLabel, inputDay, inputColor};
