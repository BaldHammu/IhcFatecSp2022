import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa.service';
import { PessoaDataService } from '../pessoa-data.service';

@Component({
  selector: 'app-edit-pessoas',
  templateUrl: './edit-pessoas.component.html',
  styleUrls: ['./edit-pessoas.component.scss']
})
export class EditPessoasComponent implements OnInit {

  pessoa!: Pessoa;
  key: string = '';

  constructor(private pessoaService: PessoaService, private pessoaDataService: PessoaDataService) { }

  ngOnInit(): void {
    this.pessoa = new Pessoa();
    this.pessoaDataService.currentPessoa.subscribe(data => {
      if (data.pessoa && data.key) {
        this.pessoa = new Pessoa();
        this.pessoa.ID_pessoa = data.pessoa.ID_pessoa;
        this.pessoa.Nome = data.pessoa.Nome;
        this.key = data.key;
      }
    })
  }

  onSubmit() {
    if (this.key) { 
      this.pessoaService.update(this.pessoa, this.key);
    } else {
      this.pessoaService.insert(this.pessoa);
    }

    this.pessoa = new Pessoa(); 
  }

}