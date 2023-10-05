import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc, orderBy, query } from "firebase/firestore";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  constructor(private dataService: DataService){};


  public user: string = '';
  public nuevoMensaje: string = '';
  public fecha: string = '';
  public mostrar: boolean = false;
  public mensajes: string[] = [];


  ngOnInit()
  {
    this.user = this.dataService.userName;
    this.getChat();
  }

  public async EnviarMensaje(){
    const newChatRef = doc(collection(db, "chat"));
    await setDoc(newChatRef, {user: this.user, fecha: Date.now(), mensaje: this.nuevoMensaje});
    var usuario = (this.user.split("@"))[0];
    this.mensajes.push(`${this.crearHorario()} - ${usuario}: ${this.nuevoMensaje}`);
    this.nuevoMensaje = "";
  }

  public async getChat(){
    const q = query(collection(db, "chat"), orderBy("fecha"));
    const docRef = await getDocs(q);
      try {
        docRef.forEach((doc) => {
          var usuario = doc.get("user").split("@");
          usuario = usuario[0];
          this.mensajes.push(`${this.crearHorario(new Date(doc.get("fecha")))} - ${usuario}: ${doc.get("mensaje")}`);
        });
      } catch (error) {
        console.log(error);
      }
  }

  public crearHorario(horario: Date = new Date(Date.now())){
    var horas = horario.getHours();
    var minutos = horario.getMinutes();
    var minutosStr = '';
    var horarioFinal = `${horas}:${minutos}`;
    if(minutos < 10)
    {
      minutosStr = '0' + minutos.toString();
      horarioFinal = `${horas}:${minutosStr}`;
    }
    return horarioFinal;
  }


}

const firebaseConfig = {
  apiKey: "AIzaSyC_n-zaJwwDOT_baENLRCAPjeEtItyobmI",
  authDomain: "tp-sala-juegos-b2d86.firebaseapp.com",
  projectId: "tp-sala-juegos-b2d86",
  storageBucket: "tp-sala-juegos-b2d86.appspot.com",
  messagingSenderId: "420853186094",
  appId: "1:420853186094:web:a65608cf7a38ffa03529bf"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
