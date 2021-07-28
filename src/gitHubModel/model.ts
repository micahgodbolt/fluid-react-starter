import { Octokit } from '@octokit/rest';
import { PullRequest } from './types';

export class GithubModel {
  private octokit: Octokit;
  constructor() {
    const accessToken = localStorage.getItem('githubAccessToken');
    this.octokit = new Octokit({
      auth: accessToken,
    });
  }

  public searchPullRequest = async (query: string, repos: string[]): Promise<PullRequest[]> => {
    let items: any[] = [];
    if (repos.length === 0) {
      const response = await this.octokit.search.issuesAndPullRequests({
        q: `${query}+is:pull-request`,
      });
      items = response.data.items;
    } else {
      const queryParams = repos.map((repo) => `${query}+is:pull-request+repo:${repo}`);
      const queryPromise = queryParams.map(async (queryParam) => {
        const response = await this.octokit.search.issuesAndPullRequests({ q: queryParam });
        items = [...items, ...response.data.items];
      });
      await Promise.all(queryPromise);
    }

    const pullRequests: PullRequest[] = items.map((item) => {
      return {
        id: `${item.id}`,
        title: item.title,
        authorId: `${item.user?.id}` || '',
        authorLogin: item.user?.login || '',
        authorAvatarUrl: item.user?.avatar_url || '',
        url: item.html_url,
        createdAt: item.created_at,
        description: item.body || '',
      };
    });
    return pullRequests;
  };

  public searchRepos = async (query: string): Promise<string[]> => {
    const response = await this.octokit.search.repos({ q: query });
    const items = response.data.items.map((item) => item.full_name);
    return items;
  };
}
