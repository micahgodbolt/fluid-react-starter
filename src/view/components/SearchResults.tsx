import { DefaultButton, DetailsList, IColumn, mergeStyleSets, SelectionMode } from '@fluentui/react';
import React from 'react';
import { PullRequest } from '../../gitHubModel';

interface SearchResultProps {
  results: PullRequest[];
  addToBoard: (pr: PullRequest) => void;
}

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
});

export const SearchResults = (props: SearchResultProps) => {
  const columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Avatar',
      className: classNames.fileIconCell,
      iconClassName: classNames.fileIconHeaderIcon,
      iconName: 'Contact',
      isIconOnly: true,
      fieldName: 'name',
      minWidth: 16,
      maxWidth: 16,
      onRender: (item: PullRequest) => (
        <img src={item.authorAvatarUrl} className={classNames.fileIconImg} alt={'Author Avatar'} />
      ),
    },
    {
      key: 'column2',
      name: 'Name',
      fieldName: 'title',
      minWidth: 210,
      maxWidth: 350,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: 'string',
      isPadded: true,
      onRender: (item: PullRequest) => <a href={item.url}>{item.title}</a>,
    },
    {
      key: 'column3',
      name: 'Date Created',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      data: 'string',
      onRender: (item: PullRequest) => {
        return <span>{new Date(item.createdAt).toLocaleDateString()}</span>;
      },
      isPadded: true,
    },
    {
      key: 'column4',
      name: 'Author Username',
      fieldName: 'authorLogin',
      minWidth: 210,
      maxWidth: 350,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: 'string',
      isPadded: true,
    },
    {
      key: 'column5',
      name: 'Actions',
      fieldName: 'authorLogin',
      minWidth: 210,
      maxWidth: 350,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: 'string',
      isPadded: true,
      onRender: (item: PullRequest) => {
        return <DefaultButton text={'Add to Board'} onClick={() => props.addToBoard(item)} />;
      },
    },
  ];
  return <DetailsList items={props.results} columns={columns} selectionMode={SelectionMode.none} />;
};
