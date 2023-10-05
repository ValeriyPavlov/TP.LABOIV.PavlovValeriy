import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}

  public async login(email: string, password: string)
  {
    try 
    {
      return await this.auth.signInWithEmailAndPassword(email, password).catch(function(err){
        return err.code;
      });
    } 
    catch (error) {
      return null;
    }
  }

  public async register(email: string, password: string)
  {
    try 
    {
      return await this.auth.createUserWithEmailAndPassword(email, password).catch(function(err){
        return err.code;
      });
    } 
    catch (error) {
      return null;
    }
  }

}
