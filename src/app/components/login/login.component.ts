import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { DataService } from 'src/app/shared/data.service';
import { ToastService } from 'angular-toastify'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private router: Router, private dataService: DataService, private toastService: ToastService, private authService: AuthService){};

  public user: string = '';
  public password: string = '';

  public login = "Login";
  public btnLabel = "Entrar";
  public btnLabel2 = "Registrarse";
  public logLabel = "¿Aun no estas registrado?";

  ngOnInit(){}

  public loginAuth()
  {
    this.authService.login(this.user, this.password).then(async res => {
      if((typeof res) == (typeof "") || res == null)
      {
        this.addErrorToast("Usuario o contraseña invalidos.");
      }
      else
      {
        const newUserLog = doc(collection(db, "logs"));
        await setDoc(newUserLog, {user: this.user, fecha: Date.now()});
        this.enviarUserName();
        this.router.navigateByUrl("/home");
      }
    });
  }

  public registerAuth()
  {
    this.authService.register(this.user, this.password).then(async res => {
      if((typeof res) == (typeof "") || res == null)
      {
        this.addErrorToast("Error. Datos invalidos.");
      }
      else
      {
        // Agregar Hasheo de Password
        const newUser = doc(collection(db, "usuarios"));
        await setDoc(newUser, {user: this.user, password: this.password});
        const newUserLog = doc(collection(db, "logs"));
        await setDoc(newUserLog, {user: this.user, fecha: Date.now()});
        this.enviarUserName();
        this.router.navigateByUrl("/home");
      }
    });
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

  public async login_reg()
  {
    if (this.login == "Login")
    {
      this.loginAuth();
    }
    else
    {
      this.registerAuth();
    }
  }

  public enviarUserName()
  {
    this.dataService.userName = this.user;
  }

  public autoLog()
  {
    this.user = "valeriy@gmail.com";
    this.password = "valeriy";
    this.loginAuth();
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
