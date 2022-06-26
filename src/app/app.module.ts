import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KanbanModule } from './kanban/kanban.module';
import { KanbanRoutingModule } from './kanban/kanban-routing.module';
import { LoginModule } from './login/login.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { TodoModule } from './todo/todo.module';
import { TodoRoutingModule } from './todo/todo-routing.module';
import { PomodoroTimerModule } from './pomodoro-timer/pomodoro-timer.module';
import { PomodoroTimerRoutingModule } from './pomodoro-timer/pomodoro-timer-routing.module';
import { StatisticModule } from './statistic/statistic.module';
import { StatisticRoutingModule } from './statistic/statistic-routing.module';
import { SettingsModule } from './settings/settings.module';
import { SettingsRoutingModule } from './settings/settings-routing.module';
import { HelpModule } from './help/help.module';
import { HelpRoutingModule } from './help/help-routing.module';
import { ArchiveModule } from './archive/archive.module';
import { ArchiveRoutingModule } from './archive/archive-routing.module';

import { ExternalModulesModule } from './external-modules.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    KanbanRoutingModule, 
    KanbanModule,
    LoginModule,
    LoginRoutingModule,
    TodoModule,
    TodoRoutingModule,
    PomodoroTimerModule,
    PomodoroTimerRoutingModule,
    StatisticModule,
    StatisticRoutingModule,
    SettingsModule,
    SettingsRoutingModule,
    HelpModule,
    HelpRoutingModule,
    ArchiveModule,
    ArchiveRoutingModule,
    ExternalModulesModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
