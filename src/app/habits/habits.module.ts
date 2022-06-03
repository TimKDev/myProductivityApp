import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitsRoutingModule } from './habits-routing.module';
import { ExternalModulesModule } from '../external-modules.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HabitsRoutingModule,
    ExternalModulesModule
  ]
})
export class HabitsModule { }
