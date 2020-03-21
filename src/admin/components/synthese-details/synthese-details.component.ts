import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Icons } from 'src/shared/icons';

@Component({
    selector: 'app-synthese-details',
    templateUrl: 'synthese-details.component.html',
    styleUrls: ['./synthese-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyntheseDetailsComponent implements OnInit {
    @Input() synthese: Observable<any[]>;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    // displayedColumns: string[] = ['id', 'vehicule', 'dateBlockage', 'motif', 'dateDeblockage'];
    displayedColumnsBenne: string[] = ['controlleur', 'site', 'matricule', 'type', 'conducteur', 'motif',
      'date','image', 'control1', 'control2', 'control3'
      , 'control4', 'control5', 'control6', 'control7', 'control8', 'control9', 'control10'];
    dataSource = new MatTableDataSource();
  
    dateEntree = new FormControl(moment());
    dateSortie = new FormControl(moment());
    lhmIcon = Icons.lhmIcon;
    noImage = Icons.noImage;

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() {
        // console.log('History: ', this.history);
        this.synthese.subscribe(data => {
            console.log('Input: ', data);
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.cd.markForCheck();
        });
    }
}