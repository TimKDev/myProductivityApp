import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public loggedIn = false;
  public userUid: any;

  constructor(
    private firebaseAuth : AngularFireAuth,
    private router: Router
  ) { }

  // Sign User in and save the user data to local storage such that the user doesnt need
  // to sign in again:
  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loggedIn = true; 
      this.userUid = res.user?.uid;
      this.router.navigateByUrl(`${res.user?.uid}/boards`);   
      localStorage.setItem('userAuthEMailT24', email);
      localStorage.setItem('userAuthPasswordT24', password);
    })
    .catch(err => {
      alert(err);
    });
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .catch(err => {
      alert(err);
    });
    // After creating the account the new created user is logged in and the 
    // user privaleges are save to the firestore where the user UID is used as
    // its key:
    await this.signIn(email, password);
  }

  logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('userAuthEMailT24');
    localStorage.removeItem('userAuthPasswordT24');
    this.router.navigateByUrl(`/`);  
    this.loggedIn = false;
  }
  
}
