import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { ExternalModulesModule } from '../external-modules.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    ExternalModulesModule
  ]
})
export class StatisticModule { }
