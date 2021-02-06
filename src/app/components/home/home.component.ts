import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../services/api-user.service';
import { DataUser } from '../../interface/data-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataUser:DataUser;

  constructor(private apiUserService: ApiUserService) { }

  ngOnInit(): void {
    console.log("dd");
    this.apiUserService.getDataUser().subscribe(response => {
      this.dataUser = response;
      console.log(this.dataUser);
    });
  }


}
