import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { exec } from 'child_process';
import * as path from 'path';

import * as config from '../swagger-codegen-config.json';

const SWAGGER_CODEGEN_CLI_FILENAME = 'swagger-codegen-cli.jar';
const ROOT_DIR = path.join(__dirname, '..');
const TMP_DIR = 'tmp';
const SWAGGER_CODEGEN_CLI_PATH = path.join(TMP_DIR, SWAGGER_CODEGEN_CLI_FILENAME);

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

function codegenAngular(cli: string, inputPath: string, outputDir: string) {
    deleteFolderRecursive(outputDir);
    console.log(`${outputDir} deleted`);
    const cmd = `java -jar ${cli} generate -l typescript-angular --additional-properties ngVersion=7 -i ${inputPath} -o ${outputDir}`;
    console.log(`> ${cmd}`);
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

(async () => {
    await loadFile(config.cli, SWAGGER_CODEGEN_CLI_PATH);
    console.log('Swagger Codegen CLI loaded');
    await Promise.all(
        Object.entries(config.schemes).map(([name, swagPath]) =>
            codegenAngular(SWAGGER_CODEGEN_CLI_PATH, swagPath, path.join(config.outputRootDir, name, config.outputDir))
        )
    );
})();
