import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedDataService } from '../shared/shared-data.service';

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
    id: [null]
  });
  dataCriacao: Date = new Date();


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private shared: SharedDataService, private dialog: MatDialogRef<DialogEditarSprintComponent>) { }

  ngOnInit(): void {

    if (this.data?.sprint != null) {
      this.formProject.patchValue({
        nome: this.data.sprint.nome,
        dataTermino: this.data.sprint.dataTermino,
        prazo: Math.ceil((this.data.sprint.dataTermino.valueOf() - this.dataCriacao.valueOf()) / 86400000),
        id: this.data.sprint.id
      })
      this.dataCriacao = this.data.sprint.dataCriacao;
    }

  }

  calculatePrazo() {
    this.formProject.patchValue({
      prazo: Math.ceil((this.formProject.value.dataTermino.valueOf() - this.dataCriacao.valueOf()) / 86400000)
    })
  }

  print() {
    let sprint = this.formProject.value;
    let projetoAtual: any;
    if (sprint?.id != null) {
      projetoAtual = this.shared.mockObj.projeto.filter((x: any) => x.id == this.data.id)
      let sprintAtual = projetoAtual[0].sprint.filter((x: any) => x.id == sprint.id)
      this.shared.mockFiltered.splice(this.shared.mockFiltered.indexOf((x: any) => x.id == this.data.id), 1);
      this.shared.mockObj.projeto.splice(this.shared.mockObj.projeto.indexOf((x: any) => x.id == this.data.id), 1);
      sprint[0] = { ...sprint, backlog: sprintAtual?.backlog }
      projetoAtual[0].sprint.splice(projetoAtual[0].sprint.indexOf((x: any) => x.id == sprint.id), 1);
      projetoAtual[0].sprint.push(sprint)
    }
    else {
      console.log(this.shared.mockFiltered, this.data.id)
      projetoAtual = this.shared.mockFiltered.filter((x: any) => x.id == this.data.id)
      projetoAtual[0] = { ...projetoAtual[0], sprint: [] }
      this.shared.mockFiltered.splice(this.shared.mockFiltered?.indexOf((x: any) => x.id == this.data.id), 1);
      this.shared.mockObj.projeto.splice(this.shared.mockObj.projeto.indexOf((x: any) => x.id == this.data.id), 1);
      sprint.id = SharedDataService.newGuid();
      sprint = { ...sprint, dataCriacao: this.dataCriacao }
      projetoAtual[0].sprint.push(sprint)

    }
    this.shared.mockFiltered.push(projetoAtual[0])
    this.shared.mockObj.projeto.push(projetoAtual[0])
    this.shared.loginFilter();
    this.shared.updateObjects.next(null);
    this.dialog.close()
  }
}
