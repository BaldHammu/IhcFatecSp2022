import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-core-component',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  projetos:any=[];
  formCore:FormGroup = this.fb.group({
    projeto:[null]
  })
  openClose:boolean = false;

  constructor(private Router:Router,private shared:SharedDataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  openDrawer(){
    this.openClose = !this.openClose;
  }
  clickLink(link:string){
    this.Router.navigate([link]);
  }
  filterObj(){
  }
  
}