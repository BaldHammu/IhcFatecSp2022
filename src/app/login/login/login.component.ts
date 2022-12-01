import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    senha: ['',Validators.required]
  })
  constructor(private fb:FormBuilder, private router:Router,private auth:AngularFireAuth,private shared:SharedDataService) { }

  ngOnInit(): void {
  }

  toRegister(){
    this.router.navigate([`/registrar-se`])
  }

  authenticateUser(){
    this.auth.signInWithEmailAndPassword(this.f.email,this.f.senha)
    .then((credential)=>{
      this.shared.usuarioLogado=this.f.email;
      this.shared.loginFilter();
      this.router.navigate(['/backlog']);
    })
    .catch((err)=>console.log(err))
  }

  get f(){ return this.loginForm.value}
}
