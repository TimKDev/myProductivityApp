import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroTimerRoutingModule } from './pomodoro-timer-routing.module';
import { ExternalModulesModule } from '../external-modules.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';


@NgModule({
  declarations: [
    PomodoroComponent
  ],
  imports: [
    CommonModule,
    PomodoroTimerRoutingModule,
    ExternalModulesModule
  ]
})
export class PomodoroTimerModule { }
