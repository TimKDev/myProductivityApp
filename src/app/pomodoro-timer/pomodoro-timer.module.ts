import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PomodoroTimerRoutingModule } from './pomodoro-timer-routing.module';
import { ExternalModulesModule } from '../external-modules.module';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { KanbanModule } from '../kanban/kanban.module';
import { CircleProgressComponent } from './circle-progress/circle-progress.component';


@NgModule({
  declarations: [
    PomodoroComponent,
    CircleProgressComponent
  ],
  imports: [
    CommonModule,
    PomodoroTimerRoutingModule,
    ExternalModulesModule,
    KanbanModule
  ]
})
export class PomodoroTimerModule { }
