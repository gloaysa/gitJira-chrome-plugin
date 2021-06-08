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
