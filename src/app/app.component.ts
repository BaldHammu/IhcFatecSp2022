import { Component } from '@angular/core';
import dados from './dados/scrumDados.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ihc2022';

  public pessoas:{
    ID_pessoa: number;
    Nome: string;
  }[] = dados['Pessoas'];

  public projetos:{
    ID_projeto: number;
    Nome: string;
    Descricao: string;
    Data_inicio: string;
    Data_entrega: string;
  }[] = dados['Projetos']

  public sprints:{
    ID_sprint: number;
    ID_projeto: number;
    Descricao: string;
    Data_inicio: string;
    Data_fim: string;
  }[] = dados['Sprints']

  public roles:{
    ID_role: number;
    Descricao: string;
  }[] = dados['Roles']

  public alocacoes:{
    ID_projeto: number;
    ID_pessoa: number;
    Role: number;
  }[] = dados['Alocacoes']

  public statustarefas:{
    ID_status: number;
    Descricao: string;
  }[] = dados['StatusTarefas']

  public tarefas:{
    ID_tarefa: number;
    ID_sprint: number;
    Descricao: string;
    Status: number;
    Data_inicio: string;
    Data_fim: string;
  }[] = dados['Tarefas']

  public execucoes:{
    ID_pessoa: number;
    ID_projeto: number;
    ID_tarefa: number;
  }[] = dados['Execucoes']

}
