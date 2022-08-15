import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from '@app/features/dashboard/wrapper.component';

const routes: Routes = [{
  path: '',
  component: WrapperComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
    }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
