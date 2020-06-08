import * as Sentry from '@sentry/browser';

import * as sentryConfig from '../../sentryConfig.json';

Sentry.init({
    dsn: sentryConfig.dsn,
    // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
    // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
    // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
    integrations: [
        new Sentry.Integrations.TryCatch({
            XMLHttpRequest: false,
        }),
    ],
});
