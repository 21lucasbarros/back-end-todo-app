import { Component } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TODOapp';
  apiURL: string = 'http://localhost:3000';
  usuarioLogado = false;
  tokenJWT = '{ "token":""}';
  arrayDeTarefas: Tarefa[] = [];
  mostrarErro = false;

  constructor(private service: HttpClient) {
    this.READ_tarefas();
  }

  READ_tarefas() {
    const idToken = new HttpHeaders().set(
      'id-token',
      JSON.parse(this.tokenJWT).token
    );
    this.service
      .get<Tarefa[]>(`${this.apiURL}/api/getAll`, { headers: idToken })
      .subscribe(
        (resultado) => {
          this.arrayDeTarefas = resultado;
          this.usuarioLogado = true;
        },
        (error) => {
          this.usuarioLogado = false;
        }
      );
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    if (!descricaoNovaTarefa || descricaoNovaTarefa.trim() === '') {
      this.mostrarErro = true;
      return;
    }

    this.mostrarErro = false;
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.service
      .post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaASerRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.service
      .delete<Tarefa>(`${this.apiURL}/api/delete/${id}`)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.service
      .patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }

  login(username: string, password: string) {
    var credenciais = { nome: username, senha: password };
    this.service
      .post(`${this.apiURL}/api/login`, credenciais)
      .subscribe((resultado) => {
        this.tokenJWT = JSON.stringify(resultado);
        this.READ_tarefas();
      });
  }
}
