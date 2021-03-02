import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiUserService } from '../../services/api-user.service';
import { DataUser } from '../../interface/data-user';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormControl } from '@angular/forms';

export class FilterData {
  reportState: string;
  termType: string;
  publicationType: string;
  reportGroup: string;
  outputNumber: string;
  reportFormat: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements AfterViewInit {
  dataSource;

  uniquePublicationType: DataUser[] = [];
  uniqueTermType: DataUser[] = [];
  uniqueReportGroup: DataUser[] = [];
  uniqueReportState: DataUser[] = [];
  uniqueReportFormat: DataUser[] = [];
  filter: FilterData = new FilterData();


  filterFormGroup;
  termTypeValueFormControl = new FormControl();
  reportGroupValueFormControl = new FormControl();
  publicationTypeValueFormControl = new FormControl();

  reportStateValueFormControl = new FormControl()
  reportFormatValueFormControl = new FormControl()
  outputNumberValueFormControl = new FormControl()
  startDateValueFormControl = new FormControl()
  endDateValueFormControl = new FormControl()

  public filterValues = {
    termType: "",
    reportGroup: "",
    publicationType: "",
    reportState: "",
    reportFormat: "",
    outputNumber: "",
    dateStart: "",
    dateEnd: "",
  };

  constructor(private apiUserService: ApiUserService, private fb: FormBuilder) {
    this.filterFormGroup = this.fb.group({});
  }

  displayedColumns: string[] = ['publicationType', 'termType', "reportGroup",
    'reportState', 'reportFormat', 'outputDate.date', 'outputNumber', 'idSubject'];




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

      this.termTypeValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.termType = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();

      this.publicationTypeValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.publicationType = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();

      this.reportGroupValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.reportGroup = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();


      this.reportStateValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.reportState = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();

      this.reportFormatValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.reportFormat = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();

      this.outputNumberValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.outputNumber = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();

      this.startDateValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.dateStart = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();

      this.endDateValueFormControl.valueChanges.subscribe(nameFilterValue => {
        this.filterValues.dateEnd = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      this.dataSource.filterPredicate = this.tableFilter();
    });
  }


  onDeleteDataId(idSubject: number) {
    this.apiUserService.deleteDataUser(idSubject);
  }


  public tableFilter() {

    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);

      console.log(searchTerms);
      let isPosition_reportGroup = false;
      if (searchTerms.reportGroup.length) {
        for (const d of searchTerms.reportGroup) {
          if (data.reportGroup.trim() === d) {
            isPosition_reportGroup = true;
          }
        }
      } else {
        isPosition_reportGroup = true;
      }

      let isPosition_termType = false;
      if (searchTerms.termType.length) {
        for (const d of searchTerms.termType) {
          if (data.termType.trim() === d) {
            isPosition_termType = true;
          }
        }
      } else {
        isPosition_termType = true;
      }

      let isPosition_publicationType = false;
      if (searchTerms.publicationType.length) {
        for (const d of searchTerms.publicationType) {
          if (data.publicationType.trim() === d) {
            isPosition_publicationType = true;
          }
        }
      } else {
        isPosition_publicationType = true;
      }

      let isPosition_reportState = false;
      if (searchTerms.reportState.length) {
        for (const d of searchTerms.reportState) {
          if (data.reportState.trim() === d) {
            isPosition_reportState = true;
          }
        }
      } else {
        isPosition_reportState = true;
      }

      let isPosition_reportFormat = false;
      if (searchTerms.reportFormat.length) {
        for (const d of searchTerms.reportFormat) {
          if (data.reportFormat.trim() === d) {
            isPosition_reportFormat = true;
          }
        }
      } else {
        isPosition_reportFormat = true;
      }


      return (
        isPosition_reportGroup
        && isPosition_termType
        && isPosition_publicationType
        && isPosition_reportState
        && isPosition_reportFormat
        && data.outputNumber.trim().indexOf(searchTerms.outputNumber) !== -1
        && (data.outputDate.date >= searchTerms.dateStart && data.outputDate.date <= searchTerms.dateEnd)
      );

    };

    return filterFunction;
  }

  // Reset table filters
  resetFilters() {
    this.dataSource.filter = "";
  }
}