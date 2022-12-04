import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from '../shared/shared-data.service';import { projeto } from '../project.models';
;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-create-project',
  templateUrl: './dialog-create-project.component.html',
  styleUrls: ['./dialog-create-project.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class DialogCreateProjectComponent implements OnInit {
  formProject:FormGroup = this.fb.group({
    nome: [''],
    descricao:[''],
    responsavel:[''],
    integrantes:[''],
    dataTermino:[''],
    prazo:this.fb.control({value:null,disabled:true})
  });
  dataCriacao:Date=new Date();
  edicao:boolean = false;


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) private data:any,private shared:SharedDataService,private dialog:MatDialogRef<DialogCreateProjectComponent>) { }

  ngOnInit(): void {
    if(this.data?.projeto != null){
      this.edicao = true;
      this.dataCriacao = new Date(this.data.projeto.dataCriacao);
      this.formProject.patchValue({
        nome:this.data.projeto.nome,
        descricao:this.data.projeto.descricao,
        responsavel:this.data.projeto.responsavel,
        integrantes:this.data.projeto.integrantes.toString(),
        dataTermino:new Date(this.data.projeto.dataTermino),
        prazo:this.data.projeto?.prazo?this.data.projeto.prazo:Math.floor(((this.data.projeto.dataTermino.valueOf() + 86400000) - this.dataCriacao.valueOf())/ 86400000),
      });
    }
  }

  calculatePrazo(){
    this.formProject.patchValue({
      prazo:Math.ceil((this.formProject.value.dataTermino.valueOf() - this.dataCriacao.valueOf())/ 86400000)
    }) 
  }

  print(){
    const projetoEnvio:projeto = {
      nome:this.formProject.value.nome,
      descricao:this.formProject.value.descricao,
      dataTermino:this.formProject.value.dataTermino?._d?this.formProject.value.dataTermino._d.getTime():this.formProject.value.dataTermino,
      dataCriacao: this.dataCriacao.getTime(),
      responsavel:this.shared.usuarioLogado,
      integrantes:this.formProject.value.integrantes.split(','),
      prazo:this.formProject.getRawValue().prazo,
    };
    if(this.data?.projeto.key != null){
      this.shared.updateProjetos(this.data?.projeto.key,projetoEnvio)
    }
    else{
      this.shared.createProjetos(projetoEnvio);
    }
    this.dialog.close()
  }

}
