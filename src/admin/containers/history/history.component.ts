import { Component, OnInit, ViewChild } from "@angular/core";
import { HistoryService } from '../../services';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    displayedColumns: string[] = ['site', 'date', 'conducteur', 'vehicule', 'engin', 'etat', 'action', 'details'];
    dataSource = new MatTableDataSource();
    dateEntree = new FormControl(moment());
    dateSortie = new FormControl(moment());

    history$: Observable<any[]>;

    constructor(private historyService: HistoryService) { }

    ngOnInit() {
        this.history$ = this.historyService.getHistory();
        this.historyService.getHistory().subscribe(history => {
            console.log('History: ', history);
        });
    }
}