import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogCriarBacklogComponent } from '../dialog-criar-backlog/dialog-criar-backlog.component';
import { SharedDataService, Status } from '../shared/shared-data.service';
import { backlog } from '../project.models';
import { map } from 'rxjs';
import { DialogCardGraphComponent } from '../dialog-card-graph/dialog-card-graph.component';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  backlog:backlog[] = [];
  constructor(private fb:FormBuilder,private router:Router,private auth:AngularFireAuth, private dialog:MatDialog, private shared:SharedDataService) { }

  ngOnInit(): void {
    this.shared.subFilterBacklog.subscribe(()=>{
      this.getBacklog()
    })
  }


get f(){
  return 
} 

getBacklog() {
  this.shared.getAllBacklog().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe((data:any) => {
    this.backlog = data.filter((x: any) => x.sprintKey == this.shared.sprintAtual);
  });
}

openDialog(tarefa:any){
  this.dialog.open(DialogCardGraphComponent,{data:{backlog:tarefa}, maxHeight:`80vh`,maxWidth:`90vw`})
}
  
toLogin(){
   this.router.navigate(['/login']);
}

  get planejando(){return this.backlog.filter((x:any)=>x.status==Status.Planejando)}
  get selecionado(){return this.backlog.filter((x:any)=>x.status==Status.Selecionado)}
  get executando(){return this.backlog.filter((x:any)=>x.status==Status.Executando)}
  get entregue(){return this.backlog.filter((x:any)=>x.status==Status.Entregue)}
}
