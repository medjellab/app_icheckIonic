import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  }/*, {
    path: 'admin', 
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
