Thanks for contributing to the [BAO.finance](https://bao.finance) project!

We're looking forward to all the issues and pull requests! The more the merrier! It's a sign of a healthy and active community. We're in this for the long run and the more people we can get involved the better.

To ensure that we can continue to work optimally, we've put together a few guidelines. If for some reason you are unable to meet these guidelines, that's ok! Submit your Issue/PR anyway! It may take a bit longer to get resolved, but your feedback is important!

# Bug Reports
- Please ensure that the bug is reproduceable
- List steps to reproduce so that we can replicate the issue and validate that we are fixing it. 

Please note that all of this will be re-displayed when you try and open a new issue. Please take some time to read through the template before you submit your bug.

# Pull Requests
- Install the appropriate [editorconfig](https://editorconfig.org/) plugin for your IDE. 
## Contributing some code!
The base of the project was done with [React](https://reactjs.org), and forked from the [SushiSwap UI](https://github.com/sushiswap/sushiswap-classic) project. After we forked, we cut all ties back to the previous repo as are simply using this as a project base and will be diverging from the root project enough that none of the code will be contributable back.

### Development Guidelines

#### Requirements
1. [Node.js](https://nodejs.org/en/) @ version 14.x.x (LTS)

OR

1. Install [nvm](https://github.com/nvm-sh/nvm) and install the most recent 14.x.x version


2. Install yarn (globally `npm install -g yarn` or part of the project `npm install yarn`). If you do NOT use the global installation, you have to add `npx ` before each command to execute the project specific version of yarn.

#### Development Server
After cloning the project you can run
```
yarn install 
yarn start
```
To install all development dependencies of the project and start the development react server. This will compile the TSX/JSX files into a JS bundle and ensure that you have hot-reloading for any code changes. 

The development server will start by default on port 3004, but that can be changed based on your preferences.

#### Linting
Before your PR can be reviewed by a human, you have to pass the code standards. We utilize eslint and a few other plugins to automate this process. 

To autofix your code to match our standards you can run
```
yarn lint-fix
```

This should be able to fix MOST errors, and will also be able to tell you what errors/warnings it was unable to fix. 

You can run just the linting process by running

```
yarn lint
```

This will automatically be run as part of the CI pipeline when you open a PR. The PR can not be merged until all these have been sorted out.