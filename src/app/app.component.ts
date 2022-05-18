import { Component } from '@angular/core';
import { FirebaseAuthService } from './firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myProductivityApp';
  showFiller = false;

  constructor(
    public fireAuth: FirebaseAuthService
  ){ }

  ngOnInit() {
    const email = localStorage.getItem('userAuthEMailT24');
    const password = localStorage.getItem('userAuthPasswordT24');
    if(email && password){
      this.fireAuth.signIn(email, password);
    }
  }

  logOut() {
    this.fireAuth.logOut();
  }
}
