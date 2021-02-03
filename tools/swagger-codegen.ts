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
            // angular 10 requires change "ModuleWithProviders" with "ModuleWithProviders<ApiModule>"
            // swagger-codegen has a fix in v2.4.17 but it breaks our backward compatibility
            const postSwagger = `sed -i \'s/ModuleWithProviders {/ModuleWithProviders<ApiModule> {/\' ${outputDirPath}/api.module.ts\n`;
            swaggerLog(`> ${cmd}`);
            return execWithLog(cmd).then(() => execWithLog(postSwagger));
        })
    );
    swaggerLog('Successfully generated 😀');
}

(async () => {
    await swaggerCodegenAngularCli(config);
})();
