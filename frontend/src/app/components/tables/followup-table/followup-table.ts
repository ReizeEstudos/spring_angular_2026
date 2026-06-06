import { Component, computed, input, output, signal } from '@angular/core';
import { FollowUp } from '../../../model/FollowUp';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-followup-table',
  imports: [DatePipe, FormsModule],
  templateUrl: './followup-table.html',
  styleUrl: './followup-table.css',
})
export class FollowupTable {
  // Vetor contendo todos os acompanhamentos
  data = input.required<FollowUp[]>();

  // Função remover que está no componente pai
  toRemove = output<string>();

  // Informar o termo para realizar a filtragem
  searchTerm = signal<string>('');

  // Função de filtragem
  filterData = computed(() => {
    // Extrair o termo da busca, deixar todas as letras minúsculas e remover os espaçamentos
    const text = this.searchTerm().toLowerCase().trim();

    // Caso a constante texto esteja vazia
    if (!text) return this.data();

    // Realizar a filtragem
    return this.data().filter((item) => item.student?.name?.toLowerCase().includes(text));
  });
}
