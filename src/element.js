export default (inner) => {
  const elem = document.createElement(`div`);
  const fragment = document.createDocumentFragment();
  elem.innerHTML = inner;
  const childLength = elem.childNodes.length;
  if (childLength === 1) {
    return elem.firstChild;
  } else if (childLength === 0) {
    throw new Error(`Nothing element to create`);
  } else {
    for (let i = 0; i < elem.childNodes.length; i++) {
      fragment.appendChild(elem.childNodes[i]);
    }
    return fragment;
  }
};
