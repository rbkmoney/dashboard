import * as del from 'del';
import * as path from 'path';

import * as config from '../swagger-codegen-config.json';
import { createLog } from './utils/create-log';
import { execWithLog } from './utils/exec-with-log';

type Schemes = { [name: string]: string };

async function swaggerCodegenAngularCli({
    schemes,
    outputDir,
    outputRootDir,
    cliPath,
}: {
    schemes: Schemes;
    outputDir: string;
    outputRootDir: string;
    cliPath: string;
}) {
    const swaggerLog = createLog('Swagger 2 Codegen');
    swaggerLog('Generate...');
    await Promise.all(
        Object.entries(schemes).map(async ([specName, specPath]) => {
            const inputPath = specPath;
            const outputDirPath = path.join(outputRootDir, specName, outputDir);

            await del([outputDirPath]);
            swaggerLog(`${outputDirPath} deleted`);

            const cmd = `java -jar ${cliPath} generate -l typescript-angular --additional-properties ngVersion=7 -i ${inputPath} -o ${outputDirPath}`;
            swaggerLog(`> ${cmd}`);
            return execWithLog(cmd);
        })
    );
    swaggerLog('Successfully generated 😀');
}

(async () => {
    const cliPath = path.join(config.rootDir, config.cli);
    await swaggerCodegenAngularCli({ ...config, cliPath });
})();
