import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedDataService, Status } from '../shared/shared-data.service';

@Component({
  selector: 'app-dialog-card-graph',
  templateUrl: './dialog-card-graph.component.html',
  styleUrls: ['./dialog-card-graph.component.scss']
})
export class DialogCardGraphComponent implements OnInit {
  dataCriacao:Date = new Date();
  prazo:number=0;
  status:any = Object.keys(Status);
  switchBacklog:boolean = false;
  formBacklog:FormGroup =  this.fb.group({
    status:[''],
    descricao:[''],
  });
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) private data:any, private shared:SharedDataService,private dialog:MatDialogRef<DialogCardGraphComponent>) { }

  ngOnInit(): void {
    if(this.data?.backlog != null){
      this.switchBacklog = this.data?.switch?this.data?.switch:false;
      this.dataCriacao = new Date(this.data.backlog.dataCriacao);
      this.formBacklog.patchValue({
        status:this.data.backlog.status,
        descricao:this.data.backlog.descricao
      });
      this.prazo = this.data.backlog.prazo
    }
  }
  
  sendBacklog(){
    const backlog = {
      ...this.data.backlog,
      status:this.formBacklog.value.status,
      descricao: this.formBacklog.value.descricao
    };
    if(!this.switchBacklog){
      this.shared.updateBacklog(this.data.backlog.key,backlog);
    }
    else{
      this.shared.updateArtefato(this.data.backlog.key,backlog);
    }
    this.shared.subFilterBacklog.next(null);
    this.dialog.close()
  }

  deleteBacklog(){
    if(!this.switchBacklog){
      this.shared.deleteBacklog(this.data.backlog.key);
    }
    else{
      this.shared.deleteArtefato(this.data.backlog.key);
    }
    this.shared.subFilterBacklog.next(null);
    this.dialog.close()
  }

}
