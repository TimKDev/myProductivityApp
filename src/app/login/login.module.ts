import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAddAccountComponent } from './dialog-add-account/dialog-add-account.component';
import { LoginRoutingModule } from './login-routing.module';
import { ExternalModulesModule } from '../external-modules.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    DialogAddAccountComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ExternalModulesModule
  ]
})
export class LoginModule { }
