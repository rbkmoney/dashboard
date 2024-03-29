import * as del from 'del';
import * as path from 'path';

import * as config from '../openapi-codegen-config.json';
import { createLog } from './utils/create-log';
import { execWithLog } from './utils/exec-with-log';

type Schemes = { [name: string]: string };

async function openAPICodegenAngular({
    schemes,
    outputDir,
    outputRootDir,
}: {
    schemes: Schemes;
    outputDir: string;
    outputRootDir: string;
}) {
    const openApiLog = createLog('OpenAPI Codegen');
    openApiLog('Generate...');
    await Promise.all(
        Object.entries(schemes).map(async ([specName, specPath]) => {
            const inputPath = specPath;
            const outputDirPath = path.join(outputRootDir, specName, outputDir);

            await del([outputDirPath]);
            openApiLog(`${outputDirPath} deleted`);

            const cmd = `openapi-generator-cli generate\
            -i ${inputPath}\
            -g typescript-angular\
            -o ${outputDirPath}\
            --additional-properties=fileNaming=kebab-case`;
            openApiLog(`> ${cmd}`);
            return execWithLog(cmd);
        })
    );
    openApiLog('Successfully generated 😀');
}

(async () => {
    await openAPICodegenAngular(config);
})();
