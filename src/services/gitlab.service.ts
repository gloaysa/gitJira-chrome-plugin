import { MergeRequest } from '@models/merge-request.interface';

export const getMrInfo = async (
	jiraTicket: string,
	token: string,
	baseUrl: string,
	projectIds: string[]
): Promise<MergeRequest[]> => {
	const baseApi = 'api/v4/projects';
	const params = `search=${jiraTicket}&in=title`;
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${token}`);

	try {
		const responses = await Promise.all(
			projectIds.map((id) => fetch(`https://${baseUrl}/${baseApi}/${id}/merge_requests?${params}`, { headers }))
		);
		const response = responses.find((repo) => repo.status === 200);

		if (!response) return [];

		return response.json();
	} catch (e) {}
};
