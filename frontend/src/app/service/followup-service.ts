import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowUp } from '../model/FollowUp';
import { Student } from '../model/Student';
import { FollowUpInsertDTO } from '../model/FollowUp-Insert-DTO';

@Injectable({
  providedIn: 'root',
})
export class FollowupService {
  private readonly API_FollowUp = 'http://localhost:8080/api/followups';
  private readonly API_Students = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  listFollowUps(): Observable<FollowUp[]> {
    return this.http.get<FollowUp[]>(`${this.API_FollowUp}/list`);
  }

  listStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_Students}/list`);
  }

  insert(dto: FollowUpInsertDTO): Observable<FollowUp> {
    return this.http.post<FollowUp>(`${this.API_FollowUp}/insert`, dto);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_FollowUp}/remove/${id}`);
  }
}
