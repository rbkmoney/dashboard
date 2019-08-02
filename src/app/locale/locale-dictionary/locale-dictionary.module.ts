import { NgModule } from '@angular/core';

import { LocaleDictionaryService } from './locale-dictionary.service';
import { LangugeModule } from '../../languge/language.module';

@NgModule({
    imports: [LangugeModule],
    providers: [LocaleDictionaryService]
})
export class LocaleDictionaryModule {}
