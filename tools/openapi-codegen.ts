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
    for (const [specName, specPath] of Object.entries(schemes)) {
        const inputPath = specPath;
        const outputDirPath = path.join(outputRootDir, specName, outputDir);

        await del([outputDirPath]);
        openApiLog(`${outputDirPath} deleted`);

        const cmd = `npx @openapitools/openapi-generator-cli generate -i ${inputPath} -g typescript-angular -o ${outputDirPath}`;
        openApiLog(`> ${cmd}`);
        return execWithLog(cmd);
    }
    openApiLog('Successfully generated 😀');
}

(async () => {
    await openAPICodegenAngular(config);
})();
