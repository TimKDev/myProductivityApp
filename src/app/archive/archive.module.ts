import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveMainComponent } from './archive-main/archive-main.component';
import { ExternalModulesModule } from '../external-modules.module';
import { ArchiveRoutingModule } from './archive-routing.module';



@NgModule({
  declarations: [
    ArchiveMainComponent
  ],
  imports: [
    CommonModule,
    ExternalModulesModule,
    ArchiveRoutingModule
  ]
})
export class ArchiveModule { }
