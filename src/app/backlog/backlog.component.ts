import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';


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
  constructor(private fb:FormBuilder,private router:Router,private auth:AngularFireAuth) { }

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

  
  toLogin(){
    this.router.navigate(['/login']);
  }
}
