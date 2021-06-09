import { MergeRequest } from '@models/merge-request.interface';
import { Option } from '@models/option.interface';

export const UserOptions: Record<string, Option> = {
	Author: {id: 'author', label: 'Author', value: null},
	Description: {id: 'description', label: 'Description', value: null},
	Status: {id: 'status', label: 'Status', value: null},
	Reviewers: {id: 'reviewers', label: 'Reviewers', value: null},
	Merged_by: {id: 'merged_by', label: 'Merged by', value: null},
	Upvotes: {id: 'upvotes', label: 'Upvotes', value: null},
	Downvotes: {id: 'downvotes', label: 'Downvotes', value: null},
}

export const getUserOptions = async (mergeRequest: MergeRequest): Promise<Option[]> => {
	const optionList = [
		{ ...UserOptions.Author, value: mergeRequest.author.name },
		{ ...UserOptions.Description, value: mergeRequest.description },
		{
			...UserOptions.Status,
			value: `${mergeRequest.state.toUpperCase()} ${new Date(mergeRequest.merged_at)?.toLocaleDateString()}`,
		},
		{ ...UserOptions.Reviewers, value: mergeRequest.reviewers?.map((rev) => rev?.name)?.join(', ') },
		{ ...UserOptions.Merged_by, value: mergeRequest.merged_by?.name },
		{ ...UserOptions.Upvotes, value: mergeRequest.upvotes },
		{ ...UserOptions.Downvotes, value: mergeRequest.downvotes },
	];

	return new Promise((resolve) =>
		chrome.storage.sync.get(['userOptions'], (userOptionsIds: string[]) => {
			if (userOptionsIds?.length) {
				resolve(optionList.filter(({ id }) => userOptionsIds.some((optionId) => optionId === id)));
			}
			resolve(optionList);
		}),
	);
};
