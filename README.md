# fluid-react-starter

## Introduction to Repo

### Overview


This repo is a Fluid starter template that was created to answer the question "how do I create a Fluid app that is more complex than Hello World?" To answer this question this repo makes the following assumptions:

1. You want to use React for your view
2. You want to keep clear separation between your model and view
3. You want a light state management framework to remove the boilerplate needed to store, access and modify React app state

In the readme below we'll walk you through how to do the following:
### Using this repo

- Run the app locally
- Run the app against an FRS instance
- Deploy the app
- Repo structure overview

### Modifying the model

- Modify the schema to include additional DDSes
- Update the `defaultData` of those DDSes
- Update the `model` to access and modify your Fluid data
- Write custom events

### Modifying the view
- Modify the store
  - `initialState`
  - `queries`
  - `actions`
  - `reducer`
- Importing and using the store
  - Using `queries`
  - Dispatching `actions`


## Using this repo


###  Run the app locally

```bash
npm i
npx tinylicious
// open new terminal tab
npm start
```

To run our local server, Tinylicious, on the default values of `localhost:7070`, please enter the following into a terminal window:
```
npx tinylicous
```

Now, with our local service running in the background, we need to connect the application to it. The app has already been configured to this so now we just need to run the following in a new terminal window to start the app.

```bash
npm i
npm run start
```

To see how this is working, please take a look at `config.ts` where you will see the following values specified.

```typescript
export const connectionConfig: FrsConnectionConfig = useFrs
  ? {
      tenantId: '',
      tokenProvider: new InsecureTokenProvider('', user),
      orderer: '',
      storage: '',
    }
  : {
      tenantId: 'local',
      tokenProvider: new InsecureTokenProvider('fooBar', user),
      orderer: 'http://localhost:7070',
      storage: 'http://localhost:7070',
    };
```
When just starting the app with `npm run start`, the `useFrs` value here is false and the second set of values will be used. Here, we see that our orderer and storage URLs that point to the service are directed towards 'http://localhost:7070'. The `user` object being passed into the `InsecureTokenProvider` will identify the current member in the application.

### Run the app against an FRS instance

To run the app against a deployed FRS instance, the first set of `connectionConfig` values in `config.ts` need to be updated as the `useFrs` boolean will now be set to true. The tenant ID, orderer, and storage URLs should match those provided to you as part of the FRS onboarding process. The tenant key should be the first parameter given to the `InsecureTokenProvider`.

NOTE: Please replace this with another implementation of the `ITokenProvider` that will not expose the tenant key in the client code itself.

After filling these values in, please run the following commands in a terminal window:
```
npm i
npm run start:frs
```

### Deploy the app

### Repo structure overview

## Modifing the model

### Modify the schema to include additional DDSes

### Update the `defaultData` of those DDSes

### Update the `model` to access and modify your Fluid data

### Write custom events


## Modifying the view

### Modify the store

### Import and use the store

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
