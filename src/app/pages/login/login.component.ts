import { Component, OnInit } from '@angular/core';
import {Login} from '../../models/login.model';
import {SessionUser} from '../../models/session-user.model';
import {Router} from '@angular/router';
import {UserStorageService} from '../../services/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: Login=new Login();
  public invalid:boolean;
  public user = new SessionUser()
  public register:boolean=false;
  public validRegister:boolean=false;

  constructor(
    private userStorageService: UserStorageService,
    private router: Router
  ) { 
    this.register = false;
  }
  ngOnInit():void{

  }
  
  changeTypeOfForm(type: boolean):void {
    this.register = type;
    this.onSubmit();
  }

  onSubmit(): void {
    let self = this;
    
    self.userStorageService.set(self.model);
    self.router.navigate(['/']);
  }
}
