import { Component, OnInit, ViewChild } from "@angular/core";
import { SyntheseService } from '../../services';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-synthese',
    templateUrl: 'synthese.component.html',
    styleUrls: ['./synthese.component.scss']
})
export class SyntheseComponent implements OnInit {

    /*@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    displayedColumns: string[] = ['site', 'date', 'conducteur', 'vehicule', 'engin', 'etat', 'action', 'details'];
    dataSource = new MatTableDataSource();
    dateEntree = new FormControl(moment());
    dateSortie = new FormControl(moment());*/

    synthese$: Observable<any[]>;

    constructor(private syntheseService: SyntheseService) { }

    ngOnInit() {
        this.synthese$ = this.syntheseService.getSyntheses();
        this.syntheseService.getSyntheses().subscribe(synthese => {
            console.log('Synthese: ', synthese);
        });
    }
}