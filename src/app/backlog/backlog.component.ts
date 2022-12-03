import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogCriarBacklogComponent } from '../dialog-criar-backlog/dialog-criar-backlog.component';
import { SharedDataService, Status } from '../shared/shared-data.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  sprints:any=[];
  backlog:any;
  constructor(private fb:FormBuilder,private router:Router,private auth:AngularFireAuth, private dialog:MatDialog, private shared:SharedDataService) { }

  ngOnInit(): void {
  
  }


get f(){
  return 
} 

openDialog(tarefa:any){
  this.dialog.open(DialogCriarBacklogComponent,{data:{projeto:tarefa}, maxHeight:`80vh`,maxWidth:`90vw`})
}
  
toLogin(){
   this.router.navigate(['/login']);
}

  get planejando(){if(this.backlog?.sprint[0]?.backlog?.length >=0)return this.backlog?.sprint[0]?.backlog?.filter((x:any)=>x.status==Status.Planejando)}
  get selecionado(){if(this.backlog?.sprint[0]?.backlog?.length >=0)return this.backlog?.sprint[0]?.backlog?.filter((x:any)=>x.status==Status.Selecionado)}
  get executando(){if(this.backlog?.sprint[0]?.backlog?.length >=0)return this.backlog?.sprint[0]?.backlog?.filter((x:any)=>x.status==Status.Executando)}
  get entregue(){if(this.backlog?.sprint[0]?.backlog?.length >=0)return this.backlog?.sprint[0]?.backlog?.filter((x:any)=>x.status==Status.Entregue)}
}
