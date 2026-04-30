import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  activeDropdown: string | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleScrollLock();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.activeDropdown = null;
    this.toggleScrollLock();
  }

  toggleDropdown(name: string, event: Event) {
    if (window.innerWidth <= 768) {
      event.preventDefault();
      event.stopPropagation();
      this.activeDropdown = this.activeDropdown === name ? null : name;
    }
  }

  private toggleScrollLock() {
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}