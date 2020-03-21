import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Icons } from '../../../shared/icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from 'src/core/handlers/form-error-state-matcher';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // @Input() user;
  @Output() connect = new EventEmitter();

  loginForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  message = '';

  img_Holcim = Icons.img_Holcim;
  iCheckLogo = Icons.iCheckLogo;
  userIcon = Icons.userIcon;
  passwordIcon = Icons.passwordIcon;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() { 
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    // console.log('Input: ', this.user);
  }

  onLogin() {
    this.router.navigate(['home']);
  }

  connectClicked(form) {
    if(!form.valid) {
      return;
    }

    const user: any = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };

    this.connect.emit(user);
  }
}