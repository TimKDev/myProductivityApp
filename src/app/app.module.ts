import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { KanbanRoutingModule } from './kanban/kanban-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DialogAddAccountComponent } from './dialog-add-account/dialog-add-account.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NotesComponent } from './notes/notes.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { HabitComponent } from './habit/habit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';
import { KanbanModule } from './kanban/kanban.module';
import { ExternalModulesModule } from './external-modules.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogAddAccountComponent,
    TodoListComponent,
    NotesComponent,
    PomodoroComponent,
    HabitComponent,
    StatisticsComponent,
    SettingsComponent,
    HelpComponent
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    KanbanRoutingModule, 
    KanbanModule,
    ExternalModulesModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
