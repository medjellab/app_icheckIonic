import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent, SyntheseComponent, MenuComponent, UserComponent, VehiculeComponent } from './containers';
import { UserAddComponent, VehiculeAddComponent } from './components';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

// import { AuthComponent } from './containers';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'admin',
    component: MenuComponent,
    children: [
      { path: '', component: DashboardComponent, outlet: 'admin' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        outlet: 'admin'
      },
      {
        path: 'synthese',
        component: SyntheseComponent,
        outlet: 'admin'
      },
      {
        path: 'history',
        component: HistoryComponent,
        outlet: 'admin'
      },
      {
        path: 'user',
        component: UserComponent,
        outlet: 'admin'
      },
      {
        path: 'user/new',
        component: UserAddComponent,
        outlet: 'admin'
      },
      {
        path: 'vehicule',
        component: VehiculeComponent,
        outlet: 'admin'
      },
      {
        path: 'vehicule/new',
        component: VehiculeAddComponent,
        outlet: 'admin'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    // pathMatch: 'full'
  },
  /*{
    path: 'synthese',
    component: SyntheseComponent, 
    // outlet: 'admin'
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
