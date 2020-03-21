import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Observable } from 'rxjs';

import { Icons } from 'src/shared/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { serverImg } from 'src/shared';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
    selector: 'app-dashboard-stats',
    templateUrl: 'dashboard-stats.component.html',
    styleUrls: ['./dashboard-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStatsComponent implements OnInit {

    dateStats = new FormControl(moment());

    // @Input() stats: Observable<any[]>;
    @Input() plateaus = [];
    @Input() bennes = [];
    @Input() citernes = [];

    @Input() countbenneBlock: number;
    @Input() countbenneNotBlock: number;
    @Input() countciternesBlock: number;
    @Input() countciternesNotBlock: number;
    @Input() countplateausBlock: number;
    @Input() countplateausNotBlock: number;
    @Input() controledEngin: number;


    @Input() lineChartType: string;
    @Input() lineChartData: any[];
    @Input() lineChartLabels: [];
    @Input() lineChartColor: Color[];
    @Input() lineChartOpt: ChartOptions;


    lhmIcon = Icons.lhmIcon;
    benneIcon = Icons.benneImage;
    plateauIcon = Icons.plateauImage;
    citerneIcon = Icons.citerneImage;


    constructor() { }

    ngOnInit() { }

    createImagePath(serverPath: string) {
        return `${serverImg}${serverPath}`;
        // return `http://localhost:4772/${serverPath}`;
    }
}