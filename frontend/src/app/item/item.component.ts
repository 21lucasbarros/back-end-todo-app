import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  emEdicao = false;
  mostrarErro = false;
  @Input() tarefa: Tarefa = new Tarefa('', false);
  @Output() removerTarefa = new EventEmitter<Tarefa>();
  @Output() modificaTarefa = new EventEmitter();

  onRemoverTarefa() {
    this.removerTarefa.emit(this.tarefa);
  }

  salvarEdicao(editedValue: string) {
    const valorEditado = editedValue.trim();
    if (valorEditado) {
      this.tarefa.descricao = valorEditado;
      this.emEdicao = false;
      this.modificaTarefa.emit();
    } else {
      this.mostrarErro = true;
    }
  }

  cancelarEdicao() {
    this.emEdicao = false;
    this.mostrarErro = false;
  }
}
