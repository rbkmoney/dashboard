import { Component } from '@angular/core';

import { QuestionaryService } from './questionary.service';

@Component({
    selector: 'dsh-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss'],
    providers: [QuestionaryService]
})
export class QuestionaryComponent {
    questionary$ = this.questionaryService.questionary$;

    constructor(private questionaryService: QuestionaryService) {
        this.questionary$.subscribe(x => {
            console.log(x);
        });
    }
}
