import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  images = [
    { url: 'assets/home_images/trust1.jpeg', title: 'Professional Consultation' },
    { url: 'assets/home_images/trust2.jpeg', title: 'Study Abroad Guidance' },
    { url: 'assets/home_images/trust3.jpeg', title: 'Work Permit Success' },
    { url: 'assets/home_images/photo_gallery (4).jpg', title: 'Student Community' },
    { url: 'assets/home_images/photo_gallery (5).jpg', title: 'Visa Approval Event' },
    { url: 'assets/home_images/photo_gallery (6).jpg', title: 'Global Mobility Summit' },
    { url: 'assets/home_images/Cleaning Staff.png', title: 'Employment Services' },
    { url: 'assets/home_images/Hotel Receptionist.png', title: 'Hospitality Placements' },
    { url: 'assets/home_images/Kitchen Assistant.png', title: 'Culinary Opportunities' },
    { url: 'assets/home_images/Room Attendant.png', title: 'Hotel Operations' },
    { url: 'assets/home_images/General Worker.png', title: 'Industrial Placements' },
    { url: 'assets/home_images/work.png', title: 'Professional Network' }
  ];

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Gallery', url: '/gallery' }];

  selectedImage: string | null = null;

  openLightbox(url: string) {
    this.selectedImage = url;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}
