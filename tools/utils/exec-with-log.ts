import { exec } from 'child_process';

export function execWithLog(cmd: string) {
    return new Promise((res, rej) =>
        exec(
            cmd,
            {
                cwd: process.cwd(),
            },
            (error, stdout, stderr) => {
                if (error === null) {
                    // tslint:disable-next-line:no-console
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
