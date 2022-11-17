import { Component } from '@angular/core';
import Pessoas from './dados/scrumDados.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ihc2022';
  public pessoaList:{}[] = Pessoas;
}
