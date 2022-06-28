import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveMainComponent } from './archive-main/archive-main.component';
import { ExternalModulesModule } from '../external-modules.module';
import { ArchiveRoutingModule } from './archive-routing.module';
import { DialogDeleteAllComponent } from './dialog-delete-all/dialog-delete-all.component';



@NgModule({
  declarations: [
    ArchiveMainComponent,
    DialogDeleteAllComponent
  ],
  imports: [
    CommonModule,
    ExternalModulesModule,
    ArchiveRoutingModule
  ]
})
export class ArchiveModule { }
