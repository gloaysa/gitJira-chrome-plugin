/**
 * This is the starting file that Chrome will load and keep running once the Plugin
 * is installed. You can read more information in https://developer.chrome.com/docs/extensions/mv2/background_pages/
 */

let currentTabId: number;

/**
 * This function listen for a click on the plugin icon.
 * If the user clicks it, we redirect them to the Options page.
 */
chrome.browserAction.onClicked.addListener(() => {
	return chrome.runtime.openOptionsPage();
});

/**
 * This function listen for the current tab update event.
 * On every update, we execute two scripts:
 *  - app-injector: appends to the current tab the app.
 *  - app: once the app-injector has finished appending the new place for the app to live
 *    inside the current tab, we load our app on it.
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	currentTabId = tabId;
	if (changeInfo.status === 'complete' && tab.url.includes('http')) {
		chrome.tabs.executeScript(tabId, { file: './app-injector.js' });
	}
});

chrome.runtime.onMessage.addListener((message) => {
	if (message === 'app ready') {
		chrome.tabs.executeScript(currentTabId, { file: './app.js' }, function () {
			console.log('INJECTED AND EXECUTED');
		});
	}
})

/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // location.href.match(`selectedIssue=([^&]+).*$`);
  const match = tab.url.match(`selectedIssue=([^&]+).*$`) || tab.url.match(`([^/]+)/?$`);
  const jiraTicket = match ? match[1] : '';

  if (!jiraTicket.match('WECOMMERCE')) return;

  if (!jiraTicket) return;

	chrome.tabs.sendMessage(tabId, {
		message: 'jira ticket changed',
		ticket: jiraTicket,
	});
});
 */
