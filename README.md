# Dashboard

## Libraries

-   [Angular CLI](https://github.com/angular/angular-cli)
    -   Run `ng generate component component-name` to generate a new component (you can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`).
    -   To get more help use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)
-   [PDFMake](https://pdfmake.github.io/docs/)

## Initialization

### Install packages

```sh
npm ci
```

### Generate Angular modules from swags

```sh
npm run codegen
```

## Development server

1. Run `npm start`
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
1.  Add `"<SCHEME_NAME>": "schemes/<SCHEME_NAME>/<VER:VX>"` to `swagger-codegen-config.json` `schemes` property
1.  [Generate Angular modules from swags](#Generate-Angular-modules-from-swags)
1.  Add `"<SCHEME_NAME>Endpoint": "<URL>"` to `src/assets/appConfig.json` `api` property
1.  Add in `src/api/<SCHEME_NAME>` files:
    -   `index.ts`
    -   `<SCHEME_NAME>.module.ts`
    -   `<SCHEME_NAME>-config.service.ts`
1.  Add `<SCHEME_NAME>.module.ts` to `src/app/api/api.module.ts` `imports`

## Tests

-   Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
-   Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Utils

### Analyze bundle size

    npm run build -- --prod --stats-json --extraWebpackConfig webpack.extra.js
    npx webpack-bundle-analyzer dist/stats.json

## Guides

-   [Using typography](https://material.angular.io/guide/typography)
-   [Theming your components](https://material.angular.io/guide/theming-your-components)
