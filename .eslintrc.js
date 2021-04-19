module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['import', 'jasmine', 'unused-imports', '@typescript-eslint'],
    ignorePatterns: ['**/openapi-codegen/**/*.ts', '**/swagger-codegen/**/*.ts'],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json', 'e2e/tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:jasmine/recommended',
                'plugin:import/errors',
                'plugin:import/warnings',
                'plugin:import/typescript',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates',
                'prettier',
            ],
            rules: {
                // Angular
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        prefix: 'dsh',
                        style: 'camelCase',
                    },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: 'dsh',
                        style: 'kebab-case',
                    },
                ],

                // Tests rules
                'jasmine/new-line-before-expect': 'off',

                // Naming conversation
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'typeLike',
                        format: ['PascalCase'],
                        leadingUnderscore: 'allow',
                    },
                    {
                        selector: 'enumMember',
                        format: ['StrictPascalCase'],
                    },
                ],

                // Imports/exports rules
                'import/no-unresolved': 'off',
                'import/namespace': 'off',
                'import/order': [
                    'error',
                    {
                        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index'], 'object'],
                        pathGroups: [
                            {
                                pattern: '@dsh/**',
                                group: 'internal',
                            },
                        ],
                        pathGroupsExcludedImportTypes: ['builtin'],
                        'newlines-between': 'always',
                        alphabetize: {
                            order: 'asc',
                            caseInsensitive: true,
                        },
                    },
                ],
                'no-restricted-imports': [
                    'error',
                    {
                        paths: ['rxjs/Rx', 'rxjs/internal', 'lodash', 'lodash-es', '.'],
                        patterns: ['src/*'],
                    },
                ],

                // Class (TODO: make more strict)
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: ['field', 'method'],
                    },
                ],

                // No unused vars
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-unused-expressions': 'error',
                'unused-imports/no-unused-imports': 'error',
                'unused-imports/no-unused-vars': [
                    'error',
                    { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
                ],

                // Console
                'no-console': ['error', { allow: ['warn', 'error'] }],

                // Types
                '@typescript-eslint/no-inferrable-types': 'off',

                // TODO: pretenders for error
                '@typescript-eslint/no-floating-promises': 'warn',
                '@typescript-eslint/no-unsafe-call': 'warn',
                '@typescript-eslint/no-unsafe-member-access': 'warn',
                '@typescript-eslint/no-unsafe-assignment': 'warn',
                '@typescript-eslint/no-unsafe-return': 'warn',
                '@typescript-eslint/no-misused-promises': 'warn',
                '@typescript-eslint/unbound-method': 'warn',
                '@typescript-eslint/restrict-plus-operands': 'warn',
                '@typescript-eslint/restrict-template-expressions': 'warn',
            },
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
