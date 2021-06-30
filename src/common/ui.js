'use strict';

const ui = {
  get(...arg) {
    return chrome.i18n.getMessage(...arg);
  },
  textHandler(text = '') {
    const result = [];
    text = text.trim();
    if (text) {
      const tempArr = text.split('\n');
      tempArr.forEach(t => {
        t = t.trim().replace(/\s+/g, '');
        if (t) {
          result.push(t);
        }
      });
    }
    return result;
  },
};

export default ui;
