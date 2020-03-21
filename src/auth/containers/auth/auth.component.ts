import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/auth/models/user.model';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  
  users$: Observable<User[]>;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {

  }

  connect(user: User) {
    console.log('Event Emitter: ', user);
    this.authService.getAuth(user).subscribe(res => {
      console.log('Res: ', res);
    });

    // this.router.navigateByUrl('/admin');
  }
}