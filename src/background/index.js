'use strict';

chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.local.get(['interval', 'urls'], res => {
    const interval = res.interval || 500;
    const urls = res.urls || [];
    urls.forEach((url, index) => {
      setTimeout(() => {
        chrome.tabs.create({
          url: /^(?:https?|ftp):/i.test(url) ? url : 'http://' + url,
        });
      }, interval * index);
    });
  });
});
