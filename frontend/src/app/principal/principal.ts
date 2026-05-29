import { Component, computed, OnInit, signal } from '@angular/core';
import { StudentService } from '../service/student-service';
import { Student } from '../model/Student';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  imports: [ReactiveFormsModule],
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
    const student = this.vetor()[index]
    this.form.patchValue({
      id: student.id ?? '',
      name: student.name ?? '',
      grade1: student.grade1 != null ? Number(student.grade1) : null,
      grade2: student.grade2 != null ? Number(student.grade2) : null,});
    this.btnInsert.set(false);
  }

  cancel(): void {
    this.form.reset();
    this.btnInsert.set(true);
  }

  insert(): void {
    this.service.insert(this.form.value as Student).subscribe((student) => {
      this.vetor.update((students) => [...students, student]);
      this.form.reset();
    });
  }

  update(): void {
    this.service.update(this.form.value as Student).subscribe((studentUpdated) => {
      this.vetor.update((students) =>
        students.map((student) => (student.id === studentUpdated.id ? studentUpdated : student)),
      );
      this.cancel();
    });
  }
}
