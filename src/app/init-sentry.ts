import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import isNil from 'lodash-es/isNil';

export const initSentry = (dsn: string) => {
    if (isNil(dsn)) {
        return null;
    }
    Sentry.init({
        dsn,
        integrations: [
            new Integrations.BrowserTracing({
                routingInstrumentation: Sentry.routingInstrumentation,
            }),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        tracesSampleRate: 0.1,
        autoSessionTracking: true,
        environment: 'production',
    });
};
