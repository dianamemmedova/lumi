// profile.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { AuthService } from '../../core/services/auth.service';
import { UserAvatarComponent } from '../../shared/components/user-avatar/user-avatar.component';


interface Stat {
  icon: string;
  value: string;
  label: string;
  colorClass: string;
}

interface DayActivity {
  day: string;
  minutes: number;
  heightPercent: number;
}

interface SettingItem {
  icon: string;
  title: string;
  desc: string;
  colorClass: string;
  action: 'account' | 'notifications' | 'privacy' | 'logout';
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, UserAvatarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  stats: Stat[] = [
    { icon: 'fa-fire', value: '12', label: 'Day Streak', colorClass: 'amber' },
    { icon: 'fa-bolt', value: '4,820', label: 'Total XP', colorClass: 'primary' },
    { icon: 'fa-book', value: '8', label: 'Courses', colorClass: 'mint' },
    { icon: 'fa-clock', value: '24h', label: 'Learning Time', colorClass: 'error' }
  ];

  weeklyActivity: DayActivity[] = [
    { day: 'MON', minutes: 27, heightPercent: 45 },
    { day: 'TUE', minutes: 45, heightPercent: 75 },
    { day: 'WED', minutes: 18, heightPercent: 30 },
    { day: 'THU', minutes: 54, heightPercent: 90 },
    { day: 'FRI', minutes: 36, heightPercent: 60 },
    { day: 'SAT', minutes: 15, heightPercent: 25 },
    { day: 'SUN', minutes: 6, heightPercent: 10 }
  ];

  weeklyTotal = this.weeklyActivity.reduce((sum, d) => sum + d.minutes, 0);

  settingsItems: SettingItem[] = [
    { icon: 'fa-user', title: 'Account Details', desc: 'Update your personal information', colorClass: 'primary', action: 'account' },
    { icon: 'fa-bell', title: 'Notifications', desc: 'Manage reminders and alerts', colorClass: 'mint', action: 'notifications' },
    { icon: 'fa-lock', title: 'Privacy & Security', desc: 'Control your data and visibility', colorClass: 'amber', action: 'privacy' },
    { icon: 'fa-right-from-bracket', title: 'Logout', desc: 'Safely exit your session', colorClass: 'error', action: 'logout' }
  ];

  handleSettingClick(item: SettingItem) {
    if (item.action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    // digər aksiyalar (account, notifications, privacy) sonra əlavə oluna bilər
  }

  formatJoinDate(): string {
    const user = this.authService.currentUser();
    if (!user) return '';
    return new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}