import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category, QuizQuestion, QuizResponse } from './quiz-interfaces';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private categoryUrl = 'https://opentdb.com/api_category.php';
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>('https://opentdb.com/api_category.php')
      .pipe(
        map(response => response.trivia_categories)
      );
  }
  getQuiz(categoryId: number, difficulty: string): Observable<QuizQuestion[]> {
    let params = new HttpParams()
      .set('amount', '7')
      .set('category', categoryId.toString())
      .set('difficulty', difficulty);

    return this.http.get<QuizResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response.results)
      );
  }
}