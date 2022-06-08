import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, retry } from 'rxjs';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { Timer } from 'src/models/timer.class';

@Injectable({
  providedIn: 'root'
})
export class PomodoroTimerService {
  currentTask!: MyTask;
  currentTaskId: string = 'unset';
  activeBoard!: Board;
  activeTimer: any = new Timer(1);

  timerSubscription!: any;
  isTimerPaused = true;
  isTimerInit = false;

  pomodoroLenght = 10;
  pomodoroPause = 20;
  

  constructor(private firestore: AngularFirestore) { }


  initTaskOfTimerService(currentTask: MyTask, currentTaskId: string, activeBoard: Board){
    this.currentTask = currentTask;
    this.currentTaskId = currentTaskId;
    this.activeBoard = activeBoard;
  }

  subscribeToTimerPomodoro() {
    this.timerSubscription = this.activeTimer.timerFinished.subscribe((isTimerFinished: boolean) => {
      if (!isTimerFinished) return;
      this.currentTask.numPomodoroDone++;
      this.updateCurrentTaskInFirebase();
      this.cancleActiveTimer();
      if (this.currentTask.numPomodoro == this.currentTask.numPomodoroDone) this.currentTaskId = 'unset';
      else{
        this.isTimerInit = true;
        this.activeTimer = new Timer(this.pomodoroPause);
        this.subscribeToTimerPause();
        this.activeTimer.play();
      }
    });
  }

  subscribeToTimerPause() {
    this.timerSubscription = this.activeTimer.timerFinished.subscribe((isTimerFinished: boolean) => {
      if (!isTimerFinished) return;
      this.cancleActiveTimer();
      this.isTimerInit = true;
      this.activeTimer = new Timer(this.pomodoroLenght);
      this.subscribeToTimerPomodoro();
      this.activeTimer.play();
    });
  }

  cancleActiveTimer() {
    this.activeTimer = null;
    if (!this.timerSubscription) return;
    console.log('unsubscribe');
 
    this.timerSubscription.unsubscribe();
  }

  updateCurrentTaskInFirebase(){
    this.firestore
    .collection('tasks')
    .doc(this.currentTaskId)
    .update(this.currentTask.toJSON());
  }

  startNewTimer(timerLenght: number) {
    if (this.isTimerInit) return;
    if (this.currentTask.numPomodoroDone == this.currentTask.numPomodoro) return;
    this.isTimerInit = true;
    this.activeTimer = new Timer(timerLenght);
    this.subscribeToTimerPomodoro();
  }

  playTimer(){
    if (!this.isTimerPaused) return;
    this.isTimerPaused = false;
    this.startNewTimer(this.pomodoroLenght);
    this.activeTimer.play();
  }

  pauseTimer() {
    if (this.isTimerPaused) return;
    this.isTimerPaused = true;
    this.activeTimer.pause();
  }

  restartTimer() {
    this.cancleActiveTimer();
    this.isTimerPaused = true;
    this.currentTaskId = 'unset';
    this.isTimerInit = false;
  }

  finishTimer() {
    this.activeTimer.finishTimer();
    this.isTimerPaused = true;
    this.isTimerInit = false;
  }

  addFiveMinutesToTimer() {
    this.activeTimer.addFiveMinutes();
  }


}
