const rules = require('@rbkmoney/eslint-plugin/lib/rules');

const baseTsRules = {
    parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
    },
    extends: [
        'plugin:@rbkmoney/typescript',
        'plugin:@rbkmoney/angular',
        'plugin:@rbkmoney/lodash',
        'plugin:@rbkmoney/prettier',
    ],
    rules: {
        ...rules.createImportOrderRule({ internalPathsPattern: '@dsh/**' }),
        // TODO: pretenders for error
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
    },
};

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['**/openapi-codegen/**/*.ts', '**/swagger-codegen/**/*.ts'],
    overrides: [
        {
            ...baseTsRules,
            files: ['*.ts'],
            rules: {
                ...baseTsRules.rules,
                ...rules.createAngularSelectorRules({ prefix: 'dsh' }),
                // TODO: pretenders for error
                '@typescript-eslint/no-floating-promises': 'warn',
            },
        },
        {
            ...baseTsRules,
            files: ['*.spec.ts'],
            extends: [...baseTsRules.extends, 'plugin:@rbkmoney/jasmine'],
        },
        {
            files: ['*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {
                // TODO: pretenders for error
                '@angular-eslint/template/no-negated-async': 'warn',
            },
        },
    ],
};
