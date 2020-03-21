import { Component, OnInit } from "@angular/core";
import { Icons } from 'src/shared';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService, RoleService, SiteService } from 'src/admin/services';
import { MatDialog } from '@angular/material';
import { UserEditComponent } from 'src/admin/components';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    users$: Observable<any[]>

    constructor(private userService: UserService,
        private roleService: RoleService,
        private siteService: SiteService,
        private dialog: MatDialog,
        private router: Router) { }

    ngOnInit() {
        this.users$ = this.userService.getUsers();
    }

    addUser() {
        this.router.navigate(['admin', { outlets: { admin: 'user/new' } }]);
    }

    editUser(user) {
        /*let close = () => {
            dialogRef.close();
        };*/

        console.log('Edit: ', user);
        let dialogRef = this.dialog.open(UserEditComponent, {
            data: { user: user },
            disableClose: true,
            autoFocus: true,
            width: '80%'
        });
        let instance = dialogRef.componentInstance;

        instance.roles = this.roleService.getRoles();
        instance.roles.subscribe((role: any[]) => {
            instance.selectedRoleID = role.find(r => r['libelle'] != null && r['libelle'].toLowerCase() === user.role.toLowerCase()).id;
        });

        instance.sites = this.siteService.getSites();
        instance.sites.subscribe((site: any[]) => {
            instance.selectedSiteID = site.find(s => s['libelle'] != null && s['libelle'].toLowerCase() === user.site.toLowerCase()).id;
        });

        instance.edit.subscribe(async user => { 
            console.log('Edit Clicked: ', user);
            this.userService.updateUser(user).subscribe(res => {
            });
            dialogRef.close();
        });

        instance.close.subscribe(_ => dialogRef.close());
        dialogRef.afterClosed().subscribe(closed => {
            console.log('Closed: ', closed);
            this.users$ = this.userService.getUsers();
            console.log('Closed 1: ', this.users$);
        });
    }
}