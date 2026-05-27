import { Component, computed, OnInit, signal } from '@angular/core';
import { StudentService } from '../service/student-service';
import { Student } from '../model/Student';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  btnInsert = signal(true);

  vetor = signal<Student[]>([]);

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    grade1: new FormControl<number | null>(null),
    grade2: new FormControl<number | null>(null),
  });

  constructor(private service: StudentService) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.service.list().subscribe((res) => this.vetor.set(res));
  }

  selectStudent(index: number): void {
    this.form.patchValue(this.vetor()[index]);
    this.btnInsert.set(false);
  }
}
