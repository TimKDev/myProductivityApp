import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

const routes: Routes = [
  {path: ':userId/pomodoro', component: PomodoroComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PomodoroTimerRoutingModule { }
