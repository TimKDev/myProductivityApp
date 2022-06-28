import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit {

  angle: number = 45;
  valueProgress: number = 0;
  valueProgressStep: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  setValueProgress(newValue: number){
    this.valueProgress = newValue;
    this.angle = this.calcRotationAngle(newValue);
  }

  calcRotationAngle(valueProgress: number):number {
    return 30;
  }

}
