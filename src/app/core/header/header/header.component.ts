import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menu : EventEmitter<null> = new EventEmitter<null>()
  @Input() showMenu:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    this.menu.emit(null);
  }

}
