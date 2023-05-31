import { Component, OnInit } from '@angular/core';
import { Category, QuizQuestion, QuizResponse } from '../../services/quiz-interfaces';
import { QuizService } from '../../services/quiz-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number = 9;
  formData: any = {};
  quizquestions: QuizQuestion[] = [];
  selectedDifficulty: string = ''; // Initialize with an empty string

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.quizService.getCategories()
      .subscribe(data => {
        this.categories = data;
        console.log('data:', data);
      });
  }



  onSubmit() {
    const categoryId = this.selectedCategoryId; // Get the selected category ID from the dropdown
    const difficulty = this.selectedDifficulty; // Get the selected difficulty from the dropdown

    this.quizService.getQuiz(categoryId, difficulty)
      .subscribe(quizQuestions => {
        console.log('Quiz Questions:', quizQuestions);

        // Assuming quizQuestions is an array of QuizQuestion objects

        // Redirect to the quiz page with the first question
        this.router.navigate(['/quiz'], {
          state: { quizQuestions, currentIndex: 0 } // Pass quizQuestions array and initial question index
        });
      });
  }

}
