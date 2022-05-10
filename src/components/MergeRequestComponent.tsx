import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { getMrInfo } from '../services/gitlab.service';
import { MergeRequest } from '@models/merge-request.interface';
import JiraModuleComponent from '@components/JiraModuleComponent';
import { getUserOptions } from '../services/user-options.service';
import { Option } from '@models/option.interface';
import { StorageKeys } from '@models/storage-keys.interface';

interface Props {
	config: StorageKeys;
	jiraTicket: string;
}

const MergeRequestComponent: React.FunctionComponent<Props> = ({ config, jiraTicket }) => {
	const { token, baseUrl, projectIds } = config;
	const [mergeRequest, setMergeRequest] = useState<MergeRequest>(null);
	const [userOptions, setUserOptions] = useState<Option[]>([]);

	console.log(config.projectIds)

	useEffect(() => {
		const getMergeRequest = async () => {
			const mergeRequests: MergeRequest[] = await getMrInfo(jiraTicket, token, baseUrl, projectIds);
			const latestMergeRequest = mergeRequests.reduce((prev, current) => {
				return new Date(prev.created_at).getTime() > new Date(current.created_at).getTime() ? prev : current;
			}, mergeRequests[0])
			setMergeRequest(latestMergeRequest);
		};
		getMergeRequest();
	}, [jiraTicket]);

	useEffect(() => {
		if (mergeRequest) {
			const getOptions = async () => {
				const options: Option[] = await getUserOptions(mergeRequest);
				setUserOptions(options);
			};
			getOptions();
		}
	}, [mergeRequest]);

	if (!mergeRequest) return <></>;

	const displayList = (): JSX.Element[] => {
		return userOptions
			.filter(({ id }) => id !== 'description')
			.map(({ label, value }, i) => {
				return (
					<li className="item" key={i}>
						<div className="wrap">
							<strong className="name">{label}:</strong>
							<span className="value">{value || '---'}</span>
						</div>
					</li>
				);
			});
	};

	return (
		<JiraModuleComponent expanded={!config.collapsed} moduleName="GitLab Info">
			{userOptions?.some((option) => option.id === 'description') && (
				<div className="field-ignore-highlight editable-field inactive" style={styles.description}>
					<ReactMarkdown className="user-content-block">{mergeRequest.description}</ReactMarkdown>
				</div>
			)}
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
		justifyContent: 'flex-start',
		marginTop: '20px'
	},
	description: {
		maxHeight: '400px',
		overflow: 'auto',
	},
};

export default MergeRequestComponent;
