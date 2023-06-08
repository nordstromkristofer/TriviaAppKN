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
  shuffledAnswers: string[] = [];
  selectedAnswer: string | undefined;
  userAnswers: (string | undefined)[] = [];
  remainingTime: number = 31; // Initial time value

  private timer: any; // Reference to the timer interval

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
      this.shuffleAnswers();

      console.log('Quiz Questions:', this.quizQuestions);
      console.log('Current Index:', this.currentIndex);
      console.log('Current Question:', this.currentQuestion);
      console.log('Shuffled Answers:', this.shuffledAnswers);

      // Start the countdown timer
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    // Cleanup the timer when the component is destroyed
    this.stopTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        // Time has run out, automatically select an incorrect answer and proceed to the next question
        this.selectedAnswer = this.shuffledAnswers.find(answer => answer !== this.currentQuestion?.correct_answer);
        this.nextQuestion();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  shuffleAnswers(): void {
    if (this.currentQuestion) {
      const answers = [this.currentQuestion.correct_answer, ...this.currentQuestion.incorrect_answers];
      this.shuffledAnswers = this.shuffleArray(answers.filter(answer => answer !== undefined));
    } else {
      this.shuffledAnswers = [];
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    // Stop the timer before proceeding to the next question
    this.stopTimer();

    if (this.currentIndex < this.quizQuestions.length - 1) {
      // Store user answer
      this.userAnswers[this.currentIndex] = this.selectedAnswer;
      // Go to the next question
      this.currentIndex++;
      this.currentQuestion = this.quizQuestions[this.currentIndex];
      this.shuffleAnswers(); // Shuffle answers for the next question
      this.selectedAnswer = undefined;
      this.remainingTime = 31; // Reset the remaining time for the next question
      // Start the countdown timer for the next question
      this.startTimer();
    } else {
      // End of quiz
      console.log('End of quiz');
      // Store user answer for the last question
      this.userAnswers[this.currentIndex] = this.selectedAnswer;
      // Count correct and incorrect answers
      const correctAnswersCount = this.userAnswers.filter(
        (answer, index) => answer === this.quizQuestions[index].correct_answer
      ).length;
      const incorrectAnswersCount = this.userAnswers.length - correctAnswersCount;
      // Navigate to the result page
      this.router.navigate(['/result'], {
        state: {
          userAnswers: this.userAnswers,
          correctAnswersCount: correctAnswersCount,
          incorrectAnswersCount: incorrectAnswersCount
        }
      });
    }
  }
}
