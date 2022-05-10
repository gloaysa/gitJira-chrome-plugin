import React from 'react';
import { render } from 'react-dom';

import OptionsComponent from '@components/OptionsComponent';

import { StorageKeys } from '@models/storage-keys.interface';

/**
 * Saves the configuration to Chrome Storage
 * @param config
 * @param callback
 */
const saveOptions = (config: StorageKeys, callback) => {
	chrome.storage.sync.set(
		{
			token: config.token,
			projectIds: config.projectIds,
			baseUrl: config.baseUrl,
			jiraPrefix: config.jiraPrefix,
			userOptions: config.userOptions,
			collapsed: config.collapsed
		},
		() => callback()
	);
};

/**
 * Gets the configuration from Chrome Storage and renders OptionsComponent
 */
chrome.storage.sync.get(['token', 'projectIds', 'baseUrl', 'jiraPrefix', 'userOptions', 'collapsed'], (keys: StorageKeys) => {
	render(<OptionsComponent config={keys} handleSaveConfiguration={saveOptions} />, document.querySelector('#options'));
});
