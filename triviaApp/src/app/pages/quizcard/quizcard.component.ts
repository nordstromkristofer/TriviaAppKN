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
  timer: any;

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

      this.startTimer(); // Start the timer when the component initializes
    });
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

  startTimer(): void {
    const totalTime = 31; // Total time in seconds
    let remainingTime = totalTime;

    console.log('Timer started');

    const timerInterval = setInterval(() => {
      remainingTime--;

      if (remainingTime > 0) {
        console.log(`Remaining time: ${remainingTime} seconds`);
      } else {
        console.log('Time ran out');
        this.handleIncorrectAnswer();
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  handleIncorrectAnswer(): void {
    // Moving to next if too slow
    this.nextQuestion();
  }

  nextQuestion(): void {
    clearTimeout(this.timer); // Clear timer

    if (this.currentIndex < this.quizQuestions.length - 1) {
      // Store user answer
      this.userAnswers[this.currentIndex] = this.selectedAnswer;
      // Go to the next question
      this.currentIndex++;
      this.currentQuestion = this.quizQuestions[this.currentIndex];
      this.shuffleAnswers();
      this.selectedAnswer = undefined;

      this.startTimer();
    } else {
      // End of quiz
      console.log('End of quiz');
      this.userAnswers[this.currentIndex] = this.selectedAnswer;
      //answer count

      const correctAnswersCount = this.userAnswers.filter(
        (answer, index) => answer === this.quizQuestions[index].correct_answer
      ).length;
      const incorrectAnswersCount = this.userAnswers.length - correctAnswersCount;
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
