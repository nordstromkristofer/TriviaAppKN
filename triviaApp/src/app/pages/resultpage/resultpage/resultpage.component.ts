import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css']
})
export class ResultPageComponent implements OnInit {
  correctAnswersCount: number = 0;
  incorrectAnswersCount: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = window.history.state;
      this.correctAnswersCount = state?.correctAnswersCount || 0;
      this.incorrectAnswersCount = state?.incorrectAnswersCount || 0;
    });
  }
}
