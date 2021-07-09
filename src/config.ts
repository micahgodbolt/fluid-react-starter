import { SharedMap } from "@fluid-experimental/fluid-framework";
import {
  FrsConnectionConfig,
  InsecureTokenProvider,
} from "@fluid-experimental/frs-client";
import { generateUser } from "@fluidframework/server-services-client";

export const containerConfig = {
  name: "cra-demo-container",
  initialObjects: {
    myMap: SharedMap,
  },
};

export const FILEPATH = "fluid";

export const serviceConfig = {};

export const defaultData: any[] = [
  {
    id: "1",
    value: 1,
  },
  {
    id: "2",
    value: 2,
  },
];

export const useFrs: boolean = process.env.REACT_APP_USE_FRS !== undefined;

export const user = generateUser();

export const connectionConfig: FrsConnectionConfig = useFrs
  ? {
      tenantId: "",
      tokenProvider: new InsecureTokenProvider(
        "",
        user
      ),
      orderer: "",
      storage: "",
    }
  : {
      tenantId: "local",
      tokenProvider: new InsecureTokenProvider("fooBar", user),
      orderer: "http://localhost:7070",
      storage: "http://localhost:7070",
    };
