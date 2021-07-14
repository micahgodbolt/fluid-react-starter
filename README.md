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
- Modifying the initialObjects
- Updating default data
- Adding getters and setters to the model
- Modifying the store (initialValue, reducer, queries, actions)
  - creating new queries
  - creating new actions
- using queries and actions in the view

### Modifying the default data
This repo was created after being asked "how do I create a Fluid app that is more complex than Hello World?" We want to be able to answer this question, but to do so we need to make a few assumptions:

This is a starter repo for complex a Fluid appliation that makes the following assumptions:

### Creating actions
1. You want to use React for your Fluid Application
2. You want to keep clear separation between your model and view
3. You want a light state management framework to remove the boilerplate needed to store, access and modify React app state

In the readme below we'll walk you through how to do the following:

### Model
- Modify the `initialObjects` to include additional DDSes
- Update the `defaultData` of those DDSes
- Update the `model` to access and modify your Fluid data

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
