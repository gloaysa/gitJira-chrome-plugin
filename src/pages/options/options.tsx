import React from 'react';
import { render } from 'react-dom';

import OptionsComponent from '@components/OptionsComponent';

import { StorageKeys } from '@models/storage-keys.interface';

let token: string;
let projectIds: string;
let baseUrl: string;
let jiraPrefix: string;

/**
 * Saves the configuration to Chrome Storage
 * @param config
 * @param callback
 */
const saveOptions = (config: StorageKeys, callback) => {
	chrome.storage.sync.set(
		{ token: config.token, projectIds: config.projectIds, baseUrl: config.baseUrl, jiraPrefix: config.jiraPrefix },
		() => callback()
	);
};

/**
 * Gets the configuration from Chrome Storage and renders OptionsComponent
 */
chrome.storage.sync.get(['token', 'projectIds', 'baseUrl', 'jiraPrefix'], (keys: StorageKeys) => {
	if (!token) {
		token = keys.token;
		projectIds = keys.projectIds;
		baseUrl = keys.baseUrl;
		jiraPrefix = keys.jiraPrefix;
	}

	render(<OptionsComponent config={keys} handleSaveConfiguration={saveOptions} />, document.querySelector('#options'));
});
