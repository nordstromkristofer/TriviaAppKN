import { Component, OnInit } from '@angular/core';
import { Category } from '../../services/quiz-interfaces';
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

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getCategories()
      .subscribe(data => {
        this.categories = data;
        console.log('data:', data);
      });
  }

  onSubmit() {

  }
}
