import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseAuthService } from '../Services/firebase-auth.service';
import { PomodoroTimerService } from '../Services/pomodoro-timer.service';
import { TaskDetailsComponent } from './kanban/task-details/task-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myProductivityApp';
  showFiller = false;
  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  constructor(
    public fireAuth: FirebaseAuthService,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public timer: PomodoroTimerService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ){
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

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

  isMobileView() {
    return window.innerWidth < 1000;
  }

  openDialogTaskDetails() {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      maxWidth: this.isMobileView() ? '100vw' : 'auto',
      maxHeight: this.isMobileView() ? '100vh' : 'auto',
      height: this.isMobileView() ? '100%' : 'auto',
      width: this.isMobileView() ? '100%' : 'auto'
    });
    dialogRef.componentInstance.taskId = this.timer.currentTaskId;
    dialogRef.componentInstance.currentTask = this.timer.currentTask;
    dialogRef.componentInstance.activeBoard = this.timer.activeBoard;
  }
}
