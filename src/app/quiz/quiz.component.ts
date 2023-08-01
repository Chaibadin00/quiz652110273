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
  questions: Question[];
  currentQuestionIndex = 0;
  isEnd = false;
  score = 0;
  showQuestionList = false;

  constructor(private quizService: QuizService) {
    this.questions = this.quizService.quizData; // Use quizData property from the service
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
  // Add the missing methods
  toggleQuestionList() {
    this.showQuestionList = !this.showQuestionList;
  }

  navigateToQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.showQuestionList = false; // Hide the question list after navigating
  }

  indexToLetter(index: number) {
    return String.fromCharCode(65 + index); // Convert the index to letter (A, B, C, etc.)
  }

  onClickPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onClickNext() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }
}