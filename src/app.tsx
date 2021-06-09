import React from 'react';
import { render } from 'react-dom';

import MergeRequestComponent from "@components/MergeRequestComponent";

const app = document.querySelector('#gitjira-app');

if (app) render(<MergeRequestComponent />, app);
