import { NgModule } from '@angular/core';

import { LocaleDictionaryService } from './locale-dictionary.service';
import { LanguageModule } from '../language/language.module';

@NgModule({
    imports: [LanguageModule],
    providers: [LocaleDictionaryService]
})
export class LocaleDictionaryModule {}
