import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  imports: [],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm {
  // Propriedades
  formStudent = input.required<FormGroup>(); //input é quando o componente pai disponibiliza uma informação ao componente filho,comunicação de via unica
  visibilityBtn = input<boolean>(true);

  // Funções
  //output é quando o componente pai espera que o componente filho chame alguma função/método/ação
  toInsert = output();
  toUpdate = output();
  toRemove = output();
  toCancel = output();
}
