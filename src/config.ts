import { SharedMap, ISharedMap, FluidContainer } from '@fluid-experimental/fluid-framework';
import { FrsConnectionConfig, InsecureTokenProvider } from '@fluid-experimental/frs-client';
import { generateUser } from '@fluidframework/server-services-client';
import { FrsAzFunctionTokenProvider } from './utils/FrsAzFunctionTokenProvider';

////
// Container and App setup
////

export const containerConfig = {
  name: 'cra-demo-container',
  initialObjects: {
    myMap: SharedMap,
  },
};

// changes URL path to your fluid pages
// "fluid" yields a `/fluid/123` file path
export const FILEPATH = 'fluid';

// Additional service configuration
export const serviceConfig = {};

// Setup default data on initialObjects
export const setDefaultData = (fluidContainer: FluidContainer) => {
  const defaultData: any[] = [
    {
      id: '1',
      value: 1,
    },
    {
      id: '2',
      value: 2,
    },
  ];
  const map = fluidContainer.initialObjects.myMap as ISharedMap;
  for (const data of defaultData) {
    map.set(data.id, { value: data.value });
  }
};

////
// Connection Config
////

export const useFrs: boolean = process.env.REACT_APP_USE_FRS !== undefined;

export const user = generateUser();

export const connectionConfig: FrsConnectionConfig = useFrs
  ? {
      tenantId: 'YOUR-TENANT-ID-HERE',
      tokenProvider: new FrsAzFunctionTokenProvider('YOUR-AZURE-FUNCTION-URL-HERE', {
        userId: user.id,
        userName: (user as any).name,
      }),
      orderer: 'YOUR-ORDERER-URL-HERE',
      storage: 'YOUR-STORAGE-URL-HERE',
    }
  : {
      tenantId: 'local',
      tokenProvider: new InsecureTokenProvider('fooBar', user),
      orderer: 'http://localhost:7070',
      storage: 'http://localhost:7070',
    };
