import makeInfo from './info';
import makeCard from './card';

export default (length = false) => {
  if (!length) {
    return makeCard(makeInfo());
  } else {
    return new Array(length).fill().map(() => makeCard(makeInfo())).join(``);
  }
};
