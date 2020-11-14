import {AfterViewInit, Component, OnInit, ViewChild, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Specialist } from '../../models/specialist';
import { Session } from '../../models/session';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.css']
})
export class SpecialistsComponent implements OnInit, AfterViewInit {
  @ViewChild('specialistForm', { static: false })
  specialistForm: NgForm;
  sessionData: Specialist;
  clientDataSource = new MatTableDataSource();
  sessionDataSource = new MatTableDataSource();
  menuOption = 0;
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpDataService: HttpDataService, public dialog: MatDialog) {
    this.sessionData = {} as Specialist;
  }

  ngOnInit(): void {
    this.menuOption = 0;
    this.clientDataSource.data = [
      {
        "id": 1,
        "name": "Maria",
        "lastname": "Lopez",
        "description": "Felicidad"
      },
      {
        "id": 2,
        "name": "Diego",
        "lastname": "Pereira",
        "description": "Felicidad"
      },
      {
        "id": 3,
        "name": "Maria",
        "lastname": "Lopez",
        "description": "Felicidad"
      }
    ];

    this.sessionDataSource.data = [
      {
        "id": 1,
        "title": "Compartir en campos",
        "startDate": new  Date(2020, 12, 16, 19, 30, 0),
        "description": "cing wafer cheesecake pudding lollipop soufflé candy canes. Carrot cake macaroon sugar plum lollipop marzipan tart. Fruitcake jelly beans jujubes cotton candy. Dessert lemon drops sweet lollipop."
      },
      {
        "id": 2,
        "title": "Comprar en cupcakes",
        "startDate": new  Date(2020, 14, 10, 18, 30, 0),
        "description": "cing wafer cheesecake pudding lollipop soufflé candy canes. Carrot cake macaroon sugar plum lollipop marzipan tart. Fruitcake jelly beans jujubes cotton candy. Dessert lemon drops sweet lollipop."
      },
      {
        "id": 3,
        "title": "Comprar en tortas",
        "startDate": new Date(),
        "description": "cing wafer cheesecake pudding lollipop soufflé candy canes. Carrot cake macaroon sugar plum lollipop marzipan tart. Fruitcake jelly beans jujubes cotton candy. Dessert lemon drops sweet lollipop."
      }
    ];
    this.sessionDataSource.data = this.sessionDataSource.data.sort((a: Session, b: Session) => b.startDate - a.startDate);
  }
  ngAfterViewInit(): void {
    this.clientDataSource.paginator = this.paginator;
  }

  menuInteraction(option: number): void {
    this.menuOption = option;
  }
  getCustomersBySpecialistList(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      console.log(response);
      this.clientDataSource.data = response.content;
    });
  }
  openForm(id: number, name: string): void {
    this.dialog.open(RutinaComponent, {
      data: {
        clientName: name,
        clientId: id,
        specialistId: 1
      }
    });
  }

}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

class Rutina {
  specialistId: number;
  clientId: number;
  description: string;
}

@Component({
  selector: 'app-rutina-form',
  templateUrl: './rutinaForm.component.html',
})
export class RutinaComponent implements OnInit{
  @ViewChild('rutinaForm', { static: false })
  rutinaForm: NgForm;
  clientId: number;
  specialistId: number;
  clientName: string;
  userData:{
    rutinas: Array<Rutina>;
  };
  rutinaData: Rutina;
  rutinas: Array<Rutina>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.rutinaData = {} as Rutina;
    this.clientId = data.clientId;
    this.clientName = data.clientName;
    this.specialistId = data.specialistId;
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem(JSON.stringify(this.clientId))) || {rutinas: []};
    this.rutinas = this.userData.rutinas;
    console.log(this.userData, this.rutinas);
  }

  onSubmit(): void {
    if (this.rutinaForm.form.valid) {
      this.addRutina();
      this.rutinaForm.reset();
    } else {
      console.log('Invalid Data');
    }
  }

  addRutina(): void{
    this.rutinaData.clientId = this.clientId;
    this.rutinaData.specialistId = this.specialistId;
    this.rutinas.push(_.cloneDeep(this.rutinaData));
    this.userData.rutinas = this.rutinas;
    localStorage.setItem(JSON.stringify(this.clientId), JSON.stringify(this.userData));
    console.log('Rutina Agregada', this.rutinaData);
  }

  deleteRutina(index: number): void{
    this.rutinas.splice(index, 1);
    this.userData.rutinas = this.rutinas;

    localStorage.setItem(JSON.stringify(this.clientId), JSON.stringify(this.userData));
    console.log('Rutina Borrada', this.rutinaData);
  }
}

