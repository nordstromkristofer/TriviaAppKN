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

      const sessionToken = this.sessionService.getSessionToken();
      if (sessionToken) {
        // Use the existing session token
        this.fetchQuestionsWithToken(sessionToken);
      } else {
        // Fetch new session token
        this.fetchSessionToken();
      }
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
      this.currentIndex++;
      this.currentQuestion = this.quizQuestions[this.currentIndex];
      this.selectedAnswer = undefined;
    } else {
      // End of quiz
      console.log('End of quiz');
      // You can perform additional actions here, such as displaying a summary or navigating to a result page
      this.router.navigate(['/result']); // Replace '/result' with the actual route for the result page
    }
  }

  fetchSessionToken(): void {
    // Make an API request to fetch the session token
    // Replace the API URL with the actual endpoint to request a session token
    this.http
      .get('https://example.com/api/session/token')
      .subscribe((response: any) => {
        const sessionToken = response.token;
        this.sessionService.setSessionToken(sessionToken);
        this.fetchQuestionsWithToken(sessionToken);
      });
  }

  fetchQuestionsWithToken(sessionToken: string): void {
    // Make an API request to fetch questions using the session token
    // Replace the API URL with the actual endpoint to fetch questions using the session token
    this.http
      .get('https://example.com/api/questions?token=' + sessionToken)
      .subscribe((response: any) => {
        // Handle the API response and update the quizQuestions array
        this.quizQuestions = response.questions;
        this.currentQuestion = this.quizQuestions[this.currentIndex];
      });
  }
}
