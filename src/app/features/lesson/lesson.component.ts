import { Component, signal, computed, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

interface Option {
  letter: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
}

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {
  private location = inject(Location);
  private router = inject(Router);

  questions: Question[] = [
    {
      id: 1,
      question: "Which of these best describes the 'Energetic-Tactile' design framework?",
      options: [
        { letter: 'A', text: 'A purely academic style focusing on text-heavy content and neutral tones.' },
        { letter: 'B', text: 'A balance of playful engagement with functional clarity using physical metaphors.' },
        { letter: 'C', text: 'A minimalist aesthetic that removes all shadows and depth to reduce cognitive load.' },
        { letter: 'D', text: 'A vintage-inspired design using heavy textures and dark, muddy color palettes.' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 2,
      question: "What is the primary goal of a wireframe in the UX design process?",
      options: [
        { letter: 'A', text: 'To finalize the color palette and typography of a product.' },
        { letter: 'B', text: 'To showcase high-fidelity visual details before development.' },
        { letter: 'C', text: 'To outline the basic structure and layout without visual design.' },
        { letter: 'D', text: 'To write the marketing copy for a landing page.' }
      ],
      correctAnswer: 'C'
    },
    {
      id: 3,
      question: "Which HTTP method is typically used to retrieve data from a server?",
      options: [
        { letter: 'A', text: 'POST' },
        { letter: 'B', text: 'DELETE' },
        { letter: 'C', text: 'PUT' },
        { letter: 'D', text: 'GET' }
      ],
      correctAnswer: 'D'
    },
    {
      id: 4,
      question: "In color theory, which colors are considered 'complementary'?",
      options: [
        { letter: 'A', text: 'Colors that sit next to each other on the color wheel.' },
        { letter: 'B', text: 'Colors that sit opposite each other on the color wheel.' },
        { letter: 'C', text: 'Any two shades of the same color.' },
        { letter: 'D', text: 'Black and white only.' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 5,
      question: "What does 'responsive design' primarily ensure?",
      options: [
        { letter: 'A', text: 'That a website loads faster on all devices.' },
        { letter: 'B', text: 'That a website adapts its layout to different screen sizes.' },
        { letter: 'C', text: 'That a website uses only one font family.' },
        { letter: 'D', text: 'That a website has animated transitions.' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 6,
      question: "Which of these is a common Agile methodology framework?",
      options: [
        { letter: 'A', text: 'Waterfall' },
        { letter: 'B', text: 'Scrum' },
        { letter: 'C', text: 'Six Sigma' },
        { letter: 'D', text: 'Gantt' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 7,
      question: "What is the main purpose of a 'call-to-action' (CTA) button in UI design?",
      options: [
        { letter: 'A', text: 'To decorate the page with color.' },
        { letter: 'B', text: 'To prompt the user to take a specific desired action.' },
        { letter: 'C', text: 'To display the company logo.' },
        { letter: 'D', text: 'To close the browser window.' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 8,
      question: "In typography, what is 'kerning'?",
      options: [
        { letter: 'A', text: 'The vertical spacing between lines of text.' },
        { letter: 'B', text: 'The adjustment of space between individual letter pairs.' },
        { letter: 'C', text: 'The overall size of a font.' },
        { letter: 'D', text: 'The color of the text.' }
      ],
      correctAnswer: 'B'
    },
    {
      id: 9,
      question: "Which principle suggests grouping related items visually close together?",
      options: [
        { letter: 'A', text: 'Contrast' },
        { letter: 'B', text: 'Repetition' },
        { letter: 'C', text: 'Proximity' },
        { letter: 'D', text: 'Alignment' }
      ],
      correctAnswer: 'C'
    },
    {
      id: 10,
      question: "What does 'accessibility' (a11y) in design primarily focus on?",
      options: [
        { letter: 'A', text: 'Making a product visually appealing to everyone.' },
        { letter: 'B', text: 'Making a product usable by people with disabilities.' },
        { letter: 'C', text: 'Reducing the loading time of a website.' },
        { letter: 'D', text: 'Increasing the number of features in a product.' }
      ],
      correctAnswer: 'B'
    }
  ];

  currentIndex = signal(0);
  selectedOption = signal<string | null>(null);
  isChecked = signal(false);
  correctCount = signal(0);
  isFinished = signal(false);

  currentQuestion = computed(() => this.questions[this.currentIndex()]);

  progress = computed(() => {
    return Math.round(((this.currentIndex()) / this.questions.length) * 100);
  });

  isCorrect = computed(() => {
    return this.selectedOption() === this.currentQuestion().correctAnswer;
  });

  finalPercentage = computed(() => {
    return Math.round((this.correctCount() / this.questions.length) * 100);
  });

  selectOption(letter: string) {
    if (this.isChecked()) return;
    this.selectedOption.set(letter);
  }

  checkAnswer() {
    if (!this.selectedOption()) return;

    this.isChecked.set(true);

    if (this.isCorrect()) {
      this.correctCount.update(c => c + 1);
    }
  }

  onActionClick() {
    if (!this.isChecked()) {
      this.checkAnswer();
      return;
    }

    // Növbəti suala keç
    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedOption.set(null);
      this.isChecked.set(false);
    } else {
      this.isFinished.set(true);
    }
  }

  goBack() {
    this.location.back();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  retryQuiz() {
    this.currentIndex.set(0);
    this.selectedOption.set(null);
    this.isChecked.set(false);
    this.correctCount.set(0);
    this.isFinished.set(false);
  }

  resultMessage(): string {
    const pct = this.finalPercentage();
    if (pct === 100) return "Perfect score! You're a true Lumi master!";
    if (pct >= 80) return "Excellent work! You really know your stuff.";
    if (pct >= 60) return "Good job! A bit more practice and you'll master this.";
    if (pct >= 40) return "Not bad, but there's room to grow. Keep practicing!";
    return "Keep going! Every attempt makes you stronger.";
  }
}