import { Component, OnInit } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    sidebarImg = Icons.sidebarImg;
    iCheckLogo = Icons.iCheckLogo;
    conducteurIcon = Icons.conducteurIcon;
    enginIcon = Icons.enginIcon;
    syntheseIcon = Icons.syntheseIcon;
    logoutIcon = Icons.logoutIcon;
    statsIcon = Icons.statsIcon;
    dashboardIcon = Icons.dashboardIcon;
    adminIcon = Icons.adminIcon;
    sideimage = Icons.sideimage;


    constructor(private router: Router) { }

    ngOnInit() {

        const match = this.router.url.substring(this.router.url.length - 1, 14);
        console.log('Matched URL: ', match);
        $(`#${match}`).toggleClass('active');
    }

    openSubmenu() {
        console.log('Submenu');
        // console.log('Enter submenu');
        $('#nav .nav-link').next('ul').toggle();

    }

    navigateTo(url: string) {
        const match = this.router.url.substring(this.router.url.length - 1, 14);
        console.log('Navigate To Matched Url: ', match);
        this.router.navigate(['admin', { outlets: { admin: [url] } }]);
        console.log('URl: ', url);
        switch (match) {
            case 'vehicule/new': {
                $(`#vehicule`).toggleClass('active');
                $(`#${url}`).toggleClass('active');
            }; break;
            case 'user/new': {
                $(`#user`).toggleClass('active');
                $(`#${url}`).toggleClass('active');
            }; break;
            case 'user': {
                $(`#${match}`).toggleClass('active');
                $(`#${url}`).toggleClass('active');
            }; break;
            case 'synthese': {
                $(`#${match}`).toggleClass('active');
                $(`#${url}`).toggleClass('active');
            }; break;
            case 'history': {
                $(`#${match}`).toggleClass('active');
                $(`#${url}`).toggleClass('active');
            }; break;
            case 'vehicule': {
                $(`#${match}`).toggleClass('active');
                $(`#${url}`).toggleClass('active');
            }; break;
        }
       
        // $(`#${match}`).toggleClass('active');
        console.log('ID: ', $(`#${url}`));
    }

}