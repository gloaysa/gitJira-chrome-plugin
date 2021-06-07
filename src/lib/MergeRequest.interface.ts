export interface MergeRequest {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: 'opened' | 'closed' | 'locked' | 'merged';
  created_at: string;
  updated_at: string;
  merged_by: Author;
  merged_at: string;
  closed_by: string;
  closed_at: string;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: Author;
  assignees: Author[];
  assignee: Author;
  reviewers: Author[];
  source_project_id: number;
  target_project_id: number;
  labels: string[];
  work_in_progress: false;
  milestone: string;
  merge_when_pipeline_succeeds: false;
  merge_status: 'can_be_merged' | 'unchecked' | 'checking' | 'cannot_be_merged' | 'cannot_be_merged_recheck';
  sha: string;
  merge_commit_sha: string;
  squash_commit_sha: string;
  discussion_locked: boolean;
  should_remove_source_branch: boolean;
  force_remove_source_branch: boolean;
  reference: number;
  references: {
    short: number;
    relative: number;
    full: string;
  };
  web_url:string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: string;
    human_total_time_spent: string;
  };
  squash: boolean;
  task_completion_status: {
    count: number;
    completed_count: number
  };
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  approvals_before_merge: number
}

export interface Author {
  id: number;
  name: string;
  username: string;
  state: 'active';
  avatar_url: string;
  web_url: string
}
