# Dashboard

## Libraries

-   [Angular CLI](https://github.com/angular/angular-cli)
    -   Run `ng generate component component-name` to generate a new component (you can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`).
    -   To get more help use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)

## Initialization

```sh
# Install packages

npm ci

# Generate swagger

make wc_shell
make compile
```

## Development server

1. Run `npm start`
1. Navigate to `http://localhost:8000/`

## Production build

1. Run `npm run build`
1. The build artifacts will be stored in the `dist/` directory.

## Tests

-   Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
-   Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Utils

### Analyze bundle size

    npm run build -- --prod --stats-json --extraWebpackConfig webpack.extra.js
    npx webpack-bundle-analyzer dist/stats.json
