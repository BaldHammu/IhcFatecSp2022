import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  mockFiltered: any = [];
  projetoAtual: any;
  mockObj: any = {
    projeto: [{
      id: 1,
      nome: 'Mock Inicial',
      descricao: 'Insert Sumthin in here',
      responsavel: 'daan.estrela@hotmail.com',
      integrantes: ['oi@oi.com', 'daan.estrela@hotmail.com'],
      prazo: 25,
      dataCriacao: new Date(),
      dataTermino: new Date(),
      sprint: [{
        id: 1,
        nome: 'Sprint 01',
        dataCriacao: new Date(),
        dataTermino: new Date(),
        prazo: 25,
        backlog: [
          {
            titulo: 'Limpar a casa',
            dificuldade: 'Dificil',
            responsavel: 'Danilo Flores',
            status: Status.Planejando,
            artefato: [
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
            ]
          },
          {
            titulo: 'Cozinhar um fetuccini',
            dificuldade: 'Dificil',
            responsavel: 'Danilo Flores',
            artefato: [
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
            ]
          },
          {
            titulo: 'Limpar o Pc',
            dificuldade: 'Dificil',
            responsavel: 'Danilo Flores',
            artefato: [
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
            ]
          }]
      }]

    }, {
      id: 2,
      nome: 'Mock Inicial',
      descricao: 'Insert Sumthin in here',
      responsavel: 'daan.estrela@hotmail.com',
      integrantes: ['oi@oi.com'],
      sprint: [{
        nome: 'Sprint 01',
        backlog: [
          {
            titulo: 'Limpar a casa',
            dificuldade: 'Dificil',
            responsavel: 'Danilo Flores',
            status: Status.Planejando,
            artefato: [
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
            ]
          },
          {
            titulo: 'Cozinhar um fetuccini',
            dificuldade: 'Dificil',
            responsavel: 'Danilo Flores',
            artefato: [
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
            ]
          },
          {
            titulo: 'Limpar o Pc',
            dificuldade: 'Dificil',
            responsavel: 'Danilo Flores',
            artefato: [
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
              {
                titulo: 'Limpar a casa',
                dificuldade: 'Dificil',
                responsavel: 'Danilo Flores',
                dataInicio: new Date()
              },
            ]
          }]
      }]
    }]
  };

  constructor() { }

  loginFilter() {
    this.mockFiltered.concat(this.mockObj.projeto.filter((x: any) => x.integrantes.some((x: any) => x == this.usuarioLogado))); 
  }

  filterProjeto(id: any) {
    this.projetoAtual = this.mockFiltered.filter((x: any) => x.id == id)
    this.updateObjects.next(null);
    console.log(this.projetoAtual);
  }

  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
