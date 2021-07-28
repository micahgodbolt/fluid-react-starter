import React from 'react';
import { useGetDiceStore, useGetAudienceStore } from '../store';
import { DefaultButton, SearchBox } from '@fluentui/react';
import AsyncSelect from 'react-select/async';
import { useGithubModel } from '../../utils';
import { PullRequest } from '../../gitHubModel';
import { SearchResults } from './SearchResults';
import { Status, Node } from '../../model';
import { PullRequestCard } from './PullRequestCard';
import { Card } from 'semantic-ui-react';
import { OptionTypeBase, GroupTypeBase } from 'react-select';

export const DiceRollerList = () => {
  const {
    dispatch,
    actions: { editDice, createDice, deleteDice, setRepos },
    queries: { getAllDice, getRepos },
  } = useGetDiceStore();

  const {
    queries: { getAudienceSize, getAudienceNames },
  } = useGetAudienceStore();

  const { searchPullRequest, searchRepos } = useGithubModel();

  const [searchText, setSearchText] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<PullRequest[]>([]);
  const repos = getRepos();
  const searchCallback = React.useCallback(
    async (query: string | undefined) => {
      if (!query) {
        setSearchResults([]);
      } else {
        const results = await searchPullRequest(query, repos);
        setSearchResults(results);
      }
    },
    [searchPullRequest, repos]
  );

  const updateStatus = (node: Node, status: Status) =>
    dispatch(
      editDice({
        id: node.pullRequest.id,
        props: { ...node, status },
      })
    );

  const createCard = (pullRequest: PullRequest) =>
    dispatch(createDice({ id: pullRequest.id, props: { pullRequest, status: Status.Opened } }));

  const deleteNode = (id: string) => dispatch(deleteDice({ id }));
  const allPullRequests = getAllDice();

  const pullRequestCards = allPullRequests.map((node) => {
    return <PullRequestCard node={node} onUpdateStatus={updateStatus} onDeleteNode={deleteNode} />;
  });

  const loadRepoOptions = (inputValue: string, callback: (options: any) => void) => {
    if (inputValue.length > 0) {
      searchRepos(inputValue).then((repos) => {
        const options = repos.map((repo) => {
          return { value: repo, label: repo };
        });
        callback(options);
      });
    } else {
      callback([]);
    }
  };

  const selectedRepos = repos.map((repo) => {
    return { value: repo, label: repo };
  });

  return (
    <div style={{ textAlign: 'center', margin: '3vh' }}>
      <div>Audience Size: {getAudienceSize()}</div>
      <div style={{ marginBottom: '2vh' }}>Audience Members: {getAudienceNames().join(', ')}</div>

      <Card.Group style={{ margin: '4vh' }}> {pullRequestCards} </Card.Group>

      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={loadRepoOptions}
        defaultOptions
        value={selectedRepos}
        placeholder={'Select Repos To Search...'}
        onChange={(values: any, action: any) => {
          const repos = values.map((value: any) => value.value);
          dispatch(setRepos({ repos }));
        }}
      />
      <SearchBox
        styles={{ root: { borderRadius: '4px', marginTop: '2vh' } }}
        placeholder="Search"
        onSearch={(value) => searchCallback(value)}
        onChange={(e) => setSearchText(e?.target.value || '')}
      />
      <DefaultButton
        style={{ borderRadius: '4px', margin: '1vh' }}
        onClick={() => searchCallback(searchText)}
      >
        {'Search'}
      </DefaultButton>
      <SearchResults results={searchResults} addToBoard={createCard} />

      <hr />
    </div>
  );
};
