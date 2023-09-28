import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent {

  public cartaActual = "";
  public puntaje = 0;
  public bandera = false;
  public btnLabel = "Jugar";
  public indexActual = -1;
  public cartaImg = ""; 
  public cartas: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  public JugarReiniciar(){
    if(this.bandera == false)
    {
      this.PrimeraCarta();
      this.btnLabel = "Reiniciar";
      this.bandera = true;
    }
    else
    {
      this.cartaActual = "";
      this.bandera = false;
      this.btnLabel = "Jugar";
      this.puntaje = 0;
      this.indexActual = -1;
      this.cartaImg = "";
    }
  }

  public AsignarImagen(carta: string){
    var random = Math.floor((Math.random() * 4));
    this.cartaImg = `../../../assets/cards/${carta}${random}.jpg`;
  }

  public Mayor(){
    if (this.indexActual > -1)
    {
      do
      {
        var random = Math.floor((Math.random() * 13));
      }while(this.indexActual == random);
      if(this.indexActual < random)
      {
        this.puntaje = this.puntaje + 1;
      }
      this.indexActual = random;
      this.cartaActual = this.cartas[random];
      this.AsignarImagen(this.cartas[random]);
    }
  }

  public Menor(){
    if (this.indexActual > -1)
    {
      do
      {
        var random = Math.floor((Math.random() * 13));
      }while(this.indexActual == random);
      if(this.indexActual > random)
      {
        this.puntaje = this.puntaje + 1;
      }
      this.indexActual = random;
      this.cartaActual = this.cartas[random];
      this.AsignarImagen(this.cartas[random]);
    }
  }

  public PrimeraCarta(){
    var random = Math.floor((Math.random() * 13));
    this.indexActual = random;
    this.cartaActual = this.cartas[random];
    this.AsignarImagen(this.cartas[random]);
  }


}
