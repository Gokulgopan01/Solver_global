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
    { url: 'assets/gallery/trust1.jpeg', title: 'Professional Consultation' },
    { url: 'assets/gallery/trust2.jpeg', title: 'Study Abroad Guidance' },
    { url: 'assets/gallery/trust3.jpeg', title: 'Work Permit Success' },
    { url: 'assets/work/Cleaning Staff.png', title: 'Employment Services' },
    { url: 'assets/work/Hotel Receptionist.png', title: 'Hospitality Placements' },
    { url: 'assets/work/Kitchen Assistant.png', title: 'Culinary Opportunities' },
    { url: 'assets/work/Room Attendant.png', title: 'Hotel Operations' },
    { url: 'assets/work/General Worker.png', title: 'Industrial Placements' },
    { url: 'assets/work/work.png', title: 'Professional Network' }
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
