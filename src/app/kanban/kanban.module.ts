import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { DialogAddBoardComponent } from './dialog-add-board/dialog-add-board.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { DialogDeleteBoardComponent } from './dialog-delete-board/dialog-delete-board.component';
import { DialogAddColumnComponent } from './dialog-add-column/dialog-add-column.component';
import { DialogDeleteColComponent } from './dialog-delete-col/dialog-delete-col.component';
import { KanbanBoardsComponent } from './kanban-boards/kanban-boards.component';
import { BoardComponent } from './board/board.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
// Das folgende Modul kann verwendet werden, um Diagramme zu erstellen:  
import { NgChartsModule } from 'ng2-charts';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DialogEditColNameComponent } from './dialog-edit-col-name/dialog-edit-col-name.component';
import { AppModule } from '../app.module';


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
    DialogEditColNameComponent
  ],
  imports: [
    AppModule,
    // CommonModule,
    // BrowserModule,
    // RouterModule,
    // BrowserAnimationsModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatButtonModule,
    // MatTooltipModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCardModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // MatProgressBarModule,
    // MatMenuModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // MatDividerModule,
    // NgChartsModule,
    // DragDropModule
  ],
  exports: [
    // CommonModule,
    // BrowserModule,
    // RouterModule,
    // BrowserAnimationsModule,
    // MatToolbarModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatButtonModule,
    // MatTooltipModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCardModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // FormsModule,
    // AngularFirestoreModule,
    // MatProgressBarModule,
    // MatMenuModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // MatDividerModule,
    // NgChartsModule,
    // DragDropModule
  ]
})
export class KanbanModule { }
