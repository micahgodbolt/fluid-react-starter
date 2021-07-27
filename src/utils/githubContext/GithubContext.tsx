import React from 'react';
import { GithubModelContext } from './context';
import { GithubModel } from '../../gitHubModel';

export const GithubContext: React.FC = ({ children }) => {
  const model = new GithubModel();

  // Force typing on data because we know the shape
  return <GithubModelContext.Provider value={model}>{children}</GithubModelContext.Provider>;
};
