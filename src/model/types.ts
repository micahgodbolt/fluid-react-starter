import { ISharedMap } from '@fluid-experimental/fluid-framework';
import { PullRequest } from '../gitHubModel';

export interface Node {
  pullRequest: PullRequest,
  status: Status,
}

export enum Status {
  Opened = "Opened",
  InReview = "In Review",
  Approved = "Approved",
}