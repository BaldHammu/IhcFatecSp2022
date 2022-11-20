import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardGraphComponent } from '../dialog-card-graph/dialog-card-graph.component';


@Component({
  selector: 'app-backlog-sprint',
  templateUrl: './backlog-sprint.component.html',
  styleUrls: ['./backlog-sprint.component.scss']
})
export class BacklogSprintComponent implements OnInit {
  registerForm:FormGroup = this.fb.group({
  email: ['',[Validators.required,Validators.email]],
  senha: ['',Validators.required],
  confirmarSenha:['',Validators.required]
  })
  constructor(private fb:FormBuilder,private router:Router,private auth:AngularFireAuth, private dialog:MatDialog) { }

  ngOnInit(): void {
  }


get f(){
  return this.registerForm.value
} 

openDialog(){
  this.dialog.open(DialogCardGraphComponent)
}
  
  toLogin(){
    this.router.navigate(['/login']);
  }
}
