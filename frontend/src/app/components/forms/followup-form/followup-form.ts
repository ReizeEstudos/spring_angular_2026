import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../../model/Student';

@Component({
  selector: 'app-followup-form',
  imports: [ReactiveFormsModule],
  templateUrl: './followup-form.html',
  styleUrl: './followup-form.css',
})
export class FollowupForm {
  form = input.required<FormGroup>();
  students = input.required<Student[]>();
  toSave = output();
}
