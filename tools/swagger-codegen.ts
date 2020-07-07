import { exec } from 'child_process';
import * as del from 'del';
import * as path from 'path';

import * as config from '../swagger-codegen-config.json';

const ROOT_DIR = path.join(__dirname, '..');

function execWithLog(cmd: string) {
    return new Promise((res, rej) =>
        exec(
            cmd,
            {
                cwd: ROOT_DIR,
            },
            (error, stdout, stderr) => {
                if (error === null) {
                    console.log(stderr);
                    res(stdout);
                } else {
                    console.error(error);
                    console.error(stderr);
                    rej(error);
                }
            }
        )
    );
}

async function swaggerCodegenAngular(cliPath: string, inputPath: string, outputDirPath: string) {
    await del([outputDirPath]);
    console.log(`${outputDirPath} deleted`);
    const cmd = `java -jar ${cliPath} generate -l typescript-angular --additional-properties ngVersion=7 -i ${inputPath} -o ${outputDirPath}`;
    console.log(`> ${cmd}`);
    return execWithLog(cmd);
}

async function swaggerCodegenAngularCli({
    name,
    codegenPath,
    swags,
    outputDir,
}: {
    name: string;
    codegenPath: string;
    swags: { [name: string]: string };
    outputDir: string;
}) {
    const log = (text: string) => console.log(`[${name}]: ${text}`);
    log('generate...');
    await Promise.all(
        Object.entries(swags).map(([swagName, swagPath]) =>
            swaggerCodegenAngular(codegenPath, swagPath, path.join(config.outputRootDir, swagName, outputDir))
        )
    );
    log('generated');
}

(async () => {
    const { outputDir } = config;
    try {
        await Promise.all([
            swaggerCodegenAngularCli({
                name: 'Swagger Codegen 3',
                codegenPath: path.join(config.rootDir, config.cli3),
                swags: config.schemes3,
                outputDir,
            }),
            swaggerCodegenAngularCli({
                name: 'Swagger Codegen 2',
                codegenPath: path.join(config.rootDir, config.cli),
                swags: config.schemes,
                outputDir,
            }),
        ]);
    } catch (e) {
        console.error(e);
        console.error('Not generated');
    }
})();
