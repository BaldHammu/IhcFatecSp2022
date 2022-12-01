import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component'
import { LoginComponent } from '../login/login/login.component';
import { HeaderComponent } from './header/header/header.component';
import { SharedModule } from '../shared/material-module/shared-module.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegisterComponent } from '../register/register.component';
import { BacklogComponent } from '../backlog/backlog.component';
import { BacklogSprintComponent } from '../backlog-sprint/backlog-sprint.component';
import { FiltroComponent } from './filtro/filtro.component';


@NgModule({
  declarations: [
    CoreComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    RegisterComponent,
    BacklogComponent,
    BacklogSprintComponent,
    FiltroComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    
  ]
})
export class CoreModule { }
