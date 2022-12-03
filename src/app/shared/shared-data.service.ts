import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { projeto, sprint } from '../project.models';

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
  updateObjects: Subject<null> = new Subject();
  usuarioLogado: any = 'oi@oi.com';
  private dbPath = '/projetos';
  private dbPathSprint = '/sprints';

  projetoRef: AngularFireList<projeto>;
  sprintRef: AngularFireList<sprint>;

  constructor(private db: AngularFireDatabase) {
    this.projetoRef = db.list(this.dbPath);
    this.sprintRef = db.list(this.dbPathSprint);
  }

  getAllProjetos(): AngularFireList<projeto> {
    return this.projetoRef;
  }

  createProjetos(tutorial: projeto): any {
    return this.projetoRef.push(tutorial);
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

  createSprints(tutorial: projeto): any {
    return this.sprintRef.push(tutorial);
  }

  updateSprints(key: string, value: any): Promise<void> {
    return this.sprintRef.update(key, value);
  }

  deleteSprints(key: string): Promise<void> {
    return this.sprintRef.remove(key);
  }

}