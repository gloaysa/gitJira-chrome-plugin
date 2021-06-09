# ![Logo](src/assets/images/icon-50.png) GitJira Chrome Extension

Display GitLab's MR info from its Jira Ticket

## Project Structure

- src: Source files and app main file
  - ./components: React Components
  - ./pages: available pages to display
  - ./assets: static files
  - ./models: available interfaces
  - ./services: app services
  - ./utils: different functions and tools
- dist: Chrome Extension directory

## Setup

```
npm install
```

## Build

```
npm run build
```

## Build in watch mode

```
npm run watch
```

## Load extension to chrome

Load newly created `plugin` directory

## Test

`npx jest` or `npm run test`
