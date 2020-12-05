import { Injectable } from '@angular/core';
import uuid from 'uuid';

@Injectable()
export class UuidGeneratorService {
    generateUUID(): string {
        return uuid();
    }
}
