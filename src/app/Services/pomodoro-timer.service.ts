import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';

@Injectable({
  providedIn: 'root'
})
export class PomodoroTimerService {
  currentTask!: MyTask;
  currentTaskId: string = 'unset';
  activeBoard!: Board;
  clockMinuteStart: number = 1; // Wird als Input gegeben.
  clock: [number, number] = [this.clockMinuteStart, 0];
  activeTimer!: any;
  startTime = 0;
  pauseTime = 0;
  seconds: number = 0;
  timerFinished = false;
  timerPaused = true;
  numAddedFiveMinutes = 0;
  timerEnd = new BehaviorSubject(false);
  saveSubscribtion!: any;
  

  constructor() { }

  addSecond() {
    if((new Date()).getTime() - this.startTime < 1000*(this.seconds + 1)) return;
    this.seconds++;
    this.convertSecondsToClock();
  }

  convertSecondsToClock(){
    this.clock[1] = 59 - this.seconds % 60;
    this.clock[0] = this.clockMinuteStart - 1 - Math.floor(this.seconds / 60) + this.numAddedFiveMinutes*5;
    if(this.checkTimerFinished()){
      this.timerEnd.next(true);
      this.timerEnd.next(false);
      this.restart();
    } 
  }

  checkTimerFinished() {
    return this.clock[0] == 0 && this.clock[1] == 0; 
  }

  start() {
    if(!this.timerPaused) return;
    this.startTime += (new Date()).getTime() - this.pauseTime;
    if(this.timerFinished) this.startTime = (new Date()).getTime();
    this.timerFinished = false;
    this.timerPaused = false;
    this.activeTimer = setInterval(() => {this.addSecond()}, 100)
  }

  pause() {
    this.timerPaused = true;
    this.pauseTime = (new Date()).getTime();
    clearInterval(this.activeTimer);
  }

  restart() {
    if(!this.activeTimer) return;
    clearInterval(this.activeTimer);
    this.seconds = 0;
    this.numAddedFiveMinutes = 0;
    this.clock = [this.clockMinuteStart, 0];
    this.currentTaskId = 'unset';
    this.timerPaused = true;
    this.timerFinished = true;
    this.activeTimer = null;
  }

  addFiveMinutes() {
    this.numAddedFiveMinutes++;
    this.convertSecondsToClock();
  }

  finishTimer() {
    this.timerEnd.next(true);
    this.timerEnd.next(false);
    this.restart();
  }

  isTimerActive() {
    if (this.activeTimer) return true;
    return false;
  }

}
