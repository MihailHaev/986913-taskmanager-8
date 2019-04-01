import Component from './component';

class Filter extends Component {
  constructor(caption, amount, isChecked = false) {
    super();
    this._caption = caption;
    this._amount = amount;

    this._state.isChecked = isChecked;

    this._onChange = this._onChange.bind(this);
    this._onFilter = null;
  }
  _onChange(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  set onFilter(fn) {
    if (typeof fn === `function`) {
      this._onFilter = fn;
    }
  }

  get template() {
    return `<input
    type="radio"
    id="filter__${this._caption.toLowerCase()}"
    class="filter__input visually-hidden"
    name="filter"
    ${this._state.isChecked ? `checked` : ``}
    ${this._amount === 0 ? `disabled` : ``}
    />
    <label
      for="filter__${this._caption.toLowerCase()}"
      class="filter__label">
    ${this._caption} <span class="filter__${this._caption.toLowerCase()}-count">${this._amount}</span></label
    >`.trim();
  }

  bind() {
    this._element.querySelector(`.filter__input`).addEventListener(`change`, this._onChange);
  }

  unbind() {}
}

export default Filter;
