import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

import { KanbanBoardsComponent } from './kanban-boards/kanban-boards.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: ':userId/boards', component: KanbanBoardsComponent},
  {path: ':userId/todo', component: TodoListComponent},
  {path: ':userId/boards/:boardId', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
