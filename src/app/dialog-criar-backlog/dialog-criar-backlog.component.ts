import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  MY_FORMATS } from '../dialog-create-project/dialog-create-project.component';
import { backlog } from '../project.models';
import { SharedDataService, Status } from '../shared/shared-data.service';

@Component({
  selector: 'app-dialog-criar-backlog',
  templateUrl: './dialog-criar-backlog.component.html',
  styleUrls: ['./dialog-criar-backlog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogCriarBacklogComponent implements OnInit {
  status:any = Object.keys(Status) ;

  formBacklog:FormGroup = this.fb.group({
    titulo: [''],
    descricao:[''],
    responsavel:['Daniel Estrela'],
    integrantes:[''],
    dificuldade:[''],
    dataTermino:[''],
    prazo:this.fb.control({value:null,disabled:true}),
    status:[null]
  });
  dataCriacao:Date=new Date();
  edicao = false;


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) private data:any,private shared:SharedDataService,private dialog:MatDialogRef<DialogCriarBacklogComponent>) { }

  ngOnInit(): void {
    if(this.data?.projeto != null){
      this.edicao = true;
      this.dataCriacao = new Date(this.data.projeto.dataCriacao);
      this.formBacklog.patchValue({
        titulo:this.data.projeto.titulo,
        descricao:this.data.projeto.descricao,
        responsavel:this.data.projeto.responsavel,
        integrantes:this.data.projeto.integrantes.toString(),
        dataTermino:new Date(this.data.projeto.dataTermino),
        status:this.data.projeto.status,
        dificuldade:this.data.projeto.dificuldade,
        prazo:this.data.projeto.prazo,
      })
    }
  }

  calculatePrazo(){
    this.formBacklog.patchValue({
      prazo:Math.ceil((this.formBacklog.value.dataTermino.valueOf() - this.dataCriacao.valueOf())/ 86400000)
    }) 
  }

  print(){
    console.log(this.dataCriacao)
    const backlogEnvio:backlog = {
      titulo:this.formBacklog.value.titulo,
      descricao:this.formBacklog.value.descricao,
      responsavel:this.formBacklog.value.responsavel,
      integrantes:this.formBacklog.value.integrantes.split(','),
      dataTermino:this.formBacklog.value.dataTermino?._d?this.formBacklog.value.dataTermino._d.getTime():this.formBacklog.value.dataTermino,
      status:this.formBacklog.value.status,
      dificuldade:this.formBacklog.value.dificuldade,
      prazo:this.formBacklog.getRawValue().prazo, 
      sprintKey:this.data?.projeto?.sprintKey?this.data?.projeto?.sprintKey:this.data.key,
      dataCriacao:this.dataCriacao.getTime()
    };
    if(this.data?.projeto?.key != null){
      this.shared.updateBacklog(this.data?.projeto.key,backlogEnvio)
      this.shared.subFilterBacklog.next(null);
    }
    else{
      this.shared.createBacklog(backlogEnvio);
    }
    this.dialog.close()
  }
}
