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

  newReview: Partial<Review> = {
    name: '',
    rating: 5,
    country: '',
    comment: '',
    role: ''
  };

  loading = false;
  isModalOpen = false;

  avatars = [
    'https://api.dicebear.com/7.x/notionists/svg?seed=John',
    'https://api.dicebear.com/7.x/notionists/svg?seed=Emma',
    'https://api.dicebear.com/7.x/notionists/svg?seed=David',
    'https://api.dicebear.com/7.x/notionists/svg?seed=Sophia',
    'https://api.dicebear.com/7.x/notionists/svg?seed=Alex',
    'https://api.dicebear.com/7.x/notionists/svg?seed=Mia',
    'https://api.dicebear.com/7.x/notionists/svg?seed=Chris',
    'https://api.dicebear.com/7.x/notionists/svg?seed=Lisa'
  ];

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
      role: r.Role,
      avatar: this.avatars[r.id % this.avatars.length]
    }));
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

      const newReviewWithAvatar: Review = {
        ...review,
        avatar: this.avatars[review.id % this.avatars.length]
      };

      this.reviews.unshift(newReviewWithAvatar);
    }

    this.closeModal();
  }

  // STAR DISPLAY
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}