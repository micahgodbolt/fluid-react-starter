import { Octokit } from '@octokit/rest';
import { PullRequest } from './types';



export class GithubModel  {
  private octokit: Octokit;
  constructor() {
    const accessToken = localStorage.getItem("githubAccessToken");
    this.octokit = new Octokit({
      auth: accessToken,
    });
  }

  public searchPullRequest = async (query: string): Promise<PullRequest[]> => {
    const response =  await this.octokit.search.issuesAndPullRequests({q: `${query}+is:pull-request`});
    const items = response.data.items;
    const pullRequests: PullRequest[] = items.map((item) => {
      return {
        title: item.title,
        authorId: `${item.user?.id}` || "",
        authorLogin: item.user?.login || "",
        authorAvatarUrl: item.user?.avatar_url || "",
        createdAt: new Date(item.created_at)
      }
    })
    return pullRequests;
  }
}
