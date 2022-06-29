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

  constructor(public timer: PomodoroTimerService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // console.log(this.timer.activeTimer.secondsLeft);
    this.valueProgress = this.getValueProgressFromClock();
  }

  getValueProgressFromClock(): number {
    let secondsTotal!: number;
    if (!this.timer.isPomodoro) secondsTotal = this.timer.pomodoroPause;
    else secondsTotal = this.timer.pomodoroLenght;
    let secondsPassed: number = secondsTotal - this.timer.activeTimer.secondsLeft;
    let progressValueStep: number = 100/secondsTotal;
    return secondsPassed * progressValueStep;
  }

  startTimer() {
    this.timer.initTaskOfTimerService(this.currentTask, this.taskId, this.activeBoard);
    if (!this.timer.isTimerPaused || this.timer.isTaskFinished()){
      this.timer.currentTaskId = 'unset';
    }
    this.timer.playTimer();
  }

  

}
