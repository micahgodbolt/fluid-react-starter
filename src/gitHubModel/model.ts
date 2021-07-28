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

  public searchPullRequest = async (query: string, repos: string[]): Promise<PullRequest[]> => {
    const queryParam = repos.length === 0 ? `${query}+is:pull-request` : `${query}+is:pull-request+repo:${repos.join(" ")}`;
    const response =  await this.octokit.search.issuesAndPullRequests({q: queryParam});
    const items = response.data.items;

    const pullRequests: PullRequest[] = items.map((item) => {
      return {
        id: `${item.id}`,
        title: item.title,
        authorId: `${item.user?.id}` || "",
        authorLogin: item.user?.login || "",
        authorAvatarUrl: item.user?.avatar_url || "",
        url: item.html_url,
        createdAt: item.created_at,
        description: item.body || "",
      }
    })
    return pullRequests;
  }

  public searchRepos = async (query: string): Promise<string[]> => {
    const response =  await this.octokit.search.repos({q: query});
    const items = response.data.items.map(item => item.full_name);
    return items;
  }
}
