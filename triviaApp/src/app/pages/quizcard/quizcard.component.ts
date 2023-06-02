import { Component, OnInit, Input } from '@angular/core';
import { QuizQuestion } from '../../services/quiz-interfaces';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const state = window.history.state;
      this.quizQuestions = state?.quizQuestions || [];
      this.currentIndex = state?.currentIndex || 0;

      // Randomizing the questions.
      this.quizQuestions = this.shuffle(this.quizQuestions);

      this.currentQuestion = this.quizQuestions[this.currentIndex];

      console.log('Quiz Questions:', this.quizQuestions);
      console.log('Current Index:', this.currentIndex);
      console.log('Current Question:', this.currentQuestion);
    });
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  selectAnswer(answer: string | undefined): void {
    if (answer) {
      this.selectedAnswer = answer;
      console.log('Selected answer:', answer);
      // You can perform further actions based on the selected answer, such as checking if it is correct or updating the UI accordingly.
    }
  }

  toggleAnswer(answer: string | undefined): void {
    if (this.selectedAnswer === answer) {
      this.selectedAnswer = undefined;
    } else {
      this.selectedAnswer = answer;
    }
  }
}

