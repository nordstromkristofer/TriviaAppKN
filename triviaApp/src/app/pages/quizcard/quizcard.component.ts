import { Component, OnInit } from '@angular/core';
import { QuizQuestion } from '../../services/quiz-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session-service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-quiz-card',
  templateUrl: './quizcard.component.html',
  styleUrls: ['./quizcard.component.css']
})
export class QuizCardComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  currentIndex: number = 0;
  currentQuestion: QuizQuestion | undefined;
  selectedAnswer: string | undefined;
  userAnswers: (string | undefined)[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = window.history.state;
      this.quizQuestions = state?.quizQuestions || [];
      this.currentIndex = state?.currentIndex || 0;

      this.currentQuestion = this.quizQuestions[this.currentIndex];

      console.log('Quiz Questions:', this.quizQuestions);
      console.log('Current Index:', this.currentIndex);
      console.log('Current Question:', this.currentQuestion);
    });
  }

  selectAnswer(answer: string | undefined): void {
    if (answer) {
      this.selectedAnswer = answer;
      console.log('Selected answer:', answer);
      // Additional logic if needed
    }
  }

  toggleAnswer(answer: string | undefined): void {
    if (this.selectedAnswer === answer) {
      this.selectedAnswer = undefined;
    } else {
      this.selectedAnswer = answer;
    }
  }

  nextQuestion(): void {
    if (this.currentIndex < this.quizQuestions.length - 1) {
      // Store user answer
      this.userAnswers[this.currentIndex] = this.selectedAnswer;
      // Go to the next question
      this.currentIndex++;
      this.currentQuestion = this.quizQuestions[this.currentIndex];
      this.selectedAnswer = undefined;
    } else {
      // End of quiz
      console.log('End of quiz');
      // Store user answer for the last question
      this.userAnswers[this.currentIndex] = this.selectedAnswer;
      // Navigate to the result page
      this.router.navigate(['/result'], { state: { userAnswers: this.userAnswers } });
    }
  }
}
