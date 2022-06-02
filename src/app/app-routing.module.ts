import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitComponent } from './habit/habit.component';
import { HelpComponent } from './help/help.component';


import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: ':userId/todo', component: TodoListComponent},
  {path: ':userId/notes', component: NotesComponent},
  {path: ':userId/pomodoro', component: PomodoroComponent},
  {path: ':userId/habit', component: HabitComponent},
  {path: ':userId/statistics', component: StatisticsComponent},
  {path: ':userId/settings', component: SettingsComponent},
  {path: ':userId/help', component: HelpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
