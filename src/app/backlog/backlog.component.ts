import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardGraphComponent } from '../dialog-card-graph/dialog-card-graph.component';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  registerForm:FormGroup = this.fb.group({
  email: ['',[Validators.required,Validators.email]],
  senha: ['',Validators.required],
  confirmarSenha:['',Validators.required]
  })
  constructor(private fb:FormBuilder,private router:Router,private auth:AngularFireAuth, private dialog:MatDialog) { }

  ngOnInit(): void {
  }
 
registerUser(){
  if(this.f.senha===this.f.confirmarSenha){
    this.auth.createUserWithEmailAndPassword(this.f.email,this.f.senha)
    .then((credentials)=>console.log(credentials))
    .catch((err)=>console.log(err))

  }
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
