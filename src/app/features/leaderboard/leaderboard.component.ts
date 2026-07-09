import { Component, signal, inject, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { UserAvatarComponent } from '../../shared/components/user-avatar/user-avatar.component';
import { AuthService } from '../../core/services/auth.service';

interface PodiumPerson {
  rank: number;
  name: string;
  xp: number;
}

interface Ranker {
  id: number;
  rank: number;
  name: string;
  displayName: string;
  xp: number;
  trend: 'up' | 'down' | 'same';
  trendValue?: number;
  isCurrentUser?: boolean;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, DecimalPipe, UserAvatarComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  private authService = inject(AuthService);

  activeTab = signal<'friends' | 'global' | 'weekly'>('global');

  setTab(tab: 'friends' | 'global' | 'weekly') {
    this.activeTab.set(tab);
  }

  podium: PodiumPerson[] = [
    { rank: 2, name: 'Alex Rivera', xp: 2840 },
    { rank: 1, name: 'Sarah Quinn', xp: 3420 },
    { rank: 3, name: 'Leo Chen', xp: 2610 }
  ];

  // Real istifadəçi adı və XP-si burada hesablanır
   rankedList = computed<Ranker[]>(() => {
  const user = this.authService.currentUser();
  const userName = user?.name ?? 'You';
  const userXp = user?.totalXp ?? 0;

  return [
    { id: 4, rank: 4, name: 'Marcus Kim', displayName: 'Marcus Kim', xp: 2100, trend: 'up', trendValue: 2 },
    { id: 5, rank: 5, name: userName, displayName: `You (${userName})`, xp: userXp, trend: 'same', isCurrentUser: true },
    { id: 6, rank: 6, name: 'Grace Wong', displayName: 'Grace Wong', xp: 1850, trend: 'down', trendValue: 1 },
    { id: 7, rank: 7, name: 'Toby Parker', displayName: 'Toby Parker', xp: 1620, trend: 'up', trendValue: 4 }
  ];
});
}