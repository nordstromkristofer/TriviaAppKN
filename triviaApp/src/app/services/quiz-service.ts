import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category, QuizQuestion, QuizResponse } from './quiz-interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private categoryUrl = 'https://opentdb.com/api_category.php';
  private apiUrl = 'https://opentdb.com/api.php';
  private sessionToken: string | null = null;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.categoryUrl)
      .pipe(
        map(response => response.trivia_categories)
      );
  }

  generateSessionToken(): Observable<string> {
    return this.http.get<{ token: string }>('https://opentdb.com/api_token.php?command=request')
      .pipe(
        tap(response => console.log('Session Token Generated:', response.token)),
        map(response => response.token),
        tap(token => this.sessionToken = token)
      );
  }

  getQuiz(categoryId: number, difficulty: string): Observable<QuizQuestion[]> {
    let params = new HttpParams()
      .set('amount', '7')
      .set('category', categoryId.toString())
      .set('difficulty', difficulty);

    if (this.sessionToken) {
      params = params.set('token', this.sessionToken);
    }

    return this.http.get<QuizResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response.results)
      );
  }

  resetSessionToken(): Observable<void> {
    if (this.sessionToken) {
      let params = new HttpParams()
        .set('command', 'reset')
        .set('token', this.sessionToken);

      return this.http.get<void>('https://opentdb.com/api_token.php', { params })
        .pipe(
          tap(() => {
            console.log('Session Token Reset');
            this.sessionToken = null;
          })
        );
    } else {
      return new Observable<void>();
    }
  }
}
