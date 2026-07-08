import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  joinDate: string;
  streak: number;
  totalXp: number;
}

const STORAGE_KEY = 'lumi-users';
const SESSION_KEY = 'lumi-current-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = new Router();

  currentUser = signal<User | null>(this.loadSession());
  isLoggedIn = computed(() => this.currentUser() !== null);

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
      
    };

    users.push(newUser);
    this.saveAllUsers(users);
    this.setSession(newUser);

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
    return { success: true, message: 'Welcome back!' };
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
    this.currentUser.set(null);
  }

  private setSession(user: User) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
}