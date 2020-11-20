import { exec } from 'child_process';
import * as path from 'path';

const ROOT_DIR = path.join(__dirname, '..');

export function execWithLog(cmd: string) {
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
