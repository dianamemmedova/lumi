import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { OnboardingComponent } from './features/onboarding/onboarding.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';
import { LessonComponent } from './features/lesson/lesson.component';
import { DailyPracticeComponent } from './features/daily-practice/daily-practice.component';
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'course-detail', component: CourseDetailComponent, canActivate: [authGuard] },
  { path: 'lesson', component: LessonComponent, canActivate: [authGuard] },
  { path: 'daily-practice', component: DailyPracticeComponent, canActivate: [authGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [authGuard] },
  { path: 'achievements', component: AchievementsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];