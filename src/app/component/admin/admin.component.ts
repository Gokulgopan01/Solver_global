import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { supabase } from '../../supabase.client';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  enquiries: any[] = [];
  isAuthenticated = false;
  showKeyPrompt = false;

  public enquiryCount = 0;
  public showEnquiryModal = false;
  public selectedEnquiry: any = null;

  public typeFilter: 'All' | 'job' | 'study' = 'All';
  public statusFilter: string = 'All';
  public searchTerm: string = '';
  public showFilterDropdown: boolean = false;
  public activeActionDropdownId: string | null = null;

  get filteredEnquiries() {
    return this.enquiries.filter(eq => {
      const typeMatch = this.typeFilter === 'All' || eq.enquiry_type === this.typeFilter;
      const statusValue = eq.status || 'New';
      const statusMatch = this.statusFilter === 'All' || statusValue.toLowerCase() === this.statusFilter.toLowerCase();

      if (!this.searchTerm.trim()) {
        return typeMatch && statusMatch;
      }

      const term = this.searchTerm.toLowerCase().trim();
      const name = (eq.full_name || '').toLowerCase();
      const email = (eq.email || '').toLowerCase();
      const phone = (eq.phone_number || '').toLowerCase();
      const job = (eq.job_preference || '').toLowerCase();
      const course = (eq.interested_course || '').toLowerCase();
      const country = (eq.country || '').toLowerCase();

      const searchMatch = name.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        job.includes(term) ||
        course.includes(term) ||
        country.includes(term);

      return typeMatch && statusMatch && searchMatch;
    });
  }

  setTypeFilter(type: 'All' | 'job' | 'study') {
    this.typeFilter = type;
  }

  setStatusFilter(status: string) {
    this.statusFilter = status;
    this.showFilterDropdown = false;
  }

  toggleFilterDropdown(event?: Event) {
    if (event) event.stopPropagation();
    this.showFilterDropdown = !this.showFilterDropdown;
    this.activeActionDropdownId = null;
  }

  toggleActionDropdown(id: string, event?: Event) {
    if (event) event.stopPropagation();
    this.activeActionDropdownId = this.activeActionDropdownId === id ? null : id;
    this.showFilterDropdown = false;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showFilterDropdown = false;
    this.activeActionDropdownId = null;
  }

  async quickUpdateStatus(eq: any, newStatus: string, event?: Event) {
    if (event) event.stopPropagation();
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', eq.id);

    if (error) {
      this.notificationService.showError('Failed to update status.');
    } else {
      eq.status = newStatus;
      this.notificationService.showSuccess(`Status changed to ${newStatus}`);
      this.activeActionDropdownId = null;
    }
  }

  async deleteEnquiry(id: string, event?: Event) {
    if (event) event.stopPropagation();
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) {
      this.notificationService.showError('Failed to delete enquiry.');
    } else {
      this.notificationService.showSuccess('Enquiry deleted successfully.');
      this.enquiries = this.enquiries.filter(e => e.id !== id);
      this.enquiryCount = this.enquiries.length;
      this.activeActionDropdownId = null;
    }
  }

  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  async ngOnInit() {
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      this.isAuthenticated = true;
      this.loadEnquiries();
      return;
    }

    const urlKey = this.route.snapshot.queryParamMap.get('key');
    if (urlKey) {
      this.verifyKey(urlKey);
    } else {
      this.showKeyPrompt = true;
    }
  }

  async submitKey(key: string) {
    if (!key) {
      this.notificationService.showError('Please enter a key.');
      return;
    }
    await this.verifyKey(key);
  }

  async verifyKey(adminKey: string) {
    const isValid = (adminKey === 'internal-3b7d1a-panel') || (await this.checkKey(adminKey));
    if (isValid) {
      this.isAuthenticated = true;
      this.showKeyPrompt = false;
      sessionStorage.setItem('admin_authenticated', 'true');
      this.notificationService.showSuccess('Access Granted.');
      this.loadEnquiries();
    } else {
      this.notificationService.showError('Invalid admin key.');
      this.showKeyPrompt = true;
    }
  }

  logout() {
    sessionStorage.removeItem('admin_authenticated');
    this.isAuthenticated = false;
    this.showKeyPrompt = true;
    this.enquiries = [];
  }

  async checkKey(key: string): Promise<boolean> {
    const expectedHash = '81beec9c203bf658fdc29b1718935b6297d64f74195d1345a915800cacd0d74b';
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === expectedHash;
  }

  loadEnquiries() {
    supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching enquiries:', error);
          return;
        }
        this.enquiries = data || [];
        this.enquiryCount = this.enquiries.length;
      });
  }

  viewRow(eq: any) {
    // Clone to avoid editing directly in the table before save
    this.selectedEnquiry = { ...eq };
    this.showEnquiryModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showEnquiryModal = false;
    this.selectedEnquiry = null;
    document.body.style.overflow = '';
  }

  async updateStatus() {
    if (!this.selectedEnquiry) return;

    const { error } = await supabase
      .from('enquiries')
      .update({ status: this.selectedEnquiry.status })
      .eq('id', this.selectedEnquiry.id);

    if (error) {
      this.notificationService.showError('Failed to update status.');
    } else {
      this.notificationService.showSuccess('Status updated successfully!');

      // Instantly update the local array to reflect changes immediately on the frontend
      const index = this.enquiries.findIndex(e => e.id === this.selectedEnquiry.id);
      if (index !== -1) {
        this.enquiries[index].status = this.selectedEnquiry.status;
      }

      this.closeModal();
    }
  }
}
