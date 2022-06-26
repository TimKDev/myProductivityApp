import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveMainComponent } from './archive-main/archive-main.component';

const routes: Routes = [
  {path: ':userId/archive', component: ArchiveMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
