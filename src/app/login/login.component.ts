import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddAccountComponent } from '../dialog-add-account/dialog-add-account.component';
import { FirebaseAuthService } from '../Services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(
    public fireAuth: FirebaseAuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async onSignIn(email: string, password: string) {
    this.loading = true;
    await this.fireAuth.signIn(email, password);
    this.loading = false;
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogAddAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
