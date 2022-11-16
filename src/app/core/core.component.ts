import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core-component',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  openClose:boolean = false;

  constructor(private Router:Router) { }

  ngOnInit(): void {
  }

  openDrawer(){
    this.openClose = !this.openClose;
  }
  clickLink(link:string){
    this.Router.navigate([link]);
  }
  
}