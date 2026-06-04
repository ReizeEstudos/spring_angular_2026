import { Routes } from '@angular/router';
import { StudentPage } from './pages/student-page/student-page';
import { FollowupPage } from './pages/followup-page/followup-page';

export const routes: Routes = [
  { path: 'student', component: StudentPage },
  { path: 'followup', component: FollowupPage },
  { path: '', redirectTo: 'student', pathMatch: 'full' },
];
