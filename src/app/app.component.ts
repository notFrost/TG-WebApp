import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TG-WebApp';
  selected: boolean;

  constructor(){
    this.selected = false;
  }
  setSelect(valor: boolean): void{
    this.selected = false;
  }
}
