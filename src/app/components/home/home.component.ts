import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiUserService } from '../../services/api-user.service';
import { DataUser } from '../../interface/data-user';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit{
  dataUser: DataUser[] = [];
  dataSource ;

  constructor(private apiUserService: ApiUserService) { }

  displayedColumns: string[] = ['publicationType', 'termType', "reportGroup",
    'reportState', 'reportFormat', 'outputDate.date', 'outputNumber'];

  

  @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit(): void {    
    this.apiUserService.getDataUser().subscribe(response => {     
       this.dataSource = new MatTableDataSource<DataUser>(response);
       this.dataSource.paginator = this.paginator;  
    });
  }

}