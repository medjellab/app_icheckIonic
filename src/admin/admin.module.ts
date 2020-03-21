import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
// import { VehiculeRoutingModule } from './modules/vehicule/vehicule-routing.module';
// import { UserRoutingModule } from './modules/user/user-routing.module';
import { MaterialModule } from 'src/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { UserEditComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  entryComponents: [UserEditComponent],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FontAwesomeModule,
    ChartsModule
    // VehiculeRoutingModule,
    // UserRoutingModule
  ],
  providers: [...fromServices.services],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class AdminModule { }
