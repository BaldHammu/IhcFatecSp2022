import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/material-module/shared-module.module';

import { provideFirebaseApp,  initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DialogCardInfoComponent } from './dialog-card-info/dialog-card-info.component';
import { DialogCardGraphComponent } from './dialog-card-graph/dialog-card-graph.component';
import { ParametrosProjetoComponent } from './parametros-projeto/parametros-projeto.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogCardInfoComponent,
    DialogCardGraphComponent,
    ParametrosProjetoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgbModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
