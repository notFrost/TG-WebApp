import { Component } from '@angular/core';
import {UserStorageService} from '../../services/user-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  client: boolean;
  selected: boolean;

  constructor(
    private userStorageService: UserStorageService,
  ){
    this.selected = true
    this.client = this.userStorageService.type === "customer"
  }
  setView(valor: boolean): void{
    this.selected = true;
    this.client = valor;
  }
  setSelected(valor: boolean): void{
    this.selected = false;
  }
}

