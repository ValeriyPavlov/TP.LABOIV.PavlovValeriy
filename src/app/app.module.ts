import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { ChatComponent } from './components/chat/chat.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    AboutUsComponent,
    NavBarComponent,
    MayorMenorComponent,
    AhorcadoComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularToastifyModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
