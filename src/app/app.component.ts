import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TG-WebApp';
  cliente: boolean;
  seleccionado: boolean;

  constructor(){
    this.seleccionado = false;
  }
  setView(valor: boolean): void{
    this.seleccionado = true;
    this.cliente = valor;
  }
  setSeleccion(valor:boolean): void{
    this.seleccionado = false;
  }
}
