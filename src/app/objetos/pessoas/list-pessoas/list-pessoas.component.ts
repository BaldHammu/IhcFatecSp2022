import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa.service';
import { PessoaDataService } from '../pessoa-data.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-list-pessoas',
  templateUrl: './list-pessoas.component.html',
  styleUrls: ['./list-pessoas.component.scss']
})
export class ListPessoasComponent implements OnInit {
  pessoas!: Observable<any>;

  constructor(private pessoaService: PessoaService, private pessoaDataService: PessoaDataService) { }

  ngOnInit(): void {
    this.pessoas = this.pessoaService.getAll();
  }

  delete(key: string) {
    this.pessoaService.delete(key);
  }

  edit(pessoa: Pessoa, key: string){
    this.pessoaDataService.changePessoa(pessoa,key)
  }

}