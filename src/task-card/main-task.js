import doHashtag from './hashtag';
import Component from '../component';
import moment from 'moment';

class MainTask extends Component {
  constructor() {
    super();
  }
  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadLine() {
    return this._state.isDate && this._dueDate < Date.now();
  }

  _addTags() {
    const tagsHTML = [];
    [...this._tags].forEach((el, i) => {
      tagsHTML[i] = doHashtag(el);
    });
    return tagsHTML.join(``);
  }

  _doDate(nameOfDate) {
    if (nameOfDate === `date`) {
      return moment(this._dueDate).format(`D MMMM`);
    } else if (nameOfDate === `time`) {
      return moment(this._dueDate).format(`h:mm A`);
    } else {
      return false;
    }
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
    this._isFavorite = data.isFavorite;
    this._state.isDate = !!data.dueDate;
    this._state.isRepeated = this._isRepeated();
  }
}

export default MainTask;
