import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Icons } from 'src/shared/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-history-details',
    templateUrl: 'history-details.component.html',
    styleUrls: ['./history-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryDetailsComponent implements OnInit {
    @Input() history: Observable<any[]>;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    displayedColumns: string[] = ['site', 'date', 'conducteur', 'vehicule', 'engin', 'etat', 'action', 'details'];
    dataSource = new MatTableDataSource();
    dateEntree = new FormControl(moment());
    dateSortie = new FormControl(moment());

    lhmIcon = Icons.lhmIcon;
    data = [];
    site: string = '';
    oldDataSource;
    de; ds;

    constructor(private toastCtrl: ToastController,
        private cd: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // console.log('History: ', this.history);
        this.history.subscribe(data => {
            console.log('Input: ', data);
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.cd.markForCheck();
        });
    }

    ngAfterViewInit() {
        this.de = moment(this.dateEntree.value).format('YYYY-MM-DD') + 'T00:00:00';
        this.ds = moment(this.dateSortie.value).format('YYYY-MM-DD') + 'T00:00:00';
    }

    showDetails(element) {
        this.router.navigateByUrl(`/admin/(admin:synthese/${element.idCheckListRef}`);
        console.log('Element: ', element);
        console.log(this.activatedRoute)
    }

    onChange(term, event) {
        // console.log('Date: ', term.value);
        if (event === 'dateEntree') {
            this.de = this.validateDate(term);
            console.log('De: ', new Date(this.de) + ' ' + this.de);
        } else if (event === 'dateSortie') {
            this.ds = this.validateDate(term);
            console.log('Ds: ', new Date(this.ds) + ' ' + this.ds);
        }
    }

    validateDate(date) {
        let result = `${date.value._i.year}`;
        const validateMonth = `${date.value._i.month}`;
        const validateDay = `${date.value._i.date}`;
        console.log('Month: ', validateMonth + ', Day: ' + validateDay);
        const time = 'T00:00:00';
        if (Number(validateMonth) < 9 && Number(validateDay) < 10) {
            result += `-0${Number(validateMonth) + 1}-0${validateDay}${time}`;
        } else {
            if (Number(validateMonth) >= 9) {
                result += `-${Number(validateMonth) + 1}`;
            } else {
                result += `-0${Number(validateMonth) + 1}`;
            }

            if (Number(validateDay) >= 10) {
                result += `-${validateDay}${time}`;
            } else {
                result += `-0${validateDay}${time}`;
            }
        }
        return result;
    }



    filtrer() {
        console.log('DataSource: ', this.dataSource.data);
        if (this.de && this.ds) {
            if (this.de > this.ds) {
                console.log(this.de);
                alert('La date d\'entree doit être supérieure à la date de sortie');
            } else {
                const filter = this.data.filter(x => x.date >= this.de && x.date <= this.ds);
                this.dataSource.data = filter;
            }
        }
    }

    refresh() {
        this.dataSource.data = this.oldDataSource;
    }

    blocked(element, operation) {
        // console.log('Element Blocked: ', element);
        const data = {
            id: element.id,
            idCheckListRef: element.idCheckListRef,
            rating: element.rating,
            date: element.date,
            idConducteur: element.idConducteur,
            idVehicule: element.idVehicule,
            idSite: element.idSite,
            etat: operation === 'lock' ? true : false
        };
        const lockMsg = 'Veuillez décliner ce vehicule ?';
        const unlockMsg = 'Veuillez autoriser ce vehicule ?';
        const msg = operation === 'lock' ? lockMsg : unlockMsg;
        if (confirm(msg)) {
            // this.checkListRefService.updateCheckList(data.id, data).subscribe(res => {
            //     console.log('Update Checklist ref', res);
            // });
            // console.log(`Element: , operation: ${operation}`, element);
            element.etat = operation === 'lock' ? true : false
        }

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async toastPresent(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}