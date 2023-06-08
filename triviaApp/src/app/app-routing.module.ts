import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizFormComponent } from './pages/quiz-form/quiz-form.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizCardComponent } from './pages/quizcard/quizcard.component';
import { ResultpageComponent } from './pages/resultpage/resultpage/resultpage.component';

const routes: Routes = [
  { path: 'quiz', component: QuizCardComponent },
  { path: '', component: QuizFormComponent },
  { path: 'result', component: ResultpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }