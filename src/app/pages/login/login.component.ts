import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
import {FormGroup, FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('sessionForm', { static: false })

  loginForm: NgForm;
  loginData: {
    user: string;
    password: string;
  };

  submit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginData);
    }
  }
}
