import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
// Das folgende Modul kann verwendet werden, um Diagramme zu erstellen:  
import { NgChartsModule } from 'ng2-charts';
import { KanbanBoardsComponent } from './kanban-boards/kanban-boards.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { DialogAddAccountComponent } from './dialog-add-account/dialog-add-account.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DialogAddBoardComponent } from './dialog-add-board/dialog-add-board.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanBoardsComponent,
    BoardComponent,
    LoginComponent,
    DialogAddAccountComponent,
    TodoListComponent,
    DialogAddBoardComponent,
    DialogAddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatProgressBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    NgChartsModule
  
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
