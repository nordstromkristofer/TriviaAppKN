import { Component, OnInit } from '@angular/core';
import { Category, QuizQuestion, QuizResponse } from '../../services/quiz-interfaces';
import { QuizService } from '../../services/quiz-service';

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

  constructor(private quizService: QuizService) { }

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
        // Handle the retrieved quiz questions
      });
  }
}
