import { Injectable, signal, computed } from '@angular/core';

export interface DailyGoals {
  focusMinutes: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  streakXp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  joinDate: string;
  streak: number;
  totalXp: number;
  coursesCount: number;
  learningMinutes: number;
  dailyGoals: DailyGoals;
}

const STORAGE_KEY = 'lumi-users';
const SESSION_KEY = 'lumi-current-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(this.loadSession());
  isLoggedIn = computed(() => this.currentUser() !== null);

  // Yalnız qeydiyyatdan dərhal sonra true olur, Dashboard-a bir dəfə
  // "Welcome" göstərəndən sonra false-a keçir
  isNewUser = signal(false);


  constructor() {
    this.seedDemoAccount();
  }

  private loadSession(): User | null {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  private getAllUsers(): User[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveAllUsers(users: User[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  register(name: string, email: string, password: string): { success: boolean; message: string } {
    const users = this.getAllUsers();

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'This email is already registered.' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      joinDate: new Date().toISOString(),
      streak: 0,
      totalXp: 0,
      coursesCount: 0,
      learningMinutes: 0,
      dailyGoals: {
        focusMinutes: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        streakXp: 0
      }
    };

    users.push(newUser);
    this.saveAllUsers(users);
    this.setSession(newUser);
    this.isNewUser.set(true);

    return { success: true, message: 'Account created successfully!' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'No account found with this email.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }

    this.setSession(user);
    this.isNewUser.set(false); // Login edən istifadəçi "yeni" sayılmır
    return { success: true, message: 'Welcome back!' };
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
    this.currentUser.set(null);
    this.isNewUser.set(false);
  }

  seedDemoAccount() {
  const users = this.getAllUsers();
  const demoExists = users.some(u => u.email === 'demo@lumi.com');

  if (!demoExists) {
    const demoUser: User = {
      id: 'demo-user-001',
      name: 'Demo User',
      email: 'demo@lumi.com',
      password: 'demo123',
      joinDate: new Date('2026-01-15').toISOString(),
      streak: 12,
      totalXp: 4820,
      coursesCount: 8,
      learningMinutes: 1440,
      dailyGoals: {
        focusMinutes: 45,
        lessonsCompleted: 2,
        quizzesCompleted: 100,
        streakXp: 900
      }
    };

    users.push(demoUser);
    this.saveAllUsers(users);
  }
}

  // Dashboard bunu bir dəfə çağırıb "Welcome" mesajını göstərəndən sonra
  // bayrağı sıfırlayır ki, bir də görünməsin
  markUserAsWelcomed() {
    this.isNewUser.set(false);
  }

  private setSession(user: User) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
}