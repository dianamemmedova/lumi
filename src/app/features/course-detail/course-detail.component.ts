import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  status: 'completed' | 'active' | 'locked';
}

interface Module {
  id: number;
  title: string;
  lessonCount: number;
  duration: string;
  lessons: Lesson[];
  expanded: boolean;
}

interface RelatedCourse {
  id: number;
  title: string;
  description: string;
  level: string;
  image: string;
  colorClass: string;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  activeTab = signal<'overview' | 'curriculum' | 'reviews'>('overview');

  setTab(tab: 'overview' | 'curriculum' | 'reviews') {
    this.activeTab.set(tab);
  }

  modules: Module[] = [
    {
      id: 1,
      title: 'Introduction to UX',
      lessonCount: 4,
      duration: '45m',
      expanded: true,
      lessons: [
        { id: 1, title: 'What is User Experience?', duration: '12:00', status: 'completed' },
        { id: 2, title: 'History of Design Systems', duration: '08:45', status: 'completed' },
        { id: 3, title: 'The UX Honeycomb Model', duration: '10:30', status: 'active' },
        { id: 4, title: 'Case Study: Famous UX Wins', duration: '15:30', status: 'locked' }
      ]
    },
    {
      id: 2,
      title: 'The Research Phase',
      lessonCount: 6,
      duration: '2h 10m',
      expanded: false,
      lessons: [
        { id: 5, title: 'User Interview Techniques', duration: '25:00', status: 'locked' },
        { id: 6, title: 'Synthesizing Research Data', duration: '18:00', status: 'locked' }
      ]
    }
  ];

  relatedCourses: RelatedCourse[] = [
    {
      id: 1,
      title: 'Advanced Interaction Design',
      description: 'Learn to build micro-interactions that delight users and improve engagement.',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80',
      colorClass: 'primary'
    },
    {
      id: 2,
      title: 'Design Systems Mastery',
      description: 'Build scalable, consistent design systems used by top product teams.',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80',
      colorClass: 'secondary'
    },
    {
      id: 3,
      title: 'Prototyping with Motion',
      description: 'Bring your designs to life with physics-based animation and transitions.',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      colorClass: 'tertiary'
    }
  ];

  currentSlide = signal(0);

  nextSlide() {
    this.currentSlide.update(i => (i + 1) % this.relatedCourses.length);
  }

  prevSlide() {
    this.currentSlide.update(i => (i - 1 + this.relatedCourses.length) % this.relatedCourses.length);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }

  toggleModule(module: Module) {
    module.expanded = !module.expanded;
  }
}