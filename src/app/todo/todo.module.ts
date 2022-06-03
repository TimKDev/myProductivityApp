import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ExternalModulesModule } from '../external-modules.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ExternalModulesModule
  ]
})
export class TodoModule { }
