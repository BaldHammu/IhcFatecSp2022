import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { artefato, backlog, projeto, sprint } from '../project.models';

export enum Status {
  Planejando = 'Planejando',
  Selecionado = 'Selecionado',
  Executando = 'Executando',
  Entregue = 'Entregue',
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  subFilterProject:Subject<null> = new Subject<null>()
  subFilterBacklog:Subject<null> = new Subject<null>()
  projetoAtual:string='';
  sprintAtual:string='';
  usuarioLogado: any = 'oi@oi.com';
  private dbPath = '/projetos';
  private dbPathSprint = '/sprints';
  private dbPathBacklog = '/backlog';
  private dbPathArtefato = '/artefato';

  projetoRef: AngularFireList<projeto>;
  sprintRef: AngularFireList<sprint>;
  backlogRef: AngularFireList<backlog>;
  artefatoRef: AngularFireList<artefato>;

  constructor(private db: AngularFireDatabase) {
    this.projetoRef = db.list(this.dbPath);
    this.sprintRef = db.list(this.dbPathSprint);
    this.backlogRef = db.list(this.dbPathBacklog);
    this.artefatoRef = db.list(this.dbPathArtefato);
  }

  getAllProjetos(): AngularFireList<projeto> {
    return this.projetoRef;
  }

  createProjetos(projeto: projeto): any {
    return this.projetoRef.push(projeto);
  }

  updateProjetos(key: string, value: any): Promise<void> {
    return this.projetoRef.update(key, value);
  }

  deleteProjetos(key: string): Promise<void> {
    return this.projetoRef.remove(key);
  }



  getAllSprints(): AngularFireList<sprint> {
    return this.sprintRef;
  }

  createSprints(sprint: sprint): any {
    return this.sprintRef.push(sprint);
  }

  updateSprints(key: string, value: any): Promise<void> {
    return this.sprintRef.update(key, value);
  }

  deleteSprints(key: string): Promise<void> {
    return this.sprintRef.remove(key);
  }



  getAllBacklog(): AngularFireList<backlog> {
    return this.backlogRef;
  }

  createBacklog(backlog: backlog): any {
    return this.backlogRef.push(backlog);
  }

  updateBacklog(key: string, value: any): Promise<void> {
    return this.backlogRef.update(key, value);
  }

  deleteBacklog(key: string): Promise<void> {
    return this.backlogRef.remove(key);
  }



  getAllArtefato(): AngularFireList<artefato> {
    return this.artefatoRef;
  }

  createArtefato(artefato: artefato): any {
    return this.artefatoRef.push(artefato);
  }

  updateArtefato(key: string, value: any): Promise<void> {
    return this.artefatoRef.update(key, value);
  }

  deleteArtefato(key: string): Promise<void> {
    return this.artefatoRef.remove(key);
  }
}