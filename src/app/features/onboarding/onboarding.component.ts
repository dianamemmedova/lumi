// onboarding.component.ts (DÜZGÜN VERSİYA)
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Category {
  id: string;
  name: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css'
})
export class OnboardingComponent {
  private router = inject(Router);

  categories: Category[] = [
    { id: 'coding', name: 'Coding', icon: 'fa-code', colorClass: 'primary' },
    { id: 'design', name: 'Design', icon: 'fa-palette', colorClass: 'secondary' },
    { id: 'languages', name: 'Languages', icon: 'fa-language', colorClass: 'tertiary' },
    { id: 'business', name: 'Business', icon: 'fa-chart-line', colorClass: 'error' },
    { id: 'music', name: 'Music', icon: 'fa-music', colorClass: 'primary' }
  ];

  selectedCategory = signal<string | null>(null);

  selectCategory(id: string) {
    this.selectedCategory.set(id);
  }

  continue() {
    if (!this.selectedCategory()) {
      alert('Please select a category to continue!');
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}