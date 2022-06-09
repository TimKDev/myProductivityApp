import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogAddBoardComponent } from './dialog-add-board/dialog-add-board.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { DialogDeleteBoardComponent } from './dialog-delete-board/dialog-delete-board.component';
import { DialogAddColumnComponent } from './dialog-add-column/dialog-add-column.component';
import { DialogDeleteColComponent } from './dialog-delete-col/dialog-delete-col.component';
import { KanbanBoardsComponent } from './kanban-boards/kanban-boards.component';
import { BoardComponent } from './board/board.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { DialogEditColNameComponent } from './dialog-edit-col-name/dialog-edit-col-name.component';
import { ExternalModulesModule } from '../external-modules.module';
import { DialogEditColOrderComponent } from './dialog-edit-col-order/dialog-edit-col-order.component';
import { DialogEditBoardNameComponent } from './dialog-edit-board-name/dialog-edit-board-name.component';
import { ClockPipe } from './clock.pipe';

@NgModule({
  declarations: [
    KanbanBoardsComponent,
    BoardComponent,
    DialogAddBoardComponent,
    DialogAddTaskComponent,
    DialogDeleteBoardComponent,
    DialogAddColumnComponent,
    DialogDeleteColComponent,
    TaskDetailsComponent,
    TaskUpdateComponent,
    DialogEditColNameComponent,
    DialogEditColOrderComponent,
    DialogEditBoardNameComponent,
    ClockPipe
  ],
  imports: [
    ExternalModulesModule,
    CommonModule
  ],
  exports: [
    ClockPipe
  ]
})
export class KanbanModule { }
