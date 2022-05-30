import { Injectable } from '@angular/core';
import { MyTask } from 'src/models/task.class';

@Injectable({
  providedIn: 'root'
})
export class PomodoroTimerService {

  currentTaskId: string = 'unset'// Vllt. entfernen.....
  clockMinuteStart: number = 1; // Wird als Input gegeben.
  clock: [number, number] = [this.clockMinuteStart, 0];
  activeTimer!: any;
  startTime: Date = new Date();
  seconds: number = 0;
  timerFinished = false;
  timerStarted = false;

  constructor() { }

  addSecond() {
    if((new Date()).getTime() - this.startTime.getTime() < 1000*(this.seconds + 1)) return;
    this.seconds++;
    this.convertSecondsToClock();
  }

  convertSecondsToClock(){
    this.clock[1] = 59 - this.seconds % 60;
    this.clock[0] = this.clockMinuteStart - 1 - Math.floor(this.seconds / 60);
    if(this.checkTimerFinished()){
      this.timerFinished = true;
      this.restart();
    } 
  }

  checkTimerFinished() {
    return this.clock[0] == 0 && this.clock[1] == 0; 
  }

  start() {
    if(this.timerStarted) return;
    this.startTime = new Date();
    this.timerStarted = true;
    this.activeTimer = setInterval(() => {this.addSecond()}, 100)
  }

  pause() {
    // Das wird so nicht funktioneren!!!
    this.timerStarted = false;
    clearInterval(this.activeTimer);
  }

  restart() {
    clearInterval(this.activeTimer);
    this.seconds = 0;
    this.clock = [this.clockMinuteStart, 0];
    this.currentTaskId = 'unset';
    this.timerStarted = false;
  }

}
