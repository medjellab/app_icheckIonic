import { HistoryDetailsComponent } from './history-details/history-details.component';
import { SyntheseDetailsComponent } from './synthese-details/synthese-details.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { VehiculeEditComponent } from './vehicule/vehicule-edit/vehicule-edit.component';
import { VehiculeListComponent } from './vehicule/vehicule-list/vehicule-list.component';
import { VehiculeAddComponent } from './vehicule/vehicule-add/vehicule-add.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';


// export const components: any[] = [HistoryDetailsComponent, SyntheseDetailsComponent, UserListComponent, UserAddComponent, UserEditComponent];
export const components: any[] = [
    DashboardStatsComponent,
    HistoryDetailsComponent,
    SyntheseDetailsComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    VehiculeAddComponent,
    VehiculeEditComponent,
    VehiculeListComponent
];

// export const userComponents: any[] = fromUser.components;

export * from './dashboard-stats/dashboard-stats.component';
export * from './history-details/history-details.component';
export * from './synthese-details/synthese-details.component';
export * from './user/user-add/user-add.component';
export * from './user/user-edit/user-edit.component';
export * from './user/user-list/user-list.component';
export * from './vehicule/vehicule-edit/vehicule-edit.component';
export * from './vehicule/vehicule-list/vehicule-list.component';
export * from './vehicule/vehicule-add/vehicule-add.component';

// export * from './user';