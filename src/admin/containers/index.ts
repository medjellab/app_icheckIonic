import { HistoryComponent } from './history/history.component';
import { SyntheseComponent } from './synthese/synthese.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const containers: any[] = [
    DashboardComponent,
    HistoryComponent,
    SyntheseComponent,
    MenuComponent,
    UserComponent,
    VehiculeComponent
];

export * from './dashboard/dashboard.component';
export * from './history/history.component';
export * from './synthese/synthese.component';
export * from './menu/menu.component';
export * from './user/user.component';
export * from './vehicule/vehicule.component';
