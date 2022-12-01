import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateProjectComponent } from '../dialog-create-project/dialog-create-project.component';
import { DialogEditarSprintComponent } from '../dialog-editar-sprint/dialog-editar-sprint.component';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-parametros-projeto',
  templateUrl: './parametros-projeto.component.html',
  styleUrls: ['./parametros-projeto.component.scss']
})
export class ParametrosProjetoComponent implements OnInit {
  projetos:any=[];
  projetoSelecionado:any=[];
  formSprint:FormGroup = this.fb.group({
    projeto:[null]
  })
  constructor(private shared:SharedDataService, private dialog:MatDialog,private fb:FormBuilder,private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
   this.projetos = this.shared.mockFiltered;
   this.shared.updateObjects.subscribe(()=>{
   this.projetos = this.shared.mockFiltered;
   if(this.formSprint.value.projeto != null ){
     this.projetoSelecionado = this.projetos.filter((x:any)=>x.id == this.formSprint.value.projeto)
     this.projetoSelecionado = this.projetoSelecionado[0];
    }});
  }

  
  edit(projeto:any){
    this.dialog.open(DialogCreateProjectComponent,{data:{projeto:projeto}})
  }
  novo(){
    this.dialog.open(DialogCreateProjectComponent)
  }
  deletar(projeto:any){
    this.shared.mockFiltered.splice(this.shared.mockFiltered.indexOf((x:any)=>x.id==projeto.id),1);
    this.shared.mockObj.projeto.splice(this.shared.mockObj.projeto.indexOf((x:any)=>x.id==projeto.id),1);
  }
  filterObj(){
    this.projetoSelecionado = this.projetos.filter((x:any)=>x.id == this.formSprint.value.projeto);
    this.projetoSelecionado = this.projetoSelecionado[0];
  }
  editSprint(sprint:any){
    this.dialog.open(DialogEditarSprintComponent,{data:{sprint:sprint,id:this.formSprint.value.projeto}})
  }
  criarSprint(){
    this.dialog.open(DialogEditarSprintComponent,{data:{id:this.formSprint.value.projeto}})
  }


  get f(){return this.formSprint.value.projeto}
  
}
