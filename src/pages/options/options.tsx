import React from 'react';
import { render } from 'react-dom';

import OptionsComponent from "@components/OptionsComponent";

import { StorageKeys } from '@models/storage-keys.interface';


let token: string;
let projectIds: string;
let baseUrl: string;

/**
 * Saves the configuration to Chrome Storage
 * @param params
 * @param callback
 */
const saveOptions = (params: StorageKeys, callback) => {
  chrome.storage.sync.set({ token: params.token, projectIds: params.projectIds, baseUrl: params.baseUrl }, () => {
    callback();
  });
};

/**
 * Gets the configuration from Chrome Storage and renders OptionsComponent
 */
chrome.storage.sync.get(
  ['token', 'projectIds', 'baseUrl'],
  (keys: StorageKeys) => {
    if (!token) {
      token = keys.token;
      projectIds = keys.projectIds;
      baseUrl = keys.baseUrl;
    }

    render(<OptionsComponent token={token} projectIds={projectIds} baseUrl={baseUrl} handleSave={saveOptions} />, document.querySelector('#options'));
  }
);



