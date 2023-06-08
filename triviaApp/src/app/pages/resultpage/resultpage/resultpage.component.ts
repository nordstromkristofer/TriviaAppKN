import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css']
})
export class ResultPageComponent implements OnInit {
  userAnswers: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const userAnswersParam = queryParams.get('userAnswers');
      this.userAnswers = userAnswersParam ? userAnswersParam.split(',') : [];
      console.log('User Answers:', this.userAnswers);
      // Logic for displaying the quiz results
    });
  }
}
