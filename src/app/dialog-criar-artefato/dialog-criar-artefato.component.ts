import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import {  MY_FORMATS } from '../dialog-create-project/dialog-create-project.component';
import { backlog } from '../project.models';
import { SharedDataService, Status } from '../shared/shared-data.service';

@Component({
  selector: 'app-dialog-criar-artefato',
  templateUrl: './dialog-criar-artefato.component.html',
  styleUrls: ['./dialog-criar-artefato.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogCriarBacklogArtefato implements OnInit {
  status:any = Object.keys(Status) ;
  backlog:backlog[] = [];

  formArtefato:FormGroup = this.fb.group({
    titulo: [''],
    descricao:[''],
    responsavel:['Daniel Estrela'],
    integrantes:[''],
    dificuldade:[''],
    dataTermino:[''],
    prazo:this.fb.control({value:null,disabled:true}),
    status:[null],
    backlog:['']
  });
  dataCriacao:Date=new Date();
  edicao = false;


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) private data:any,private shared:SharedDataService,private dialog:MatDialogRef<DialogCriarBacklogArtefato>) { }

  ngOnInit(): void {
    this.shared.getAllBacklog().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data:any) => {
      this.backlog = data.filter((x: any) => x.sprintKey == this.data?.projeto?.sprintKey?this.data?.projeto?.sprintKey:this.data.key);
    });
    if(this.data?.projeto != null){
      this.edicao = true;
      this.dataCriacao = new Date(this.data.projeto.dataCriacao);
      this.formArtefato.patchValue({
        titulo:this.data.projeto.titulo,
        descricao:this.data.projeto.descricao,
        responsavel:this.data.projeto.responsavel,
        integrantes:this.data.projeto.integrantes.toString(),
        dataTermino:new Date(this.data.projeto.dataTermino),
        status:this.data.projeto.status,
        dificuldade:this.data.projeto.dificuldade,
        prazo:this.data.projeto.prazo,
        backlog:this.data.projeto.backlogKey,
      })
    }
  }

  calculatePrazo(){
    this.formArtefato.patchValue({
      prazo:Math.ceil((this.formArtefato.value.dataTermino.valueOf() - this.dataCriacao.valueOf())/ 86400000)
    }) 
  }

  print(){
    const backlogEnvio:backlog = {
      titulo:this.formArtefato.value.titulo,
      descricao:this.formArtefato.value.descricao,
      responsavel:this.formArtefato.value.responsavel,
      integrantes:this.formArtefato.value.integrantes.split(','),
      dataTermino:this.formArtefato.value.dataTermino?._d?this.formArtefato.value.dataTermino._d.getTime():this.formArtefato.value.dataTermino,
      status:this.formArtefato.value.status,
      dificuldade:this.formArtefato.value.dificuldade,
      prazo:this.formArtefato.getRawValue().prazo, 
      sprintKey:this.data?.projeto?.sprintKey?this.data?.projeto?.sprintKey:this.data.key,
      backlogKey:this.formArtefato.value.backlog,
      dataCriacao:this.dataCriacao.getTime()
    };
    if(this.data?.projeto?.key != null){
      this.shared.updateArtefato(this.data?.projeto.key,backlogEnvio)
      this.shared.subFilterBacklog.next(null);
    }
    else{
      this.shared.createArtefato(backlogEnvio);
    }
    this.dialog.close()
  }
}
