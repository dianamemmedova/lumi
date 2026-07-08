// achievements.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

interface Badge {
  id: number;
  name: string;
  level: string;
  icon: string;
  colorClass: string;
  unlocked: boolean;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {
  unlockedCount = 12;
  totalCount = 40;
  percent = Math.round((this.unlockedCount / this.totalCount) * 100);

  ringOffset(): number {
    const circumference = 263.8;
    return circumference - (this.percent / 100) * circumference;
  }

  badges: Badge[] = [
    { id: 1, name: 'Early Bird', level: 'Level 1', icon: 'fa-rocket', colorClass: 'primary', unlocked: true },
    { id: 2, name: 'Bookworm', level: 'Level 3', icon: 'fa-book-open', colorClass: 'mint', unlocked: true },
    { id: 3, name: 'Mind Master', level: 'Level 2', icon: 'fa-brain', colorClass: 'amber', unlocked: true },
    { id: 4, name: 'Social Light', level: 'Level 1', icon: 'fa-users', colorClass: 'primary', unlocked: true },
    { id: 5, name: 'Night Owl', level: 'Locked', icon: 'fa-lock', colorClass: 'locked', unlocked: false },
    { id: 6, name: 'Graduation', level: 'Locked', icon: 'fa-graduation-cap', colorClass: 'locked', unlocked: false },
    { id: 7, name: 'Grand Slam', level: 'Locked', icon: 'fa-trophy', colorClass: 'locked', unlocked: false },
    { id: 8, name: 'Jewel Hunter', level: 'Locked', icon: 'fa-gem', colorClass: 'locked', unlocked: false },
    { id: 9, name: 'Reliable', level: 'Locked', icon: 'fa-certificate', colorClass: 'locked', unlocked: false },
    { id: 10, name: 'Rising Star', level: 'Locked', icon: 'fa-star-half-stroke', colorClass: 'locked', unlocked: false }
  ];
}