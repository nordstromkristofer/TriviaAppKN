import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizFormComponent } from './pages/quiz-form/quiz-form.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'qform', component: QuizFormComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }