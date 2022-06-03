import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { ExternalModulesModule } from '../external-modules.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HelpRoutingModule,
    ExternalModulesModule
  ]
})
export class HelpModule { }
