import { MergeRequest } from '@models/merge-request.interface';
import { Option } from '@models/option.interface';
import { StorageKeys } from '@models/storage-keys.interface';

export const UserOptions: Record<string, Option> = {
	Author: {id: 'author', label: 'Author', value: null},
	Description: {id: 'description', label: 'Description', value: null},
	Status: {id: 'status', label: 'Status', value: null},
	Last_Updated: {id: 'last_updated', label: 'Last updated', value: null},
	Reviewers: {id: 'reviewers', label: 'Reviewers', value: null},
	Merged_by: {id: 'merged_by', label: 'Merged by', value: null},
	Upvotes: {id: 'upvotes', label: 'Upvotes', value: null},
	Downvotes: {id: 'downvotes', label: 'Downvotes', value: null},
}

/**
 * Maps UserOptions with the corresponding value on GitLab's merge request.
 * Then matches the options stored by the user to be displayed and return only those.
 * @param mergeRequest
 */
export const getUserOptions = async (mergeRequest: MergeRequest): Promise<Option[]> => {
	const optionList = [
		{ ...UserOptions.Author, value: mergeRequest.author.name },
		{ ...UserOptions.Description, value: mergeRequest.description },
		{
			...UserOptions.Status,
			value: mergeRequest.state.toUpperCase(),
		},
		{
			...UserOptions.Last_Updated,
			value: new Date(mergeRequest.updated_at)?.toLocaleDateString(),
		},
		{ ...UserOptions.Reviewers, value: mergeRequest.reviewers?.map((rev) => rev?.name)?.join(', ') },
		{ ...UserOptions.Merged_by, value: mergeRequest.merge_user?.name },
		{ ...UserOptions.Upvotes, value: mergeRequest.upvotes },
		{ ...UserOptions.Downvotes, value: mergeRequest.downvotes },
	];

	return new Promise((resolve) =>
		chrome.storage.sync.get(['userOptions'], ({ userOptions }: StorageKeys) => {
			if (userOptions?.length) {
				resolve(optionList.filter(({ id }) => userOptions.some((optionId) => optionId === id)));
			}
			resolve(optionList);
		}),
	);
};
