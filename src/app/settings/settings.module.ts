import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ExternalModulesModule } from '../external-modules.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ExternalModulesModule
  ]
})
export class SettingsModule { }
