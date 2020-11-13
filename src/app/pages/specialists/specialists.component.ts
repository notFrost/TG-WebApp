import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Specialist } from '../../models/specialist';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from '../../services/http-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.css']
})
export class SpecialistsComponent implements OnInit, AfterViewInit {
  @ViewChild('specialistForm', { static: false })
  specialistForm: NgForm;
  specialistData: Specialist;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpDataService: HttpDataService) {
    this.specialistData = {} as Specialist;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllSpecialists();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllSpecialists(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
}
