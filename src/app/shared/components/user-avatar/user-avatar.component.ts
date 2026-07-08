// user-avatar.component.ts
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css'
})
export class UserAvatarComponent {
  name = input.required<string>();
  size = input<number>(40);

  private colorPalette = [
    '#4143D5', '#006B5F', '#735500', '#BA1A1A',
    '#7C3AED', '#0891B2', '#B45309', '#BE185D'
  ];

  initials = computed(() => {
    const parts = this.name().trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  });

  backgroundColor = computed(() => {
    const name = this.name();
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.colorPalette.length;
    return this.colorPalette[index];
  });
}