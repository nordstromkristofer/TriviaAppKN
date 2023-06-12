import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizFormComponent } from './pages/quiz-form/quiz-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizCardComponent } from './pages/quizcard/quizcard.component';
import { ResultPageComponent } from './pages/resultpage/resultpage/resultpage.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizFormComponent,
    HomeComponent,
    QuizCardComponent,
    ResultPageComponent
  ],
  imports: [
    FormsModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
