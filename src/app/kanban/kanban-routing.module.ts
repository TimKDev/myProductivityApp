import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardsComponent } from './kanban-boards/kanban-boards.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {path: ':userId/boards', component: KanbanBoardsComponent},
  {path: ':userId/boards/:boardId', component: BoardComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
























