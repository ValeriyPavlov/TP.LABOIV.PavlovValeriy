import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router){};

  public user: string = '';
  public password: string = '';

  public async logear()
  {
    const docRef = await getDocs(collection(db, "usuarios"));
    var bandera = false;
    try 
    {
      docRef.forEach((doc) => {
        if (doc.get("user") == this.user && doc.get("password") == this.password)
        {
          bandera = true;
        }
      });
      if (bandera != false)
      {
        this.router.navigateByUrl("/home");
      }
      else
      {
        // Agregar un componente error o un label?
        this.router.navigateByUrl("/error");
      }
    }
    catch (err) 
    {
      console.log(err);
    }
  }

  public async registrarse()
  {
    if(this.user != "" && this.password != "" && (this.user).length > 2 && (this.password).length > 2)
    {
      const newUserRef = doc(collection(db, "usuarios"));
      await setDoc(newUserRef, {user: this.user, password: this.password});
      console.log("Usuario creado con exito!");
    }
    else
    {
      console.log("Error al crear usuario"); // Agregar aviso de error, componente o un label.
    }

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
