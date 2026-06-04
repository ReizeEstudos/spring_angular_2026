import { StudentService } from './../../service/student-service';
import { Component, OnInit, signal } from '@angular/core';
import { StudentForm } from '../../components/forms/student-form/student-form';
import { StudentTable } from '../../components/tables/student-table/student-table';
import { Student } from '../../model/Student';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-page',
  imports: [StudentForm, StudentTable],
  templateUrl: './student-page.html',
  styleUrl: './student-page.css',
})
export class StudentPage implements OnInit {
  btnInsert = signal(true);

  vetor = signal<Student[]>([]);

  formStudent = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    grade1: new FormControl<number | null>(null),
    grade2: new FormControl<number | null>(null),
  });

  // Construtor
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.studentService.list().subscribe((res) => this.vetor.set(res));
  }

  selectStudent(index: number): void {
    const selectedStudent = this.vetor()[index];

    this.formStudent.patchValue(selectedStudent);

    this.btnInsert.set(false);
  }

  cancel(): void {
    this.formStudent.reset();

    this.btnInsert.set(true);
  }

  insert(): void {
    this.studentService.insert(this.formStudent.value as Student).subscribe((student) => {
      this.vetor.update((students) => [...students, student]);
      this.formStudent.reset();
    });
  }

  update(): void {
    this.studentService.update(this.formStudent.value as Student).subscribe((studentUpdated) => {
      this.vetor.update((students) =>
        students.map((student) => (student.id === studentUpdated.id ? studentUpdated : student)),
      );
      this.cancel();
    });
  }

  remove(): void {
    const id = this.formStudent.value.id;

    this.studentService.delete(id!).subscribe(() => {
      this.vetor.update((students) => students.filter((student) => student.id !== id));
      this.cancel();
    });
  }
}
