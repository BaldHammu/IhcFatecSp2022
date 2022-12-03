import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogCriarBacklogComponent } from 'src/app/dialog-criar-backlog/dialog-criar-backlog.component';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {
  formCore:FormGroup = this.fb.group({
    sprint:[null]
  })
  sprints:any;
  constructor(private route:ActivatedRoute, private dialog:MatDialog, private shared:SharedDataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
createBacklog(){
  console.log(this.sprints)
  this.dialog.open(DialogCriarBacklogComponent,{data:{id:this.formCore.value.sprint}, maxHeight:`80vh`,maxWidth:`90vw`})
}

get backlog(){return !this.route.component?.name.includes('Sprint')}

get enable(){return this.formCore.value.sprint != null}

filterObj(){
  console.log(this.sprints)
}
}

