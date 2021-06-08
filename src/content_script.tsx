import { MergeRequest } from './lib/MergeRequest.interface';

let token = '';
let projectId = '';
let baseUrl = '';

async function getMrInfo(jiraTicket: string): Promise<MergeRequest[]> {
	const baseApi = 'api/v4/projects';
	const params = `search=${jiraTicket}&in=title`;
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${token}`);

	const response = await fetch(`https://${baseUrl}/${baseApi}/${projectId}/merge_requests?${params}`, { headers });
	return response.json();
}

chrome.storage.sync.get(
	['token', 'projectId', 'baseUrl'],
	async (key: { token: string; projectId: string; baseUrl: string }) => {
		const jiraTicket = location.href.match(`([^/]+)/?$`)[1];

		if (!jiraTicket) return;

		if (!token) {
			token = key.token || '';
			projectId = key.projectId || '';
			baseUrl = key.baseUrl || '';
		}

		const mergeRequests: MergeRequest[] = await getMrInfo(jiraTicket);
		const mergeRequest: MergeRequest = mergeRequests[0];

		if (!mergeRequest) return;

		const content = document.getElementById('stalker');
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
					<span class="value">${mergeRequest.reviewers.map((rev) => rev.name)?.join(', ')}</span>
				</div>
			</li>
			<li class="item">
				<div class="wrap">
					<strong class="name">Merged by:</strong>
					<span class="value">${mergeRequest.merged_by.name}</span>
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
