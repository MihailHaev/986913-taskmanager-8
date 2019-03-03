export default (caption, amount, isChecked = false) => `<input
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
