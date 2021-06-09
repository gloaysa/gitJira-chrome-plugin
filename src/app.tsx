import React from 'react';
import { render } from 'react-dom';

import MergeRequestComponent from '@components/MergeRequestComponent';
import { StorageKeys } from '@models/storage-keys.interface';

const app = document.querySelector('#gitjira-app');

let token: string;
let projectIds: string[];
let baseUrl: string;

chrome.storage.sync.get(['token', 'projectIds', 'baseUrl'], async (keys: StorageKeys) => {
	if (!token) {
		token = keys.token;
		projectIds = keys.projectIds?.replace(/\s/g, '')?.split(',');
		baseUrl = keys.baseUrl;
	}

	const url = location.href;

	const match = url.match(`selectedIssue=([^&]+).*$`) || url.match(`([^/]+)/?$`);
	const jiraTicket = match ? match[1] : '';

	// if (!jiraTicket || !jiraTicket.match('WECOMMERCE')) return;
	if (!jiraTicket) return;

	if (app)
		render(
			<MergeRequestComponent token={token} projectIds={projectIds} baseUrl={baseUrl} jiraTicket={jiraTicket} />,
			app
		);
});
