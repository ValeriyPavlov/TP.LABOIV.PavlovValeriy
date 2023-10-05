import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private dataService: DataService){};

  public user: string = '';
  public mostrarChat: boolean = true;

  
  public async logOut()
  {
    if(this.user != '')
    {
      this.user = '';
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit()
  {
    this.user = this.dataService.userName;
    if(this.user == '')
    {
      this.router.navigateByUrl("/login");
    }
  }
}
