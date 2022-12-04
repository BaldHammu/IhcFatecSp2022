import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedDataService } from '../shared/shared-data.service';
import { sprint } from '../project.models'

@Component({
  selector: 'app-dialog-editar-sprint',
  templateUrl: './dialog-editar-sprint.component.html',
  styleUrls: ['./dialog-editar-sprint.component.scss']
})
export class DialogEditarSprintComponent implements OnInit {

  formProject: FormGroup = this.fb.group({
    nome: [''],
    dataTermino: [''],
    prazo: this.fb.control({ value: null, disabled: true }),
  });
  dataCriacao: Date = new Date();
  edicao = false;


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private shared: SharedDataService, private dialog: MatDialogRef<DialogEditarSprintComponent>) { }

  ngOnInit(): void {

    if (this.data?.sprint != null) {
      this.edicao = true;
      this.dataCriacao = new Date(this.data.sprint.dataCriacao);
      this.formProject.patchValue({
        nome: this.data.sprint.nome,
        dataTermino: new Date(this.data.sprint.dataTermino),
        prazo:this.data.sprint.prazo,
        id: this.data.sprint.id
      })
    }

  }

  calculatePrazo() {
    this.formProject.patchValue({
      prazo: Math.ceil((this.formProject.value.dataTermino.valueOf() - this.dataCriacao.valueOf()) / 86400000)
    })
  }

  print() {
    const sprint:sprint = {
      nome:this.formProject.value.nome,
      dataCriacao:this.dataCriacao.getTime(),
      dataTermino:this.formProject.value.dataTermino?._d?this.formProject.value.dataTermino._d.getTime():this.formProject.value.dataTermino.getTime(),
      prazo:this.formProject.getRawValue().prazo,
      projectKey: this.data.key
    }
    if(this.data?.sprint?.key != null){
      this.shared.updateSprints(this.data.sprint.key,sprint)
    }
    else{
      this.shared.createSprints(sprint)
    }
    console.log(sprint)
    this.dialog.close()
  }
}
