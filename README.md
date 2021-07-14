# fluid-react-starter

## Introduction to Repo

### Overview

This repo is aimed towards providing a starting example for developers that includes a Fluid data model, a React view, and a set of actions and queries that provide a separation-of-concerns between view and data in the application.

###  Starting the Application

#### Running Against Tinylicious Locally

To start:

```bash
npm i
npx tinylicious
// open new terminal tab
npm start
```

#### Running Against FRS Instance


## Editing the Application Code

### File Structure

Provide guidance on what files the developer will be editing vs. what is provided as utils for them

### Changing the model

`containerConfig` is located in `src/model/config.ts` and enables adding/modifying the `initialObjects` which can include DDSes or DataObjects.

### Modifying the default data

`defaultData` is located in `src/model/config.ts` and is procesesed by `initDefaultData` in `src/model/FluidModel` to populate data on initial load.

### Creating actions

Actions are written in `src/hooks/useDispatch`. We are using a dispatch pattern to avoid passing down callbacks into components and having a single entry point for all actions better supporting telemetry and other middleware.

Start by adding your action's name to the `action` object. The function parameters will be any data need to perform the action. This data should be strongly typed. 

```tsx
const actions = {
 doThing: (id: string, someData: SomeData) => ...
}
```

The return of the action will be an object that includes a `type` key that matches the function name, and additional payloaded required to perform the action. This return is not typed as it'll be passed to our dispatch function.

```tsx
const actions = {
  doThing: (id: string, someData: SomeData) => {
    return {
      type: "doThing",
      id,
      someData,
    }
  }
}
```

#### Defining what our action does

Now that our action has a payload, we define how we are going to modify our model for that action. Add a `case` to our `dispatch` function that matches the `type` you wrote above, and write a function to process the action props. You'll have access to the `model` from context.

```tsx
  case "doThing":
    (model, action) => doThing(model, action);
    break;
```

#### Using your action

Now that your action is defined and exported, you can use it in your view

```tsx
import { useDispatch } from "../../hooks";
const MyView = (props) => {
  const { dispatch, actions: { doThing } } = useDispatch();
  const onClick = () => dispatch(doThing());
};
```

### Creating Queries

Queries are written in `src/hooks/useQueries`.

Queries are properties returned by `useQueries` that return stateful data to the view, so that any time the data is modified (either by yourself, or another user) the view re-renders with the new data.

To do this we leverage the `useSelector` hook that takes in two functions as props. The first function is the selected data that you want to store. It'll have access to the model, as well as the event triggering the query. The return of that selector will be stored in that state and returned to the user of the query.

The second method will define when that query should be updated. It also takes in the model as a prop and returns an array of tuples where the first item in the tuple is the DDS or Data object to watch, and the second item is the event to listen for.

```tsx
export const useQueries = () => {
  return {
    useNodeData: (id?: string) =>
      useSelector(
        (model, ev) => { return getDataFromDDS(model.myDDS) },
        (model) => [[model.myDDS, "valueChanged"]]
      ),
  };
};
```

### Editing the Container Schema

## Deploying the Application


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
