import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute){};

  public btnLabel:string = "Quien Soy";

  ngOnInit(): void {};

  public btnClick()
  {
    this.route.url.subscribe(url => {
      var {path} = url[0];
      if(path == "login")
      {
        this.router.navigateByUrl("/about-us");
        this.btnLabel = "Volver";
      }
      if(path == "about-us")
      {
        this.btnLabel = "Quien Soy";
        this.router.navigateByUrl("/login");
      }
    });
  }
}
