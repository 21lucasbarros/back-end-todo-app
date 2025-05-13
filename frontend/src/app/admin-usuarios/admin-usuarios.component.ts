import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-usuarios',
  standalone: false,
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css'],
})
export class AdminUsuariosComponent implements OnInit {
  @Output() fecharModal = new EventEmitter<void>();

  apiURL = 'http://localhost:3000/api';
  usuarios: any[] = [];
  novoUsuario = { nome: '', senha: '', admin: false };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  getHeaders(): HttpHeaders {
    const token = JSON.parse(
      localStorage.getItem('tokenJWT') || '{"token": ""}'
    ).token;
    return new HttpHeaders({ 'id-token': token });
  }

  carregarUsuarios() {
    this.http
      .get<any[]>(`${this.apiURL}/users`, { headers: this.getHeaders() })
      .subscribe((res) => (this.usuarios = res));
  }

  criarUsuario() {
    this.http
      .post(`${this.apiURL}/users`, this.novoUsuario, {
        headers: this.getHeaders(),
      })
      .subscribe(() => {
        this.carregarUsuarios();
        this.novoUsuario = { nome: '', senha: '', admin: false };
      });
  }

  salvarUsuario(usuario: any) {
    this.http
      .patch(`${this.apiURL}/users/${usuario._id}`, usuario, {
        headers: this.getHeaders(),
      })
      .subscribe(() => this.carregarUsuarios());
  }

  deletarUsuario(id: string) {
    this.http
      .delete(`${this.apiURL}/users/${id}`, { headers: this.getHeaders() })
      .subscribe(() => this.carregarUsuarios());
  }

  closeAdminPanel(event: MouseEvent) {
    event.stopPropagation();
    this.fecharModal.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    this.fecharModal.emit();
  }
}
