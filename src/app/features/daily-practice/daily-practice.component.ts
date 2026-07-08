// daily-practice.component.ts
import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

interface SkillModule {
  id: number;
  title: string;
  desc: string;
  icon: string;
  xp: number;
  progress: number;
  colorClass: string;
}

@Component({
  selector: 'app-daily-practice',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './daily-practice.component.html',
  styleUrl: './daily-practice.component.css'
})
export class DailyPracticeComponent implements OnInit, OnDestroy {
  today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  streakPills = [true, true, true, false, false, false, false];

  private totalSeconds = 4 * 3600 + 12 * 60 + 55;
  private intervalId: any;

  countdown = signal(this.formatTime(this.totalSeconds));

  ngOnInit() {
    this.intervalId = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.countdown.set(this.formatTime(this.totalSeconds));
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private formatTime(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  skillModules: SkillModule[] = [
    { id: 1, title: 'Advanced Syntax', desc: 'Master complex sentence structures and punctuation.', icon: 'fa-spell-check', xp: 20, progress: 75, colorClass: 'secondary' },
    { id: 2, title: 'Algorithmic Logic', desc: 'Optimize loop performance and memory management.', icon: 'fa-code', xp: 35, progress: 40, colorClass: 'primary' },
    { id: 3, title: 'Business Lexicon', desc: 'Expand your professional vocabulary for meetings.', icon: 'fa-language', xp: 15, progress: 90, colorClass: 'tertiary' },
    { id: 4, title: 'Etymology Roots', desc: 'Trace the history of common English idioms.', icon: 'fa-book-open', xp: 25, progress: 15, colorClass: 'outline' },
    { id: 5, title: 'Visual Geometry', desc: 'Calculate surface areas using spatial reasoning.', icon: 'fa-calculator', xp: 40, progress: 60, colorClass: 'error' },
    { id: 6, title: 'Creative Design', desc: 'Apply color theory principles to layouts.', icon: 'fa-palette', xp: 10, progress: 30, colorClass: 'secondary' }
  ];
}