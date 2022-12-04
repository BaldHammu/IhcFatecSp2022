import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DialogCriarBacklogArtefato } from 'src/app/dialog-criar-artefato/dialog-criar-artefato.component';
import { DialogCriarBacklogComponent } from 'src/app/dialog-criar-backlog/dialog-criar-backlog.component';
import { sprint } from 'src/app/project.models';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {
  formCore: FormGroup = this.fb.group({
    sprint: [null]
  })
  sprints: sprint[] = [];
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private shared: SharedDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.shared.subFilterBacklog.subscribe(() => {
      this.getSprintFilter();
    })
  }

  createBacklog() {
    if(this.backlog){
      this.dialog.open(DialogCriarBacklogComponent, { data: { key: this.formCore.value.sprint }, maxHeight: `80vh`, maxWidth: `90vw` })
    }
    else{
      this.dialog.open(DialogCriarBacklogArtefato, { data: { key: this.formCore.value.sprint }, maxHeight: `80vh`, maxWidth: `90vw` })
    }
  }
  getSprintFilter() {
    this.shared.getAllSprints().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.sprints = data.filter((x: any) => x.projectKey == this.shared.projetoAtual);
    });
  }

  get backlog() { return !this.route.component?.name.includes('Sprint') }

  get enable() { return this.formCore.value.sprint != null }

  filterObj() {
    this.shared.sprintAtual = this.formCore.value.sprint;
    this.shared.subFilterBacklog.next(null);
  }
}

