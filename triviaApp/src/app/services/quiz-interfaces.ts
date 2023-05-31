export interface Category {
  id: number;
  name: string;
}

export interface QuizResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}