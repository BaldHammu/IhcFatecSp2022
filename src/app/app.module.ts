import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/material-module/shared-module.module';

import { provideFirebaseApp,  initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DialogCardInfoComponent } from './dialog-card-info/dialog-card-info.component';
import { DialogCardGraphComponent } from './dialog-card-graph/dialog-card-graph.component';
import { ParametrosProjetoComponent } from './parametros-projeto/parametros-projeto.component';
import { DialogCreateProjectComponent } from './dialog-create-project/dialog-create-project.component';
import { DialogCriarBacklogComponent } from './dialog-criar-backlog/dialog-criar-backlog.component';
import { DialogEditarSprintComponent } from './dialog-editar-sprint/dialog-editar-sprint.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    DialogCardInfoComponent,
    DialogCardGraphComponent,
    ParametrosProjetoComponent,
    DialogCreateProjectComponent,
    DialogCriarBacklogComponent,
    DialogEditarSprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgbModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
