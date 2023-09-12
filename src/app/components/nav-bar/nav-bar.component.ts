import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private router: Router, private route: ActivatedRoute){
    this.route.url.subscribe(url => {

      const {path} = url[0];

      if(path == "login")
      {
        this.btnLabel = "Quien Soy";
      }
      else
      {
        this.btnLabel = "Volver";
      }
    });
  };

  public btnLabel:string = "";


  public btnClick()
  {
    if (this.btnLabel == "Quien Soy")
    {
      this.router.navigateByUrl("/about-us");
      this.btnLabel = "Volver";
    }
    else
    {
      this.btnLabel = "Volver";
      this.router.navigateByUrl("/login");
    }
  }
}
