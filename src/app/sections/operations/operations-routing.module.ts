import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { OperationsComponent } from './operations.component';

const routes: Routes = [
        {
            path: '',
            component: OperationsComponent,
            children: [
                {
                    path: 'payments',
                    component: PaymentsComponent,
                    outlet: 'op-routing'
                }
            ]
        }
    ]
;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule {
}
