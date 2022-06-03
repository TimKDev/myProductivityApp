import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroTimerRoutingModule } from './pomodoro-timer-routing.module';
import { ExternalModulesModule } from '../external-modules.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PomodoroTimerRoutingModule,
    ExternalModulesModule
  ]
})
export class PomodoroTimerModule { }
