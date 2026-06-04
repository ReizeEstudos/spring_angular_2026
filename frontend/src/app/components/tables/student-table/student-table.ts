import { Component, input, output } from '@angular/core';
import { Student } from '../../../model/Student';

@Component({
  selector: 'app-student-table',
  imports: [],
  templateUrl: './student-table.html',
  styleUrl: './student-table.css',
})
export class StudentTable {
  // Recebe a lista de alunos como um Signal de leitura
  students = input.required<Student[]>();

  // Método do componente pai que pede uma informação numérica
  toSelect = output<number>();

  // Método da classe para interagir com o método do componente pai
  select(index: number) {
    this.toSelect.emit(index);
  }
}
