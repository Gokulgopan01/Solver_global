import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { supabase } from '../../supabase.client';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  avatar?: string;
  country: string;
  role: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {

  reviews: Review[] = [];
  studentReviews: Review[] = [];
  employerReviews: Review[] = [];
  employeeReviews: Review[] = [];
  expandedReviews: { [key: number]: boolean } = {};

  newReview: Partial<Review> = {
    name: '',
    rating: 5,
    country: '',
    comment: '',
    role: ''
  };

  showAll = {
    student: false,
    employer: false,
    employee: false
  };

  loading = false;
  isModalOpen = false;


  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
    this.resetForm();
  }

  resetForm() {
    this.newReview = {
      name: '',
      role: '',
      rating: 5,
      comment: '',
      country: ''
    };
  }

  async ngOnInit() {
    await this.loadReviews();
  }

  // LOAD REVIEWS
  async loadReviews() {

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error loading reviews:', error);
      return;
    }

    this.reviews = (data || []).map((r: any) => ({
      ...r,
      role: r.Role
    }));

    this.sortReviewsByRole();
  }

  sortReviewsByRole() {

    this.studentReviews = [];
    this.employerReviews = [];
    this.employeeReviews = [];

    this.reviews.forEach((review) => {

      const role = review.role?.toLowerCase()?.trim();

      // STUDENT
      if (role === 'student') {
        this.studentReviews.push(review);
      }

      // EMPLOYER / WORKER / EMPLOYEE
      else if (
        role === 'employer'
      ) {
        this.employerReviews.push(review);
      }

      // OTHER
      else {
        this.employeeReviews.push(review);
      }
    });
  }

  getVisibleReviews(
    reviews: Review[],
    section: 'student' | 'employer' | 'employee'
  ) {
    return this.showAll[section]
      ? reviews
      : reviews.slice(0, 3);
  }

  toggleView(section: 'student' | 'employer' | 'employee') {
    this.showAll[section] =
      !this.showAll[section];
  }

  toggleReadMore(reviewId: number) {
    this.expandedReviews[reviewId] =
      !this.expandedReviews[reviewId];
  }

  isExpanded(reviewId: number): boolean {
    return !!this.expandedReviews[reviewId];
  }

  // SUBMIT REVIEW
  async submitReview() {

    if (
      !this.newReview.name ||
      !this.newReview.role ||
      !this.newReview.comment
    ) {
      return;
    }

    this.loading = true;

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          name: this.newReview.name,
          Role: this.newReview.role,
          country: this.newReview.country,
          rating: this.newReview.rating,
          comment: this.newReview.comment
        }
      ])
      .select();

    this.loading = false;

    if (error) {
      console.log('Insert Error:', error);
      return;
    }

    if (data && data.length > 0) {

      const review = data[0];
      this.reviews.unshift({
        ...review,
        role: review.Role
      });

      this.sortReviewsByRole();
    }

    this.closeModal();
  }

  // GET INITIALS
  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  // GET AVATAR COLOR
  getAvatarColor(name: string): string {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
      '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  // STAR DISPLAY
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}