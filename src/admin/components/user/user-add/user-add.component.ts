import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddComponent implements OnInit {

    userForm: FormGroup;

    lhmIcon = Icons.lhmIcon;
    
    roles;
    sites;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private toastCtrl: ToastController) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            nomComplet: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            idRole: ['', Validators.required],
            idSite: ['', Validators.required],
            // societe:['',Validators.required]
        });
    }





    navigateTo() {
        this.router.navigate(['admin', { outlets: { admin: ['user'] } }]);
    }

    async toastAlert(msg) {
        const toast = await this.toastCtrl.create({
            message: `${msg}`,
            duration: 2000,
            color: 'success'
        });

        toast.present();
    }
}