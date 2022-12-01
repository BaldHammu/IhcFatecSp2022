import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  MY_FORMATS } from '../dialog-create-project/dialog-create-project.component';
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
    id:[null],
    status:[null]
  });
  dataCriacao:Date=new Date();


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) private data:any,private shared:SharedDataService,private dialog:MatDialogRef<DialogCriarBacklogComponent>) { }

  ngOnInit(): void {

    if(this.data?.projeto != null){
      this.formBacklog.patchValue({
        titulo:this.data.projeto.titulo,
        descricao:this.data.projeto.descricao,
        responsavel:this.data.projeto.responsavel,
        integrantes:this.data.projeto.integrantes.toString(),
        dataTermino:this.data.projeto.dataTermino,
        status:this.data.projeto.status,
        dificuldade:this.data.projeto.dificuldade,
        prazo:Math.floor(((this.data.projeto.dataTermino.valueOf() + 86400000) - this.dataCriacao.valueOf())/ 86400000),
        id:this.data.projeto.id
      })
    }
    
  }

  calculatePrazo(){
    this.formBacklog.patchValue({
      prazo:Math.ceil((this.formBacklog.value.dataTermino.valueOf() - this.dataCriacao.valueOf())/ 86400000)
    }) 
  }

  print(){
    let backlog = this.formBacklog.value;
    backlog.integrantes = backlog.integrantes.split(',');
    let sprint = this.shared.projetoAtual[0].sprint.filter((x:any)=>x.id==this.data.id)
    if(backlog.id != null){
      this.shared.projetoAtual[0].sprint.splice(this.shared.projetoAtual[0].sprint.indexOf((x:any)=>x.id==this.data.id),1);  
    }
    else{
      backlog.id = SharedDataService.newGuid();
    }
    if(sprint[0]?.backlog?.length>=0){
      sprint[0]?.backlog?.push(backlog)
    }
    else{
      console.log(sprint)
      sprint[0] = {...sprint[0],backlog:[backlog]}
    }
    if(this.shared.projetoAtual[0]?.sprint?.lenghth >=0){
      this.shared.projetoAtual[0].sprint.push(sprint)
    }
    else{
      this.shared.projetoAtual[0] = {...this.shared.projetoAtual[0],sprint}
    }
    this.shared.updateObjects.next(null);
    this.dialog.close()
  }
}
