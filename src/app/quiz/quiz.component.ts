import { Component, inject } from '@angular/core';
import { Choice, Question } from '../question';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  audio = new Audio();
  quizService: QuizService = inject(QuizService);

  questions: Question[];
  currentQuestionIndex = 0;
  isEnd = false;
  score = 0;

  constructor() {
    this.questions = this.quizService.getQuizData();
    this.audio.src = '../assets/audio/click.wav';
    this.newQuiz();
  }

  onClickChoice(choice: Choice) {
    console.log('User clicked ' + choice.text);

    this.playSound();

    if (choice.isAnswer) this.score++;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.questions[this.currentQuestionIndex].choices.sort((a, b) => 0.5 - Math.random());
    } else {
      this.isEnd = true;
    }
  }

  private playSound() {
    this.audio.load();
    this.audio.addEventListener('canplaythrough', () => {
      this.audio.play();
    });
  }

  onClickNewQuiz() {
    this.newQuiz(); // Reset quiz state
    this.score = 0; // Reset the score to 0
  }

  private newQuiz() {
    this.questions.sort((a, b) => 0.5 - Math.random());
    this.isEnd = false;
    this.currentQuestionIndex = 0;

  }
}