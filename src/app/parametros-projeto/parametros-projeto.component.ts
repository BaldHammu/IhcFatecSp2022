import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DialogCreateProjectComponent } from '../dialog-create-project/dialog-create-project.component';
import { DialogEditarSprintComponent } from '../dialog-editar-sprint/dialog-editar-sprint.component';
import { projeto, sprint } from '../project.models';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-parametros-projeto',
  templateUrl: './parametros-projeto.component.html',
  styleUrls: ['./parametros-projeto.component.scss']
})
export class ParametrosProjetoComponent implements OnInit {
  projetos:projeto[]=[];
  sprints:sprint[]=[];
  formSprint:FormGroup = this.fb.group({
    projeto:[null]
  })
  constructor(private shared:SharedDataService, private dialog:MatDialog,private fb:FormBuilder,private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.shared.getAllProjetos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.projetos = data.filter((x:any)=>x.responsavel == this.shared.usuarioLogado);
    });
  }

  
  edit(projeto:any){
    this.dialog.open(DialogCreateProjectComponent,{data:{projeto:projeto}})
  }
  novo(){
    this.dialog.open(DialogCreateProjectComponent)
  }
  deletar(projeto:any){
    this.shared.deleteProjetos(projeto.key)
  }
  deletarSprint(sprint:any){
    this.shared.deleteSprints(sprint.key)
  }
  filterObj(){
    this.shared.getAllSprints().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.sprints = data.filter((x:any)=>x.projectKey == this.formSprint.value.projeto);
    });
  }
  editSprint(sprint:any){
    console.log(this.formSprint.value.projeto)
    this.dialog.open(DialogEditarSprintComponent,{data:{sprint:sprint,key:this.formSprint.value.projeto}})
  }
  criarSprint(){
    this.dialog.open(DialogEditarSprintComponent,{data:{key:this.formSprint.value.projeto}})
  }


  get f(){return this.formSprint.value.projeto}
  
}
