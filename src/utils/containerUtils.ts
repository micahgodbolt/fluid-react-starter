import {
  FrsClient,
  FrsConnectionConfig,
  InsecureTokenProvider,
} from '@fluid-experimental/frs-client';
import { v4 as uuid } from 'uuid';
import { FrsAzFunctionTokenProvider } from '.';
import { containerConfig, setDefaultData, serviceConfig, FILEPATH, useFrs, azureFunctionUrl, frsTenantId, frsStorageUrl, frsOrdererUrl } from '../config';

export const createFilePath = (id: string) => {
  return `/${FILEPATH}/${id}`;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("githubUser")!)
}

const getFrsClient = () => {
  const githubUser = getUser();
  const user = {
    id: githubUser.id,
    name: githubUser.login,
  };
  const connectionConfig: FrsConnectionConfig = useFrs
    ? {
        tenantId: frsTenantId,
        tokenProvider: new FrsAzFunctionTokenProvider(
          `${azureFunctionUrl}/api/GetFrsToken`,
          user,
        ),
        orderer: frsOrdererUrl,
        storage: frsStorageUrl,
      }
    : {
        tenantId: 'local',
        tokenProvider: new InsecureTokenProvider('fooBar', user),
        orderer: 'http://localhost:7070',
        storage: 'http://localhost:7070',
      };
  return new FrsClient(connectionConfig);
}

export const createFluidFile = async () => {
  const id = uuid();
  const client = getFrsClient();
  const { fluidContainer } = await client.createContainer(
    { ...serviceConfig, id },
    containerConfig
  );
  setDefaultData(fluidContainer);
  return createFilePath(id);
};

export const getFluidContainer = async (id: string) => {
  const client = getFrsClient();
  return await client.getContainer({ ...serviceConfig, id }, containerConfig);
};
