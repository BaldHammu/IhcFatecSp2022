import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardGraphComponent } from '../dialog-card-graph/dialog-card-graph.component';
import { SharedDataService } from '../shared/shared-data.service';
import { map } from 'rxjs';
import { artefato, backlog, sprint } from '../project.models';


@Component({
  selector: 'app-backlog-sprint',
  templateUrl: './backlog-sprint.component.html',
  styleUrls: ['./backlog-sprint.component.scss']
})
export class BacklogSprintComponent implements OnInit {
  sprintBacklog: backlog[]=[];
  constructor(private fb: FormBuilder, private router: Router, private auth: AngularFireAuth, private dialog: MatDialog, private shared: SharedDataService) { }

  ngOnInit(): void {
    this.shared.subFilterBacklog.subscribe(()=>{
      this.getSprintBacklog();
    })
  }


  get f() {
    return
  }

  openDialog(tarefa:any) {
    this.dialog.open(DialogCardGraphComponent,{data:{backlog:tarefa}, maxHeight:`80vh`,maxWidth:`90vw`})
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  getSprintBacklog() {
    this.shared.getAllBacklog().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
      this.sprintBacklog = data.filter((x: any) => x.sprintKey == this.shared.sprintAtual);

    });
    this.shared.getAllArtefato().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: artefato[]) => {
      for(let backlog of this.sprintBacklog){
        backlog.artefatos = data.filter((x:any)=>x.backlogKey == backlog.key)
      }

    });
  }

}
