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
  clientDataSource: any = new MatTableDataSource();
  sessionDataSource = new MatTableDataSource();
  menuOption = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpDataService: HttpDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.menuOption = 0;
    this.clientDataSource.data = [
      {
        id: 1,
        name: 'Paula',
        lastname: 'Perez',
        description: 'Roll over and sun my belly i like to spend my days sleeping and eating fishes that my human fished for me we live on a luxurious yacht, sailing proudly under the sun, i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk. Sleep on keyboard ignore the squirrels, you\'ll never catch them anyway so twitch tail in permanent irritation. With tail in the air friends are not food the dog smells bad.'
      },
      {
        id: 2,
        name: 'Dana',
        lastname: 'Millares',
        description: 'Playing with balls of wool love blinks and purr purr purr purr yawn or ptracy get scared by doggo also cucumerro . I cry and cry and cry unless you pet me, and then maybe i cry just for fun run as fast as i can into another room for no reason yet plays league of legends, yet lie on your belly and purr when you are asleep for mrow. Curl into a furry donut human is behind a closed door, emergency! abandoned! meeooowwww!!!'
      },
      {
        id: 3,
        name: 'Francisco',
        lastname: 'Mendez',
        description: 'Swipe at owner\'s legs favor packaging over toy yet give attitude if it fits i sits cats woo or gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don\'t want it anymore meow bye sweet beast. Meow meow, i tell my human i want to go outside let me go outside nevermind inside is better.'
      }
    ];

    this.getSessionsSpecialistList();
    this.sessionDataSource.data = this.sessionDataSource.data.sort((a: Session, b: Session) => b.date - a.date);
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
  getSessionsSpecialistList(): void {
    this.httpDataService.getSessionsBySpecialist(1).subscribe((response: any) => {
      console.log(response.content);
      this.sessionDataSource.data = response.content;
      this.sessionDataSource.data.map((e: Session) => e.date = new Date(e.date));
    });
  }

  createForm(id: number, name: string): void {
    this.dialog.open(RutinaDigComponent, {
      data: {
        clientName: name,
        clientId: id,
        specialistId: 1
      }
    });
  }

  editSession(id: number, index: number): void {
    // @ts-ignore
    this.dialog.open(SessionDigComponent, {
      data: {
        title:  this.sessionDataSource.data[index]['title'],
        description: this.sessionDataSource.data[index]['description'],
        date: new Date(),
        specialistId: 1,
        sessionId: id,
        type: 0
      }
    });
  }
  createSession(): void{
    this.dialog.open(SessionDigComponent, {
      data: {
        title: '',
        description: '',
        date: new Date(),
        specialistId: 1,
        sessionId: -1,
        type: 1,
      }
    });
  }
  deleteSession(id: number): void{
    this.dialog.open(SessionDigComponent, {
      data: {
        title: '',
        description: '',
        date: new Date(),
        specialistId: 1,
        sessionId: id,
        type: 2
      }
    });
  }
}

export interface RutinaDialogData {
  clientName: string;
  clientId: number;
  specialistId: number;
}

class Rutina {
  specialistId: number;
  clientId: number;
  description: string;
}

@Component({
  selector: 'app-diag-rutina',
  templateUrl: './rutina.component.html',
})
export class RutinaDigComponent implements OnInit{
  @ViewChild('rutinaForm', { static: false })
  rutinaForm: NgForm;
  clientId: number;
  specialistId: number;
  clientName: string;
  userData: {
    rutinas: Array<Rutina>;
  };
  rutinaData: Rutina;
  rutinas: Array<Rutina>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RutinaDialogData) {
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
  }

  deleteRutina(index: number): void{
    this.rutinas.splice(index, 1);
    this.userData.rutinas = this.rutinas;

    localStorage.setItem(JSON.stringify(this.clientId), JSON.stringify(this.userData));
  }
}

export interface SessionDialogData {
  title: string;
  description: string;
  date: Date;
  specialistId: number;
  sessionId: number;
  type: number;
}

@Component({
  selector: 'app-diag-session',
  templateUrl: './session.component.html',
})
export class SessionDigComponent implements OnInit{
  @ViewChild('sessionForm', { static: false })
  sessionForm: NgForm;
  sessionData: Session;
  sessionId: number;
  sessions: Array<Session>;
  create: boolean;
  delete: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: SessionDialogData, private httpDataService: HttpDataService) {
    console.log(data);
    this.sessionData = {
      title: data.title,
      description: data.description,
      date: new Date()
    };
    this.sessionId = data.sessionId;
    this.create = data.sessionId === -1;
    this.delete = data.type === 2;
  }

  ngOnInit(): void {
    this.delete = this.delete;
  }

  onSubmit(): void {
    if (this.sessionForm.form.valid) {
      if (this.create){
        this.addSession();
      }
      else{
        this.editSession();
      }
      this.sessionForm.reset();
    } else {
      console.log('Invalid Data');
    }
  }

  addSession(): void {
    console.log(this.sessionData.date);
    const newSession = { title: this.sessionData.title, description: this.sessionData.description, date: this.sessionData.date};
    this.httpDataService.createSession(newSession, 1).subscribe((response: any) => {
      console.log(response.content);
    });
  }
  editSession(): void {
    console.log(this.sessionData.date, "Umde");
    const editSession = { title: this.sessionData.title, description: this.sessionData.description, date: new Date()};
    this.httpDataService.editSession(editSession, 1, this.sessionId)
      .subscribe((response: any) => {
      console.log(response.content);
    });
  }
  deleteSession(): void{
    this.httpDataService.deleteSession(1, this.sessionId)
      .subscribe((response: any) => {});
  }
}
