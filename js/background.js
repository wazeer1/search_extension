
importScripts('config.js', 'functions.js');

/*chrome.tabs.onActivated.addListener(function(activeInfo) {
    updateIcon(activeInfo.tabId);
});*/

//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {    
    updateIcon(tabId);
});

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "myMenu",
      title: "My Context Menu",
      contexts: ["page", "selection", "link"],
      onclick: function() {
        // Handle context menu click event
      }
    });
  });

function updateIcon(tabId) {
    chrome.tabs.get(tabId, function(change){

        chrome.tabs.get(tabId, function(tab){
            var url = tab.url;

            getFeedsURLs(url, function(feeds){

                nbFeeds = feeds.length;

                // console.log('nbFeeds (bg) : '+nbFeeds);

                if (nbFeeds == 0) {
                    chrome.action.setIcon({path: {"48": "/img/icon_grey-48.png"}, tabId: tabId});
                    chrome.action.setBadgeText({text: "", tabId: tabId});
                }
                else {
                    chrome.action.setIcon({path: {"48": "/img/icon_default-48.png"}, tabId: tabId});
                    chrome.action.setBadgeText({text: nbFeeds.toString(), tabId: tabId});
                }

            });
        });
    });
};



