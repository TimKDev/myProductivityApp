import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Board } from 'src/models/board.class';
import { MyTask } from 'src/models/task.class';
import { PomodoroTimerService } from 'src/Services/pomodoro-timer.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit, DoCheck {

  clockInit = [0, 10];
  currentTask = new MyTask();
  activeBoard = new Board('Dummy');
  taskId = 'dummy';

  valueProgress: number = 0;
  secondsTotal!: number;
  setSecondsTotalPomodoro = false;
  setSecondsTotalPause = false;

  constructor(public timer: PomodoroTimerService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.valueProgress = this.getValueProgressFromClock();
  }

  setValueSecondsTotal() {
    if (this.timer.isPomodoro && !this.setSecondsTotalPomodoro){
      this.secondsTotal = this.timer.pomodoroLenght;
      this.setSecondsTotalPomodoro = true;
      this.setSecondsTotalPause = false;
    } 
    if (!this.timer.isPomodoro && !this.setSecondsTotalPause){
      this.secondsTotal = this.timer.pomodoroPause;
      this.setSecondsTotalPomodoro = false;
      this.setSecondsTotalPause = true;
    } 
  }

  getValueProgressFromClock(): number {
    if(!this.timer.activeTimer) return 0;
    this.setValueSecondsTotal();
    console.log(this.timer.numFiveMinutesAdded);
    
    let secondsPassed: number = 300*this.timer.numFiveMinutesAdded + this.secondsTotal - this.timer.activeTimer.secondsLeft;
    let progressValueStep: number = 100/(300*this.timer.numFiveMinutesAdded + this.secondsTotal);
    return secondsPassed * progressValueStep;
  }

  startTimer() {
    this.timer.initTaskOfTimerService(this.currentTask, this.taskId, this.activeBoard);
    if (!this.timer.isTimerPaused || this.timer.isTaskFinished()){
      this.timer.currentTaskId = 'unset';
    }
    this.timer.playTimer();
  }

  addFiveMinutes() {
    // this.secondsTotal += 300;
    this.timer.numFiveMinutesAdded++;
    this.timer.addFiveMinutesToTimer();
  }

  resetTimer() {
    if (this.timer.isPomodoro){
      this.secondsTotal = this.timer.pomodoroLenght;
    } 
    if (!this.timer.isPomodoro){
      this.secondsTotal = this.timer.pomodoroPause;
    } 
    this.timer.restartTimer()
  }

  

}
