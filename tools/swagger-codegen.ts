import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import * as config from '../swagger-codegen-config.json';

const ROOT_DIR = path.join(__dirname, '..');

function deleteFolderRecursive(deletedDir: string) {
    if (fs.existsSync(deletedDir)) {
        fs.readdirSync(deletedDir).forEach((file) => {
            const currentPath = path.join(deletedDir, file);
            fs.lstatSync(currentPath).isDirectory() ? deleteFolderRecursive(currentPath) : fs.unlinkSync(currentPath);
        });
        fs.rmdirSync(deletedDir);
    }
}

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

function swaggerCodegenAngular(cliPath: string, inputPath: string, outputDirPath: string) {
    deleteFolderRecursive(outputDirPath);
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
})();
