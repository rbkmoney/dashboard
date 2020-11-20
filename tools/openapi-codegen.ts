import * as del from 'del';
import * as path from 'path';

import * as config from '../openapi-codegen-config.json';
import { execWithLog } from './exec-with-log';

type Schemes = { [name: string]: string };

async function openAPICodegenAngular({ schemes, outputDir }: { schemes: Schemes; outputDir: string }) {
    const log = (text: string) => console.log(`['OpenAPI Codegen']: ${text}`);
    log('Generate...');
    await Promise.all(
        Object.entries(schemes).map(async ([specName, specPath]) => {
            const inputPath = specPath;
            const outputDirPath = path.join(config.outputRootDir, specName, outputDir);

            await del([outputDirPath]);
            log(`${outputDirPath} deleted`);
            const cmd = `npx @openapitools/openapi-generator-cli generate -i ${inputPath} -g typescript-angular -o ${outputDirPath}`;
            log(`> ${cmd}`);
            return execWithLog(cmd);
        })
    );
    log('Successfully generated 😀');
}

(async () => {
    const { outputDir } = config;
    try {
        await openAPICodegenAngular({
            schemes: config.schemes,
            outputDir,
        });
    } catch (e) {
        console.error(e);
        throw new Error('Not generated 😞');
    }
})();
