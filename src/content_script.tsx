import { MergeRequest } from './lib/MergeRequest.interface';

let token: string;
let projectIds: string[];
let baseUrl: string;

async function getMrInfo(jiraTicket: string): Promise<MergeRequest[]> {
	const baseApi = 'api/v4/projects';
	const params = `search=${jiraTicket}&in=title`;
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${token}`);

	try {
		const responses = await Promise.all(projectIds.map((id) => fetch(`https://${baseUrl}/${baseApi}/${id}/merge_requests?${params}`, { headers })))
		const response = responses.find((repo) => repo.status === 200);

		if (!response) return [];

		return response?.json();
	} catch (e) {

	}
}

chrome.storage.sync.get(
	['token', 'projectIds', 'baseUrl'],
	async (key: { token: string; projectIds: string[]; baseUrl: string }) => {
		// location.href.match(`selectedIssue=([^&]+).*$`);
		const match = location.href.match(`([^/]+)/?$`);
		const jiraTicket = match ? match[1] : '';

		// if (!jiraTicket.match('WECOMMERCE')) return;

		if (!jiraTicket) return;

		if (!token) {
			token = key.token;
			projectIds = key.projectIds;
			baseUrl = key.baseUrl;
		}

		const mergeRequests: MergeRequest[] = await getMrInfo(jiraTicket);
		const mergeRequest: MergeRequest = mergeRequests[0];

		if (!mergeRequest) return;

		let content = document.getElementById('stalker') || document.getElementById('ghx-detail-issue');

		if (!content) return;

		const app: HTMLDivElement = document.createElement('div');

		app.innerHTML = `
<div class="issue-body-content">
	<div class="mod-content">
		<div class="field-ignore-highlight editable-field inactive">
			<p class="user-content-block">${mergeRequest.description}</p>
		</div>
	</div>
	<br>
		
	<div class="mod-content">
		<ul class="property-list two-cols">
			<li class="item">
				<div class="wrap">
					<strong class="name">Status:</strong> 
					<span class="value">${mergeRequest.state} ${new Date(mergeRequest.merged_at)?.toLocaleDateString()}</span>
				</div>
			</li>
			<li class="item">
				<div class="wrap">
					<strong class="name">Reviewers:</strong>
					<span class="value">${mergeRequest.reviewers?.map((rev) => rev?.name)?.join(', ')}</span>
				</div>
			</li>
			<li class="item">
				<div class="wrap">
					<strong class="name">Merged by:</strong>
					<span class="value">${mergeRequest.merged_by?.name}</span>
				</div>
			</li>
		</ul>
	</div>
	
	<br>
	
	<div class="aui-buttons">
		<a class="button aui-style-default aui-button aui-button-primary" target="_blank" href="${
			mergeRequest.web_url
		}">GitLab MR</a>
	</div>
	
	<hr>
	
</div>`;

		app.id = 'root';
		content.parentNode.insertBefore(app, content.nextSibling);
	}
);
