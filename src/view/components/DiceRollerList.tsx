import React from 'react';
import { useGetDiceStore, useGetAudienceStore } from '../store';
import {  DefaultButton, SearchBox } from '@fluentui/react';
import { useGithubModel } from '../../utils';
import { PullRequest } from '../../gitHubModel';
import { SearchResults } from './SearchResults';
import { Status, Node } from '../../model';
import { PullRequestCard } from './PullRequestCard';
import { Card } from 'semantic-ui-react';


export const DiceRollerList = () => {
  const {
    dispatch,
    actions: { editDice, createDice, deleteDice },
    queries: { getAllDice},
  } = useGetDiceStore();

  const {
    queries: { getAudienceSize, getAudienceNames },
  } = useGetAudienceStore();

  const { searchPullRequest } = useGithubModel();
  const [ searchText, setSearchText ] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<PullRequest[]>([]);

  const searchCallback = React.useCallback(
    async (query: string | undefined) => {
      if (!query) {
        setSearchResults([]);
      } else {
        const results = await searchPullRequest(query);
        setSearchResults(results);
      }
    },
    [searchPullRequest]
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
    return <PullRequestCard node={node} onUpdateStatus={updateStatus} onDeleteNode={deleteNode}/>
  })

  return (
    <div style={{ textAlign: 'center', margin: "3vh" }}>
      <div>Audience Size: {getAudienceSize()}</div>
      <div>Audience Members: {getAudienceNames().join(', ')}</div>

      <Card.Group style={{margin: "4vh"}}> {pullRequestCards} </Card.Group>
      <SearchBox placeholder="Search" onSearch={(value) => searchCallback(value)} onChange={(e) => setSearchText(e?.target.value || "")} />
      <DefaultButton onClick={() => searchCallback(searchText)}>{"Search"}</DefaultButton>
      <SearchResults results={searchResults} addToBoard={createCard}/>

      <hr />
    </div>
  );
};
