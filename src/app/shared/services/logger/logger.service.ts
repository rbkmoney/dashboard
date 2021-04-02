import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
    log(text: string): void {
        // eslint-disable-next-line no-console
        console.log(text);
    }

    warn(text: string): void {
        console.warn(text);
    }

    error(err: string | Error): void {
        console.error(err);
    }
}
