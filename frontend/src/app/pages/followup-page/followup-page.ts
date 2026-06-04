import { Component, OnInit, signal } from '@angular/core';
import { FollowupForm } from '../../components/forms/followup-form/followup-form';
import { FollowupTable } from '../../components/tables/followup-table/followup-table';
import { Student } from '../../model/Student';
import { FollowUp } from '../../model/FollowUp';
import { FormControl, FormGroup } from '@angular/forms';
import { FollowupService } from '../../service/followup-service';

@Component({
  selector: 'app-followup-page',
  imports: [FollowupForm, FollowupTable],
  templateUrl: './followup-page.html',
  styleUrl: './followup-page.css',
})
export class FollowupPage implements OnInit {
  vetorStudent = signal<Student[]>([]);

  vetorFollowUp = signal<FollowUp[]>([]);

  form = new FormGroup({
    date: new FormControl(new Date().toISOString().split('T')[0]),
    text: new FormControl(''),
    studentId: new FormControl(''),
  });

  // Construtor
  constructor(private followUpService: FollowupService) {}

  // Executa ao carregar o componente
  ngOnInit() {
    this.followUpService.listStudents().subscribe((res) => this.vetorStudent.set(res));

    this.followUpService.listFollowUps().subscribe((res) => this.vetorFollowUp.set(res));
  }

  insert() {
    this.followUpService.insert(this.form.value as any).subscribe((newList) => {
      this.vetorFollowUp.update((list) => [...list, newList]);
      this.form.reset({ date: new Date().toISOString().split('T')[0], text: '', studentId: '' });
    });
  }

  // Remover acompanhamento
  remove(id: string) {
    this.followUpService.remove(id).subscribe(() => {
      this.vetorFollowUp.update((list) => list.filter((a) => a.id !== id));
    });
  }
}
