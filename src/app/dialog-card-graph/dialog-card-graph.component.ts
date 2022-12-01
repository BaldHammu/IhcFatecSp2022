import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-card-graph',
  templateUrl: './dialog-card-graph.component.html',
  styleUrls: ['./dialog-card-graph.component.scss']
})
export class DialogCardGraphComponent implements OnInit {
  data:Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
