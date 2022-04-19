import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

import { KanbanBoardsComponent } from './kanban-boards/kanban-boards.component';

const routes: Routes = [
  {path: 'boards', component: KanbanBoardsComponent},
  {path: 'boards/:boardId', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
