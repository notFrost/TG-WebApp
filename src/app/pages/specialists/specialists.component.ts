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
        "name": "Paula",
        "lastname": "Perez",
        "description": "Roll over and sun my belly i like to spend my days sleeping and eating fishes that my human fished for me we live on a luxurious yacht, sailing proudly under the sun, i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk. Sleep on keyboard ignore the squirrels, you'll never catch them anyway so twitch tail in permanent irritation. With tail in the air friends are not food the dog smells bad. "
      },
      {
        "id": 2,
        "name": "Dana",
        "lastname": "Millares",
        "description": "Playing with balls of wool love blinks and purr purr purr purr yawn or ptracy get scared by doggo also cucumerro . I cry and cry and cry unless you pet me, and then maybe i cry just for fun run as fast as i can into another room for no reason yet plays league of legends, yet lie on your belly and purr when you are asleep for mrow. Curl into a furry donut human is behind a closed door, emergency! abandoned! meeooowwww!!!"
      },
      {
        "id": 3,
        "name": "Francisco",
        "lastname": "Mendez",
        "description": "Swipe at owner's legs favor packaging over toy yet give attitude if it fits i sits cats woo or gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye sweet beast. Meow meow, i tell my human i want to go outside let me go outside nevermind inside is better. "
      }
    ];

    this.sessionDataSource.data = [
      {
        "id": 1,
        "title": "Levantar Pesas sin problema",
        "startDate": new  Date(2020, 12, 16, 19, 30, 0),
        "description": "cing wafer cheesecake pudding lollipop soufflé candy canes. Carrot cake macaroon sugar plum lollipop marzipan tart. Fruitcake jelly beans jujubes cotton candy. Dessert lemon drops sweet lollipop."
      },
      {
        "id": 2,
        "title": "Crear rutinas efectivas",
        "startDate": new  Date(2020, 14, 10, 18, 30, 0),
        "description": "cing wafer cheesecake pudding lollipop soufflé candy canes. Carrot cake macaroon sugar plum lollipop marzipan tart. Fruitcake jelly beans jujubes cotton candy. Dessert lemon drops sweet lollipop."
      },
      {
        "id": 3,
        "title": "Logra tu meta para este verano",
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
        clienteId: id,
        specialistId: 1
      }
    });
  }

  crearSesion(){
    this.dialog.open(SesionComponent, {
      data: {
        specialistNombre: "Carolina",
      }
    });
  }
}

export interface RutinaDialogData {
  clientName: string;
  clienteId: number;
  specialistId: number;
}

class Rutina {
  specialistId: number;
  clientId: number;
  description: string;
}

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: RutinaDialogData) {
    this.rutinaData = {} as Rutina;
    this.clientId = data.clienteId;
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


export interface SesionDialogData {
  specialistNombre: string;
}

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
})
export class SesionComponent implements OnInit{
  @ViewChild('sesionForm', { static: false })
  sesionForm: NgForm;
  sesionData: Session;
  sesions: Array<Session>;
  crear: boolean;
  specialistNombre: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SesionDialogData) {
    this.sesionData = {} as Session;
    this.specialistNombre = data.specialistNombre;
  }

  ngOnInit(): void {
    this.crear = true;
    this.sesions = JSON.parse(localStorage.getItem(JSON.stringify('sesions'))) || [];
  }

  onSubmit(): void {
    if (this.sesionForm.form.valid) {
      this.addSession();
      this.sesionForm.reset();
    } else {
      console.log('Invalid Data');
    }
  }
  addSession(): void{
    localStorage.setItem('sesions', JSON.stringify({}));
  }
  editarSesion(): void{

  }
  deleteSession(index: number): void{
    localStorage.setItem('sesions', JSON.stringify({}));
  }
}
