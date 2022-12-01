import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService } from '../shared/shared-data.service';

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
    prazo:this.fb.control({value:null,disabled:true}),
    id:[]
  });
  dataCriacao:Date=new Date();


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) private data:any,private shared:SharedDataService,private dialog:MatDialogRef<DialogCreateProjectComponent>) { }

  ngOnInit(): void {

    if(this.data?.projeto != null){
      this.dataCriacao = this.data.projeto.dataCriacao;
      this.formProject.patchValue({
        nome:this.data.projeto.nome,
        descricao:this.data.projeto.descricao,
        responsavel:this.data.projeto.responsavel,
        integrantes:this.data.projeto.integrantes.toString(),
        dataTermino:this.data.projeto.dataTermino,
        prazo:Math.floor(((this.data.projeto.dataTermino.valueOf() + 86400000) - this.dataCriacao.valueOf())/ 86400000),
        id:this.data.projeto.id
      })
    }
    
  }

  calculatePrazo(){
    this.formProject.patchValue({
      prazo:Math.ceil((this.formProject.value.dataTermino.valueOf() - this.dataCriacao.valueOf())/ 86400000)
    }) 
  }

  print(){
    let projeto = this.formProject.value;
    projeto.integrantes = projeto.integrantes.split(',');
    if(projeto.id != null){
      const projetoAtual = this.shared.mockObj.filter((x:any)=>x.id == projeto.id)
      this.shared.mockFiltered.splice(this.shared.mockFiltered.indexOf((x:any)=>x.id==projeto.id),1);
      this.shared.mockObj.projeto.splice(this.shared.mockObj.projeto.indexOf((x:any)=>x.id==projeto.id),1);
      projeto = {...projeto, sprint:projetoAtual.sprint}
    }
    else{
      projeto.id = SharedDataService.newGuid();
      projeto = {...projeto, dataCriacao:this.dataCriacao}
    }
    this.shared.mockFiltered.push(projeto)
    this.shared.mockObj.projeto.push(projeto)
    this.shared.loginFilter();
    this.shared.updateObjects.next(null);
    this.dialog.close()
  }

}
