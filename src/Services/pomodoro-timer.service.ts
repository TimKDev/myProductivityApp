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
  activeTimer: any = new Timer(10);

  timerSubscription!: any;
  isTimerPaused = true;
  isTimerInit = false;
  isPomodoro = true;

  pomodoroLenght = 10;
  pomodoroPause = 20;
  

  constructor(private firestore: AngularFirestore) { }


  initTaskOfTimerService(currentTask: MyTask, currentTaskId: string, activeBoard: Board){
    this.currentTask = currentTask;
    this.currentTaskId = currentTaskId;
    this.activeBoard = activeBoard;
  }

  subscribeToTimerPomodoro() {
    this.isPomodoro = true;
    this.timerSubscription = this.activeTimer.timerFinished.subscribe((isTimerFinished: boolean) => {
      if (!isTimerFinished) return;
      this.currentTask.numPomodoroDone++;
      this.updateCurrentTaskInFirebase();
      this.cancleActiveTimer();
      if (this.isTaskFinished()){
        this.currentTaskId = 'unset';
        this.isPomodoro = true;
        this.isTimerPaused = true;
        this.isTimerInit = false;
      } 
      else{
        this.isTimerInit = true;
        this.activeTimer = new Timer(this.pomodoroPause);
        this.subscribeToTimerPause();
        this.activeTimer.play();
      }
    });
  }

  subscribeToTimerPause() {
    this.isPomodoro = false;
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
    this.timerSubscription.unsubscribe();
  }

  updateCurrentTaskInFirebase(){
    this.firestore
    .collection('tasks')
    .doc(this.currentTaskId)
    .update(this.currentTask.toJSON());
  }

  isTaskFinished(){
    return this.currentTask.numPomodoroDone == this.currentTask.numPomodoro;
  }

  startNewTimer(timerLenght: number) {
    if (this.isTimerInit) return;
    if (this.isTaskFinished()) return;
    this.isTimerInit = true;
    this.activeTimer = new Timer(timerLenght);
    this.subscribeToTimerPomodoro();
  }

  playTimer(){
    if (!this.isTimerPaused || this.isTaskFinished()) return;
    this.isTimerPaused = false;
    this.startNewTimer(this.pomodoroLenght);
    this.activeTimer.play();
  }

  pauseTimer() {
    if (this.isTimerPaused || !this.activeTimer) return;
    this.isTimerPaused = true;
    this.activeTimer.pause();
  }

  restartTimer() {
    if(!this.activeTimer || !this.isTimerInit) return;
    if(this.isTaskFinished()) return;
    this.cancleActiveTimer();
    this.isTimerPaused = true;
    this.currentTaskId = 'unset';
    this.isTimerInit = false;
    this.isPomodoro = true;
  }

  finishTimer() {
    if(!this.activeTimer || !this.isTimerInit) return;
    if(this.isTaskFinished()) return;
    this.activeTimer.finishTimer();
  }

  addFiveMinutesToTimer() {
    if(!this.activeTimer || !this.isTimerInit) return;
    if(this.isTaskFinished()) return;
    this.activeTimer.addFiveMinutes();
  }


}
