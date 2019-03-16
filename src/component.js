import createNewElement from './element';

class Component {
  constructor() {
    if (new.target === `Component`) {
      throw new Error(`This is abstract`);
    }
    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`Nothing in template`);
  }
  render() {
    this._element = createNewElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  bind() {

  }

  unbind() {

  }
}

export default Component;
