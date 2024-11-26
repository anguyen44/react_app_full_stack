# Setup

## Tool

### Git

[install git](https://git-scm.com/downloads)

> type on any bash `git --version` to check if well installed

### Node

[Download last LTS node version](https://nodejs.org/en/download)

> type on any bash `node -v` to check if well installed

### IDE

[Download VScode](https://code.visualstudio.com)

> default setting on folder .vscode

# Run the app

type on bash `npm i` one time
and `npm start` to run the app

# Usefull links

[Associate backend](https://gitlab.adaje.oi.enedis.fr/SOLSEC/the-doors/doors-api)

[SonarQube server](https://sonarqube.adaje.oi.enedis.fr)

[Jira](https://gojira.enedis.fr/secure/RapidBoard.jspa?rapidView=5756&useStoredSettings=true)

[Confluence](https://goconfluence.enedis.fr/display/DOR/The+DOORS%27+home)

# Folder tree

```
├───.vscode                 # VScode default settings for the project
├───ci                      # script for the gitlab continuous integration
├───coverage                # test unit output folder
├───public                  # static assets
└───src
    ├───images
    ├───shared              # common utils for app
    │   ├───components
    │   ├───config
    │   ├───guards
    │   ├───hooks
    │   ├───model
    │   ├───services
    │   ├───store
    │   └───utils
    ├───styles
    └───views               # specific utils for app
```

# Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm sonar`

scan your source file to send to sonarQube server

# Technical stack

### routing

[react-router-dom](https://github.com/remix-run/react-router)

### store

[react-redux](https://github.com/reduxjs/react-redux)
[@reduxjs/toolkit](https://github.com/reduxjs/redux-toolkit)
[redux-oidc](https://github.com/maxmantz/redux-oidc)
[redux-saga](https://github.com/redux-saga/redux-saga/tree/main)
