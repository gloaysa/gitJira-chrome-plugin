import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { getMrInfo } from '../services/gitlab.service';
import { MergeRequest } from '@models/merge-request.interface';
import JiraModuleComponent from '@components/JiraModuleComponent';
import { getUserOptions } from '../services/user-options.service';
import { Option } from '@models/option.interface';

interface Props {
	config: {
		token: string;
		projectIds: string[];
		baseUrl: string;
	};
	jiraTicket: string;
}

const MergeRequestComponent: React.FunctionComponent<Props> = ({ config, jiraTicket }) => {
	const { token, baseUrl, projectIds } = config;
	const [mergeRequest, setMergeRequest] = useState<MergeRequest>(null);
	const [userOptions, setUserOptions] = useState<Option[]>(null);

	useEffect(() => {
		const getMergeRequest = async () => {
			const mergeRequests: MergeRequest[] = await getMrInfo(jiraTicket, token, baseUrl, projectIds);
			setMergeRequest(mergeRequests[0]);
		};
		getMergeRequest();
	}, [jiraTicket]);

	useEffect(() => {
		if (mergeRequest) {
			const getOptions = async () => {
				const options: Option[] = await getUserOptions(mergeRequest);
				setUserOptions(options);
			}
			getOptions();
		}
	}, [mergeRequest])

	if (!mergeRequest) return <></>;

	const displayList = (): JSX.Element[] => {
		return userOptions?.map(({ label, value }, i) => {
			if (value) {
				return (
					<li className="item" key={i}>
						<div className="wrap">
							<strong className="name">{label}:</strong>
							<span className="value">{value}</span>
						</div>
					</li>
				);
			}
		});
	};

	return (
		<JiraModuleComponent moduleName="GitLab Info">
			<div className="field-ignore-highlight editable-field inactive" style={styles.description}>
				<ReactMarkdown className="user-content-block">{mergeRequest.description}</ReactMarkdown>
			</div>
			<br />

			<div className="mod-content">
				<ul className="property-list">{displayList()}</ul>
			</div>

			<div style={styles.button_wrapper}>
				<div className="aui-buttons">
					<a
						className="button aui-style-default aui-button aui-button-primary"
						target="_blank"
						href={mergeRequest.web_url}
					>
						See MR in GitLab
					</a>
				</div>
			</div>

		</JiraModuleComponent>
	);
};

const styles = {
	button_wrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	description: {
		maxHeight: '400px',
		overflow: 'auto'
	}
}

export default MergeRequestComponent;
