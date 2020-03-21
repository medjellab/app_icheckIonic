import { Component, OnInit } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { StatsService } from 'src/admin/services';
import { Observable } from 'rxjs';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    stats$: Observable<any[]>;

    bennes: any;
    citernes: any;
    plateaus: any;

    lineChartData: any[];
    lineChartType: string = 'line';
    lineChartLabels;

    countbenneBlock: number;
    countbenneNotBlock: number;

    countciternesBlock: number;
    countciternesNotBlock: number;

    countplateausBlock: number;
    countplateausNotBlock: number;
    controledEngin: number;

    lineChartOpt: ChartOptions = {
        legend: { display: true, labels: { fontColor: 'black'} },
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        //stepSize: 1,
                        min: 0
                    }
                }
            ]
        }
    };

    lineChartColor: Color[] = [
        {
            borderColor: 'Red',
            backgroundColor: 'rgba(0, 110, 130, 0.2)',
        },
    ];



    constructor(private statsService: StatsService) { }

    ngOnInit() {
        this.getStats();
        this.getLineChart();
    }


    getStats() {
        this.statsService.getStats().subscribe(res => {
            console.log('Stats: ', res);
            //Benne
            this.bennes = res["bennes"];
            this.countbenneBlock = res["bennes"].map(x => x.blockedCount).reduce((o, i) => o + i);
            this.countbenneNotBlock = res["bennes"].map(x => x.notBlockedCount).reduce((o, i) => o + i);
            // console.log('NotBlockedBenne : ', this.countbenneNotBlock);
            //citerne
            this.citernes = res["citernes"];
            // console.log('Citerne count :', res["citernes"].map(x => x.blockedCount).reduce((o, i) => o + i))
            this.countciternesBlock = res["citernes"].map(x => x.blockedCount).reduce((o, i) => o + i);
            this.countciternesNotBlock = res["citernes"].map(x => x.notBlockedCount).reduce((o, i) => o + i);
            //Plateau
            this.plateaus = res["plateaus"];
            this.countplateausBlock = res["plateaus"].map(x => x.blockedCount).reduce((o, i) => o + i);
            this.countplateausNotBlock = res["plateaus"].map(x => x.notBlockedCount).reduce((o, i) => o + i);
            // console.log('This Bennes: ', this.bennes);
            this.controledEngin = (this.countbenneBlock + this.countbenneNotBlock) +
                (this.countciternesBlock + this.countciternesNotBlock) +
                (this.countplateausBlock + this.countplateausNotBlock)
        });
    }

    getLineChart() {
        this.statsService.getStatsBySite('Oujda').subscribe((res: any) => {
            if (res.stats) {
                this.lineChartData = [{ data: this.getChartData(res.stats), label: 'Camions Non Conforme' }];
                this.lineChartLabels = this.getChartLabels(res.stats);
            }
        });
    }









    getChartData(stats) {
        let data = [];
        stats.forEach(element => {
            data.push(element.count);
        });
        return data;
    }

    getChartLabels(stats) {
        let labels = [];
        stats.forEach(element => {
            labels.push(element.label);
        });

        return labels;
    }
}