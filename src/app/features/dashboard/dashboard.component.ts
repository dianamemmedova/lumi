import { Component, inject, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';

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
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit() {
    // Greeting-i bir dəfə göstərdikdən sonra "yeni istifadəçi" bayrağını sıfırla
    if (this.authService.isNewUser()) {
      setTimeout(() => this.authService.markUserAsWelcomed(), 0);
    }
  }

  greetingTitle = computed(() => {
    const name = this.authService.currentUser()?.name ?? '';
    return this.authService.isNewUser() ? `Welcome, ${name}!` : `Welcome back, ${name}!`;
  });

  greetingSubtitle = computed(() => {
    return this.authService.isNewUser()
      ? "Let's get started on your very first lesson today."
      : "You're doing great! Keep up your learning streak.";
  });

  hasStartedLearning = computed(() => {
  const user = this.authService.currentUser();
  return !!user && (user.totalXp > 0 || (user.dailyGoals?.lessonsCompleted ?? 0) > 0);
});
  dailyGoals = computed(() => {
    const goals = this.authService.currentUser()?.dailyGoals ?? {
      focusMinutes: 0, lessonsCompleted: 0, quizzesCompleted: 0, streakXp: 0
    };

    return [
      { label: 'Focus Time', icon: 'fa-clock', current: goals.focusMinutes, target: 60, colorClass: 'secondary' },
      { label: 'Lessons', icon: 'fa-book', current: goals.lessonsCompleted, target: 4, colorClass: 'primary' },
      { label: 'Streak XP', icon: 'fa-bolt', current: goals.streakXp, target: 1000, colorClass: 'tertiary' },
      { label: 'Quizzes', icon: 'fa-circle-check', current: goals.quizzesCompleted, target: 100, colorClass: 'secondary' }
    ];
  });

  courses: Course[] = [
    { id: 1, title: 'Advanced Typography', level: 3, hoursLeft: '4.5 hours left', progress: 40, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80', colorClass: 'primary' },
    { id: 2, title: '3D Modeling Masterclass', level: 5, hoursLeft: '12 hours left', progress: 15, image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=400&q=80', colorClass: 'secondary' },
    { id: 3, title: 'Python for Data Science', level: 2, hoursLeft: '2 hours left', progress: 85, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=400&q=80', colorClass: 'tertiary' }
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