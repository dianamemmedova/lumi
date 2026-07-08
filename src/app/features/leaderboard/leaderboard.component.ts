import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { UserAvatarComponent } from '../../shared/components/user-avatar/user-avatar.component';

interface PodiumPerson {
  rank: number;
  name: string;
  xp: number;
}

interface Ranker {
  id: number;
  rank: number;
  name: string;
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
  activeTab = signal<'friends' | 'global' | 'weekly'>('global');

  setTab(tab: 'friends' | 'global' | 'weekly') {
    this.activeTab.set(tab);
  }

  // Sıra vacibdir: 2-ci, 1-ci, 3-cü (podium vizual sırası üçün)
  podium: PodiumPerson[] = [
    { rank: 2, name: 'Alex Rivera', xp: 2840 },
    { rank: 1, name: 'Sarah Quinn', xp: 3420 },
    { rank: 3, name: 'Leo Chen', xp: 2610 }
  ];

  rankedList: Ranker[] = [
    { id: 4, rank: 4, name: 'Marcus Kim', xp: 2100, trend: 'up', trendValue: 2 },
    { id: 5, rank: 5, name: 'You (Elena)', xp: 1985, trend: 'same', isCurrentUser: true },
    { id: 6, rank: 6, name: 'Grace Wong', xp: 1850, trend: 'down', trendValue: 1 },
    { id: 7, rank: 7, name: 'Toby Parker', xp: 1620, trend: 'up', trendValue: 4 }
  ];
}