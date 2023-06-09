import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionToken: string | undefined;

  constructor(private http: HttpClient) { }

  generateSessionToken(): void {
    this.http.post<ArrayBuffer>('https://opentdb.com/api_token.php?command=request', {})
      .subscribe(response => {
        const token = new TextDecoder().decode(response);
        this.sessionToken = token;
      });
  }

  resetSessionToken(): void {
    if (this.sessionToken) {
      this.http.post<any>(`https://opentdb.com/api_token.php?command=reset&token=${this.sessionToken}`, {})
        .subscribe(response => {
          // Handle the response if needed
        });
    }
  }
}
