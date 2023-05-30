import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from './quiz-interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private categoryUrl = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>('https://opentdb.com/api_category.php')
      .pipe(
        map(response => response.trivia_categories)
      );
  }
}