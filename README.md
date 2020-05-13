# Dashboard

## Libraries

-   [Angular CLI](https://github.com/angular/angular-cli)
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)
-   [PDFMake](https://pdfmake.github.io/docs/)

## Dependency

-   Java

## Initialization

```sh
# Init submodules
git submodule init
git submodule update

# Generate Angular modules from swags
npm run codegen

# Install packages
npm ci
```

## Development server

-   API (Production API default)

    -   With mocks:

        Change `./src/appConfig.json` API endpoints

1. Start

    - Real Keycloak: `npm start`

    - Stub Keycloak

        1. Change `./src/authConfig.json` / `"auth-server-url"`:

        1. `npm run stub`

1. Navigate to `http://localhost:8000/`

## Production build

1. Run `npm run build`
1. The build artifacts will be stored in the `dist/` directory.

## Add API

1.  Add submodule

    ```sh
    git submodule -b <SCHEME_BRANCH> add <SCHEME_REPO> schemes/<SCHEME_NAME>/<VER:VX>
    ```

1.  Add `schemes/<SCHEME_NAME>/<VER:VX>` to `Makefile` `SWAGGER_SCHEMES_PATH` property
1.  Add `"<SCHEME_NAME>": "schemes/<SCHEME_NAME>/<VER:VX>"` to `swagger-codegen-config.json` `schemes`/`schemes3` property
1.  [Generate Angular modules from swags](#Generate-Angular-modules-from-swags)
1.  Add `"<SCHEME_NAME>Endpoint": "<URL>"` to `src/assets/appConfig.json` `api` property
1.  Add in `src/api-codegen/<SCHEME_NAME>` files:
    -   `index.ts`
    -   `<SCHEME_NAME>.module.ts`
    -   `<SCHEME_NAME>-config.service.ts`
1.  Add `<SCHEME_NAME>.module.ts` to `src/app/api/api.module.ts` `imports`
1.  Create `src/api/<SCHEME_NAME>` module

## Tests

-   Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
-   Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Utils

### Analyze bundle size

```sh
npm run build -- --prod --stats-json --extraWebpackConfig webpack.extra.js
npx webpack-bundle-analyzer dist/stats.json
```

## Guides

-   [Using typography](https://material.angular.io/guide/typography)
-   [Theming your components](https://material.angular.io/guide/theming-your-components)
