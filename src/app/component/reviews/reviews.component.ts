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
    comment: ''
  };

  loading = false;
  isModalOpen = false;

  avatars = [
    'https://i.pravatar.cc/150?u=1',
    'https://i.pravatar.cc/150?u=2',
    'https://i.pravatar.cc/150?u=3',
    'https://i.pravatar.cc/150?u=4'
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

    this.reviews = (data || []).map((r: any, index: number) => ({
      ...r,
      avatar: this.avatars[index % this.avatars.length]
    }));
  }

  // SUBMIT REVIEW
  async submitReview() {

    if (!this.newReview.name || !this.newReview.comment) {
      return;
    }

    this.loading = true;

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          name: this.newReview.name,
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

    // Add instantly to UI
    if (data && data.length > 0) {
      const newReviewWithAvatar = {
        ...data[0],
        avatar: this.avatars[Math.floor(Math.random() * this.avatars.length)]
      } as Review;
      this.reviews.unshift(newReviewWithAvatar);
    }

    this.closeModal();
  }

  // STAR DISPLAY
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}