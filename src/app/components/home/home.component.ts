import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiUserService } from '../../services/api-user.service';
import { DataUser } from '../../interface/data-user';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {
  dataSource;
  dataUser: DataUser[] = [];
  uniquePublicationType: DataUser[] = [];
  uniqueTermType: DataUser[] = [];
  uniqueReportGroup: DataUser[] = [];
  uniqueReportState: DataUser[] = [];
  uniqueReportFormat: DataUser[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private apiUserService: ApiUserService) { }

  displayedColumns: string[] = ['publicationType', 'termType', "reportGroup",
    'reportState', 'reportFormat', 'outputDate.date', 'outputNumber', 'idSubject'];

  toppings = new FormControl();


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.apiUserService.getDataUser().subscribe(response => {
      this.dataSource = new MatTableDataSource<DataUser>(response);
      this.uniquePublicationType = Array.from(new Set(response.map(item => item.publicationType)));
      this.uniqueTermType = Array.from(new Set(response.map(item => item.termType)));
      this.uniqueReportGroup = Array.from(new Set(response.map(item => item.reportGroup)));
      this.uniqueReportState = Array.from(new Set(response.map(item => item.reportState)));
      this.uniqueReportFormat = Array.from(new Set(response.map(item => item.reportFormat)));
      this.dataSource.paginator = this.paginator;
    });
  }

  onDeleteDataId(idSubject: number) {
    this.apiUserService.deleteDataUser(idSubject);
  }

}