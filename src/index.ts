// Uncomment this block to reset the secret for debugging purposes
/*
	chrome.storage.sync.set({
		pass: null,
		secret: null
	});
	*/

import React from "react";

chrome.browserAction.onClicked.addListener(() => {
	chrome.storage.sync.get(
		['token', 'projectId', 'baseUrl'],
		(key: { token: string; projectId: string; baseUrl: string }) => {
			if (!key.token || !key.projectId || !key.baseUrl) {
				return chrome.runtime.openOptionsPage();
			}
		}
	);

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.setting == 'popup') {
		chrome.browserAction.setPopup({ popup: '../popup.html' });
		sendResponse({ setting: 'popup enabled' });
	}

	if (request.setting == 'click') {
		chrome.browserAction.setPopup({ popup: '' });
		sendResponse({ setting: 'click enabled' });
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if (changeInfo.status === 'complete') {
		chrome.tabs.query({ active: true }, (tabs) => {
			const tab = tabs[0];
			if (tab.url?.match('https://devstack.vwgroup.com/jira/')) {
				const jiraTicket = tab.url.match(`([^/]+)/?$`)[1];
			}
		})
	}

})
