import * as Sentry from '@sentry/angular';
import { CaptureConsole } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

import { isNil } from '@dsh/utils';

import { environment } from '../environments';

export const initSentry = (dsn: string) => {
    if (environment.production && !isNil(dsn)) {
        Sentry.init({
            dsn,
            integrations: [
                new Integrations.BrowserTracing({
                    routingInstrumentation: Sentry.routingInstrumentation,
                }),
                new CaptureConsole({
                    levels: ['error'],
                }),
            ],

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            tracesSampleRate: 1.0,
        });
    }
};
