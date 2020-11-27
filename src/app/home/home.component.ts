import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  client: boolean;
  selected: boolean;

  constructor(){
    this.selected = false;
  }
  setView(valor: boolean): void{
    this.selected = true;
    this.client = valor;
  }
  setSelected(valor: boolean): void{
    this.selected = false;
  }
}

