import React from 'react';
import { render } from 'react-dom';

import MergeRequestComponent from '@components/MergeRequestComponent';
import { StorageKeys } from '@models/storage-keys.interface';

const app = document.querySelector('#gitjira-app');

let token: string;
let projectIds: string[];
let baseUrl: string;
let jiraPrefix: string;

chrome.storage.sync.get(['token', 'projectIds', 'baseUrl', 'jiraPrefix'], async (keys: StorageKeys) => {
	if (!token) {
		token = keys.token;
		projectIds = keys.projectIds?.replace(/\s/g, '')?.split(',');
		baseUrl = keys.baseUrl;
		jiraPrefix = keys.jiraPrefix;
	}

	const config = { token, projectIds, baseUrl };

	const url = location.href;

	const match = url.match(`selectedIssue=([^&]+).*$`) || url.match(`([^/]+)/?$`);
	const jiraTicket = match ? match[1] : '';

	if (!jiraTicket || !jiraTicket.match(jiraPrefix)) return;

	if (app) render(<MergeRequestComponent config={config} jiraTicket={jiraTicket} />, app);
});
