import { createContext } from 'react';
import { GithubModel } from '../../gitHubModel';

export const GithubModelContext = createContext<GithubModel>({} as GithubModel);
