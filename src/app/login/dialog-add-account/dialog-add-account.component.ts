import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseAuthService } from '../../Services/firebase-auth.service';

@Component({
  selector: 'app-dialog-add-account',
  templateUrl: './dialog-add-account.component.html',
  styleUrls: ['./dialog-add-account.component.scss']
})
export class DialogAddAccountComponent implements OnInit {

  loading = false;

  constructor(
    private fireAuth: FirebaseAuthService,
    public dialogRef: MatDialogRef<DialogAddAccountComponent>
  ) { }

  ngOnInit(): void {
  }

  async onSignUp(email: string, password: string) {
    this.loading = true;
    await this.fireAuth.signUp(email, password);
    if (this.fireAuth.loggedIn){
      this.dialogRef.close(); 
    } 
    this.loading = false;
  }

}
