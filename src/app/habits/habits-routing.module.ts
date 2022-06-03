import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitComponent } from './habit/habit.component';

const routes: Routes = [
  {path: ':userId/habit', component: HabitComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitsRoutingModule { }
