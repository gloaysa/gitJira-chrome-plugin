import React from 'react';
import { render } from 'react-dom';

import MergeRequestComponent from '@components/MergeRequestComponent';
import { StorageKeys } from '@models/storage-keys.interface';

const app = document.querySelector('#gitjira-app');

let token: string;
let projectIds: string[];
let baseUrl: string;
let jiraPrefix: string;
let collapsed: boolean;

chrome.storage.sync.get(['token', 'projectIds', 'baseUrl', 'jiraPrefix', 'collapsed'], async (keys: StorageKeys) => {
	if (typeof  keys.projectIds === 'string') {
		// this conversion is necessary because Chrome storage doesn't store arrays
		keys.projectIds = (keys.projectIds as string).split(',');
	}
	if (!token) {
		token = keys.token;
		projectIds = keys.projectIds;
		baseUrl = keys.baseUrl;
		jiraPrefix = keys.jiraPrefix;
		collapsed = keys.collapsed;
	}

	const config: StorageKeys = { token, projectIds, baseUrl, collapsed, jiraPrefix };

	const url = location.href;

	const match = url.match(`selectedIssue=([^&]+).*$`) || url.match(`([^/]+)/?$`);
	const jiraTicket = match ? match[1] : '';

	if (!jiraTicket || !jiraTicket.match(jiraPrefix)) return;

	if (app) render(<MergeRequestComponent config={config} jiraTicket={jiraTicket} />, app);
});
