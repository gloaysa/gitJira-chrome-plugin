// Uncomment this block to reset the secret for debugging purposes
/*
	chrome.storage.sync.set({
		pass: null,
		secret: null
	});
	*/

chrome.browserAction.onClicked.addListener(() => {
	chrome.storage.sync.get(
		['token', 'projectIds', 'baseUrl'],
		(key: { token: string; projectIds: string[]; baseUrl: string }) => {
			if (!key.token || !key.projectIds || !key.baseUrl) {
				return chrome.runtime.openOptionsPage();
			}
		}
	);
});

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
