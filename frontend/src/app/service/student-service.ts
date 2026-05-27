import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from '../model/Student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // URL base definida no seu @RequestMapping("/api/alunos")
  private readonly API = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  list(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API}/list`);
  }

  insert(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.API}/insert`, student);
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.API}/update/${student.id}`, student);
  }

  delete(id: string): Observable<Student> {
    return this.http.delete<Student>(`${this.API}/delete/${id}`);
  }
}
