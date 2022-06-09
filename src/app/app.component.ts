import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseAuthService } from './Services/firebase-auth.service';
import { PomodoroTimerService } from './Services/pomodoro-timer.service';
import { TaskDetailsComponent } from './kanban/task-details/task-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myProductivityApp';
  showFiller = false;

  constructor(
    public fireAuth: FirebaseAuthService,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public timer: PomodoroTimerService
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

  openDialogTaskDetails() {
    const dialogRef = this.dialog.open(TaskDetailsComponent);
    dialogRef.componentInstance.taskId = this.timer.currentTaskId;
    dialogRef.componentInstance.currentTask = this.timer.currentTask;
    dialogRef.componentInstance.activeBoard = this.timer.activeBoard;
  }
}
