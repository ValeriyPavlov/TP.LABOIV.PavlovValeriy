import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { DataService } from 'src/app/shared/data.service';
import { ToastService } from 'angular-toastify'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private dataService: DataService, private toastService: ToastService){};

  public user: string = '';
  public password: string = '';

  public login = "Login";
  public btnLabel = "Entrar";
  public btnLabel2 = "Registrarse";
  public logLabel = "¿Aun no estas registrado?";

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
        const newUserLog = doc(collection(db, "logs"));
        await setDoc(newUserLog, {user: this.user, fecha: Date.now()});

        this.enviarUserName();
        this.router.navigateByUrl("/home");
      }
      else
      {
        this.addErrorToast("Usuario o Contraseña no validos.");
      }
    }
    catch (err) 
    {
      console.log(err);
    }
  }

  public login_register()
  {
    if (this.login != "Login")
    {
      this.login = "Login";
      this.btnLabel = "Entrar";
      this.btnLabel2 = "Registrarse";
      this.logLabel = "¿Aun no estas registrado?";
    }
    else
    {
      this.login = "Registración";
      this.btnLabel = "Registrarse";
      this.btnLabel2 = "Login";
      this.logLabel = "¿Ya estas registrado?";
    }
  }

  public async registrarse()
  {
    const docRef = await getDocs(collection(db, "usuarios"));
    var existe = false;
    try 
    {
      docRef.forEach((doc) => {
        if (doc.get("user") == this.user)
        {
          existe = true;
        }
      });
      if (existe == false)
      {
        if(this.user != "" && this.password != "" && (this.user).length > 2 && (this.password).length > 2)
        {
          const newUserRef = doc(collection(db, "usuarios"));
          await setDoc(newUserRef, {user: this.user, password: this.password});
          const newUserLog = doc(collection(db, "logs"));
          await setDoc(newUserLog, {user: this.user, fecha: Date.now()});
          this.enviarUserName();
          this.router.navigateByUrl("/home");
        }
        else
        {
          this.addErrorToast("Error: datos no validos!");
        }
      }
      else
      {
        this.addErrorToast("Error: el usuario ya existe!");
      }
    }
    catch (err) 
    {
      console.log(err);
    }
  }

  public async login_reg()
  {
    if (this.login == "Login")
    {
      this.logear();
    }
    else
    {
      this.registrarse();
    }
  }

  public enviarUserName()
  {
    this.dataService.userName = this.user;
  }

  public autoLog()
  {
    this.user = "test";
    this.password = "test";
    this.logear();
  }

  addErrorToast(message: string) {
    this.toastService.error(message);
  };
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
