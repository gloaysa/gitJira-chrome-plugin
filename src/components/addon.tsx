import { MergeRequest } from "../services/MergeRequest.interface";
import { getMrInfo } from "../services/gitlab.service";
import { StorageKeys } from '@models/storage-keys.interface';


let token: string;
let projectIds: string[];
let baseUrl: string;

export function Addon(currentTicket) {
  chrome.storage.sync.get(
    ['token', 'projectIds', 'baseUrl'],
    async (keys: StorageKeys) => {

      if (!token) {
        token = keys.token;
        projectIds = keys.projectIds?.replace(/\s/g, '')?.split(',');
        baseUrl = keys.baseUrl;
      }

      const mergeRequests: MergeRequest[] = await getMrInfo(currentTicket, token, baseUrl, projectIds);
      const mergeRequest: MergeRequest = mergeRequests[0];

      if (!mergeRequest) return;

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
      }">See MR in GitLab</a>
				</div>
				
				<hr>
				
			</div>`;

      app.id = 'root';

      setTimeout(() => {
        let content = document.getElementById('stalker') || document.getElementById('DETAILS');

        console.log('hola content', content);

        if (!content) return;
        content.parentNode.insertBefore(app, content.nextSibling);
      }, 500);

    }
  );
}
