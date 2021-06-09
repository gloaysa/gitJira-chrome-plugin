import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { getMrInfo } from '../services/gitlab.service';
import { Option } from '@models/option.interface';
import { MergeRequest } from '@models/merge-request.interface';
import JiraModuleComponent from '@components/JiraModuleComponent';

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

	useEffect(() => {
		const getMergeRequest = async () => {
			const mergeRequests: MergeRequest[] = await getMrInfo(jiraTicket, token, baseUrl, projectIds);
			setMergeRequest(mergeRequests[0]);
		};
		getMergeRequest();
	}, [jiraTicket]);

	if (!mergeRequest) return <></>;

	const properties: Option[] = [
		{ label: 'Author', value: mergeRequest.author.name },
		{
			label: 'Status',
			value: `${mergeRequest.state.toUpperCase()} ${new Date(mergeRequest.merged_at)?.toLocaleDateString()}`,
		},
		{ label: 'Reviewers', value: mergeRequest.reviewers?.map((rev) => rev?.name)?.join(', ') },
		{ label: 'Merged by', value: mergeRequest.merged_by?.name },
		{ label: 'Upvotes', value: mergeRequest.upvotes },
		{ label: 'Downvotes', value: mergeRequest.downvotes },
	];

	const displayList = (): JSX.Element[] => {
		return properties.map(({ label, value }, i) => {
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
			<div className="field-ignore-highlight editable-field inactive">
				<ReactMarkdown className="user-content-block">{mergeRequest.description}</ReactMarkdown>
			</div>
			<br />

			<div className="mod-content">
				<ul className="property-list two-cols">{displayList()}</ul>
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
	}
}

export default MergeRequestComponent;
