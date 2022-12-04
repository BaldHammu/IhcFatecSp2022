import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { projeto } from '../project.models';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-core-component',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  projetos:projeto[]=[];
  formCore:FormGroup = this.fb.group({
    projeto:['']
  })
  openClose:boolean = false;

  constructor(private Router:Router,private shared:SharedDataService,private fb:FormBuilder) { }

  ngOnInit(): void {
    console.log(this.activedRoute)
    this.shared.subFilterProject.subscribe(()=>{
      this.loadProjects();
    })
  }

  loadProjects(){
    this.shared.getAllProjetos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.projetos = data.filter((x:any)=>x.responsavel == this.shared.usuarioLogado);
    });
  }

  openDrawer(){
    this.openClose = !this.openClose;
  }
  clickLink(link:string){
    this.Router.navigate([link]);
  }
  filterObj(){
    this.shared.projetoAtual = this.formCore.value.projeto
    this.shared.subFilterBacklog.next(null);
  }
  get activedRoute(){ return this.Router.url == '/login' || this.Router.url == '/registrar-se' }
}