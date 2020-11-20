import * as del from 'del';
import * as path from 'path';

import * as config from '../swagger-codegen-config.json';
import { execWithLog } from './exec-with-log';

type Schemes = { [name: string]: string };

async function swaggerCodegenAngularCli({ schemes, outputDir }: { schemes: Schemes; outputDir: string }) {
    const log = (text: string) => console.log(`[Swagger Codegen 2]: ${text}`);
    log('generate...');
    await Promise.all(
        Object.entries(schemes).map(async ([specName, specPath]) => {
            const cliPath = path.join(config.rootDir, config.cli);
            const inputPath = specPath;
            const outputDirPath = path.join(config.outputRootDir, specName, outputDir);

            await del([outputDirPath]);
            log(`${outputDirPath} deleted`);
            const cmd = `java -jar ${cliPath} generate -l typescript-angular --additional-properties ngVersion=7 -i ${inputPath} -o ${outputDirPath}`;
            log(`> ${cmd}`);
            return execWithLog(cmd);
        })
    );
    log('Successfully generated 😀');
}

(async () => {
    const { outputDir } = config;
    try {
        await swaggerCodegenAngularCli({
            schemes: config.schemes,
            outputDir,
        });
    } catch (e) {
        console.error(e);
        throw new Error('Not generated 😞');
    }
})();
