# Using this repo

To start:

```bash
npm i
npx tinylicious
// open new terminal tab
npm start
```

- Modifying the initialObjects
- Updating default data
- Adding getters and setters to the model
- Modifying the store (initialValue, reducer, queries, actions)
  - creating new queries
  - creating new actions
- using queries and actions in the view

## What is in this repo

This repo was created after being asked "how do I create a Fluid app that is more complex than Hello World?" We want to be able to answer this question, but to do so we need to make a few assumptions:

This is a starter repo for complex a Fluid appliation that makes the following assumptions:

1. You want to use React for your Fluid Application
2. You want to keep clear separation between your model and view
3. You want a light state management framework to remove the boilerplate needed to store, access and modify React app state

In the readme below we'll walk you through how to do the following:

### Model
- Modify the `initialObjects` to include additional DDSes
- Update the `defaultData` of those DDSes
- Update the `model` to access and modify your Fluid data

### View Model
- Modify the 




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
