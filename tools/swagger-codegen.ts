import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { exec } from 'child_process';
import * as path from 'path';

import * as config from '../swagger-codegen-config.json';

const ROOT_DIR = path.join(__dirname, '..');
const TMP_DIR = 'tmp';

function loadFile(url: string, filePath: string) {
    return new Promise((res, rej) => {
        const httpx = url.startsWith('https') ? https : http;
        const request = httpx.get(url, response => {
            fs.mkdirSync(path.join(filePath, '..'), { recursive: true });
            const file = fs.createWriteStream(filePath);
            const stream = response.pipe(file);
            stream.on('finish', () => res());
        });
        request.on('error', err => rej(err));
    });
}

function deleteFolderRecursive(deletedDir: string) {
    if (fs.existsSync(deletedDir)) {
        fs.readdirSync(deletedDir).forEach(file => {
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
                cwd: ROOT_DIR
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
    cliPath,
    swags,
    outputDir
}: {
    name: string;
    codegenPath: string;
    cliPath: string;
    swags: { [name: string]: string };
    outputDir: string;
}) {
    const log = (text: string) => console.log(`[${name}]: ${text}`);
    log('loading...');
    await loadFile(cliPath, codegenPath);
    log('loaded');
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
            codegenPath: path.join(TMP_DIR, 'codegen-3'),
            cliPath: config.cli3,
            swags: config.schemes3,
            outputDir
        }),
        swaggerCodegenAngularCli({
            name: 'Swagger Codegen 2',
            codegenPath: path.join(TMP_DIR, 'codegen-2'),
            cliPath: config.cli,
            swags: config.schemes,
            outputDir
        })
    ]);
})();
