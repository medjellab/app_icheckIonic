import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, Output, EventEmitter } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    @Input() users: Observable<any[]>;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @Output() add = new EventEmitter();
    @Output() edit = new EventEmitter();
    displayedColumns: string[] = ['nomcomplet', 'username', 'role', 'site', 'action'];
    dataSource = new MatTableDataSource();
    searchKey: string;
    faEdit = faEdit;

    lhmIcon = Icons.lhmIcon;

    constructor(private cd: ChangeDetectorRef,
        private router: Router) { }

    ngOnInit() {
        this.users.subscribe(res => {
            console.log('users: ', res);
            this.dataSource.data = res;
            this.dataSource.paginator = this.paginator;
            // this.cd.markForCheck();
        });
    }

    editUser(element) {
        this.edit.emit(element);
        // this.cd.markForCheck();
        this.edit.subscribe(list => {
            console.log('List: ', list);
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addUser() {
        this.add.emit();
    }
}