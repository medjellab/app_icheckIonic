import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, Inject, Output, EventEmitter } from "@angular/core";
import { Icons, serverImg } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-vehicule-list',
    templateUrl: './vehicule-list.component.html',
    styleUrls: ['./vehicule-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiculeListComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    @Input() vehicules: Observable<any[]>;
    @Output() add = new EventEmitter();
    @Output() edit = new EventEmitter();
    displayedColumns: string[] = ['camion', 'matricule', 'date', 'image', 'action'];
    dataSource: MatTableDataSource<any>;
    faEdit = faEdit;

    lhmIcon = Icons.lhmIcon;

    constructor() { }

    ngOnInit() {
        this.vehicules.subscribe(res => {
            console.log('Vehicules: ', res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        });
    }

    editVehicule(element) {
        this.edit.emit(element);
        // this.cd.markForCheck();
        this.edit.subscribe(list => {
            console.log('List: ', list);
        });
    }

    addVehicule() {
        this.add.emit();
    }

    createImagePath(serverPath: string) {
        return `${serverImg}${serverPath}`;
        // return `http://localhost:4772/${serverPath}`;
    }
}