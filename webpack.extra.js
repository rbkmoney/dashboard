const webpack = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ...(process.env.SENTRY_AUTH_TOKEN
            ? [
                  new SentryWebpackPlugin({
                      authToken: process.env.SENTRY_AUTH_TOKEN,
                      org: 'rbkmoney-fd',
                      project: 'dashboard',
                      include: './dist',
                      ignore: ['node_modules', 'webpack.config.js'],
                  }),
              ]
            : []),
    ],
};
