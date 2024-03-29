# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application with Docker

1. npm run build
2. Запустите докер
3. docker-compose build
4. docker-compose up
5. docker exec server npm run migration:generate ./src/migrations/migrations
6. docker exec server npm run migration:run 
7. docker exec server rm -rf /app/src/migrations

# npm run test:auth

## Docker scan

1. npm run dockerScan:app": "docker scan nodejs2022q2-service_node",
2. npm run dockerScan:db": "docker scan nodejs2022q2-service_postgres"


## Running local application

```
npm start
```

After starting the app on port (3000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:3000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
