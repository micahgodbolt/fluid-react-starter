import { useContext } from 'react';
import { ModelContext } from '../context/context';
import { GithubModelContext } from '../githubContext/context';

// Used by FluidContext, useDispatch and useSelector
export const useModel = () => useContext(ModelContext);

export const useGithubModel = () => useContext(GithubModelContext);