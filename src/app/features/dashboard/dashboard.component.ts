// dashboard.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';

interface DailyGoal {
  label: string;
  icon: string;
  current: number;
  target: number;
  colorClass: string;
}

interface Course {
  id: number;
  title: string;
  level: number;
  hoursLeft: string;
  progress: number;
  image: string;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService = inject(AuthService);

  dailyGoals: DailyGoal[] = [
    { label: 'Focus Time', icon: 'fa-clock', current: 45, target: 60, colorClass: 'secondary' },
    { label: 'Lessons', icon: 'fa-book', current: 2, target: 4, colorClass: 'primary' },
    { label: 'Streak XP', icon: 'fa-bolt', current: 900, target: 1000, colorClass: 'tertiary' },
    { label: 'Quizzes', icon: 'fa-circle-check', current: 100, target: 100, colorClass: 'secondary' }
  ];

  courses: Course[] = [
    { id: 1, title: 'Advanced Typography', level: 3, hoursLeft: '4.5 hours left', progress: 40, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80', colorClass: 'primary' },
    { id: 2, title: '3D Modeling Masterclass', level: 5, hoursLeft: '12 hours left', progress: 15, image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=400&q=80', colorClass: 'secondary' },
    { id: 3, title: 'Python for Data Science', level: 2, hoursLeft: '2 hours left', progress: 85, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80', colorClass: 'tertiary' }
  ];

  recommended = [
    { id: 1, title: 'Color Theory in Digital Arts', meta: '8 lessons • 2.5 hours', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=200&q=80' },
    { id: 2, title: 'Environmental UX Design', meta: '12 lessons • 5 hours', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80' },
    { id: 3, title: 'Interactive Hardware Design', meta: '15 lessons • 8 hours', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80' }
  ];

  ringOffset(current: number, target: number): number {
    const circumference = 251.2;
    const percent = Math.min(current / target, 1);
    return circumference - percent * circumference;
  }
}