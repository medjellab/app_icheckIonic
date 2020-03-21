import { Component, OnInit } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VehiculeService } from 'src/admin/services';
import { MatDialog } from '@angular/material';
import { UserEditComponent, VehiculeEditComponent } from 'src/admin/components';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-vehicule',
    templateUrl: './vehicule.component.html',
    styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {

    vehicules$: Observable<any[]>

    constructor(private vehiculeService: VehiculeService,
        private dialog: MatDialog,
        private router: Router) { }

    ngOnInit() {
        this.vehicules$ = this.vehiculeService.getVehicules();
    }

    addVehicule() {
        this.router.navigate(['admin', { outlets: { admin: 'vehicule/new' } }]);
    }

    editVehicule(vehicule) {
        /*let close = () => {
            dialogRef.close();
        };*/

        console.log('Edit: ', vehicule);
        let dialogRef = this.dialog.open(VehiculeEditComponent, {
            data: { vehicule: vehicule },
            disableClose: true,
            autoFocus: true,
            width: '80%'
        });
        let instance = dialogRef.componentInstance;

        instance.engins.subscribe(res => {
            instance.selected = vehicule.idEngin;
        });

        instance.edit.subscribe(async vehicule => { 
            console.log('Edit Clicked: ', vehicule);
            /*this.vehiculeService.updateVehicule(vehicule).subscribe(res => {
            });*/
            dialogRef.close();
        });

        instance.close.subscribe(_ => dialogRef.close());
        dialogRef.afterClosed().subscribe(closed => {
            console.log('Closed: ', closed);
            this.vehicules$ = this.vehiculeService.getVehicules();
            console.log('Closed 1: ', this.vehicules$);
        });

    }
}