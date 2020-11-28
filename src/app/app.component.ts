import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TG-WebApp';
  selected: boolean;

  constructor(
    private router: Router
  ){
    this.selected = false;
  }
  setSelect(valor: boolean): void{
    this.selected = false;
    this.router.navigate(['/']);
  }
}
