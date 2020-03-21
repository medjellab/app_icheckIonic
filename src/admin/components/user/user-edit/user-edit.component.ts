import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Inject, Output, EventEmitter } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {

    editFormUser: FormGroup;
    @Input() roles: Observable<any[]>;
    @Input() sites: Observable<any[]>;
    @Output() close = new EventEmitter();
    @Output() edit = new EventEmitter();
    selectedRoleID = -1;
    selectedSiteID = -1;

    constructor(private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<UserEditComponent>) { }

    ngOnInit() {
        console.log('Edit Data Dialog: ', this.data);
        this.editFormUser = this.formBuilder.group({
            id: ['', Validators.required],
            nomComplet: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            idRole: ['', Validators.required],
            idSite: ['', Validators.required],
            // societe:['',Validators.required]
        });
        this.initializeFormData();
    }

    initializeFormData() {
        this.editFormUser.controls['id'].patchValue(this.data.user.id);
        this.editFormUser.controls['nomComplet'].patchValue(this.data.user.nomComplet);
        this.editFormUser.controls['userName'].patchValue(this.data.user.username);
        this.editFormUser.controls['password'].patchValue(this.data.user.password);
        this.editFormUser.controls['idRole'].patchValue(this.data.user.role);
        this.editFormUser.controls['idSite'].patchValue(this.data.user.site);
    }

    closeDialog() {
        this.close.emit();
    }

    editUser(form) {
        if(!form.valid) {
            return;
        }

        this.edit.emit(form.value);
    }

}