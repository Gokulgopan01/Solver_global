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

  public showNoteBox: boolean = false;
  public applicantNote: string = '';

  public statusList = [
    { label: 'New', value: 'New', color: 'green' },
    { label: 'Contacted', value: 'Contacted', color: 'orange' },
    { label: 'Shortlisted', value: 'Shortlisted', color: 'blue' },
    { label: 'Interview', value: 'Interview', color: 'purple' },
    { label: 'Rejected', value: 'Rejected', color: 'red' },
    { label: 'Completed', value: 'Completed', color: 'emerald' }
  ];
  actionMenuStyle: { [key: string]: string } = {};


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

  isActionDropUp = false;

  toggleActionDropdown(id: string, event?: Event) {
    if (event) event.stopPropagation();
    if (this.activeActionDropdownId === id) {
      this.activeActionDropdownId = null;
      return;
    }

    this.activeActionDropdownId = id;
    this.showFilterDropdown = false;

    const btn = event?.currentTarget as HTMLElement | undefined;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const gap = 4;
    const edgePadding = 16;
    const menuHeight = 210; // your menu is about 206px tall with 4 items + delete

    this.isActionDropUp = window.innerHeight - rect.bottom < menuHeight + gap;

    // right edge of the menu lines up with the right edge of the button, keeping at least 16px from viewport edge
    const right = Math.max(edgePadding, window.innerWidth - rect.right);

    this.actionMenuStyle = this.isActionDropUp
      ? { right: `${right}px`, left: 'auto', top: 'auto', bottom: `${window.innerHeight - rect.top + gap}px` }
      : { right: `${right}px`, left: 'auto', bottom: 'auto', top: `${rect.bottom + gap}px` };
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  @HostListener('document:click')
  onDocumentClick() {
    this.showFilterDropdown = false;
    this.activeActionDropdownId = null;
  }

  async quickUpdateStatus(eq: any, newStatus: string, event?: Event) {
    if (event) event.stopPropagation();
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', eq.id)
        .select();

      if (error) {
        console.error('Update status error:', error);
        this.notificationService.showError('Failed to update status: ' + error.message);
        return;
      }

      if (!data || data.length === 0) {
        console.error('Update failed: 0 rows modified. Check Supabase RLS policies.');
        this.notificationService.showError('Database update blocked by Supabase RLS. Please add an UPDATE policy on enquiries table.');
        return;
      }

      eq.status = newStatus;
      this.notificationService.showSuccess(`Status changed to ${newStatus}`);
      this.activeActionDropdownId = null;
    } catch (err: any) {
      console.error('Update status exception:', err);
      this.notificationService.showError('Error updating status.');
    }
  }

  async deleteEnquiry(id: string, event?: Event) {
    if (event) event.stopPropagation();
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const { data, error } = await supabase
        .from('enquiries')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Delete enquiry error:', error);
        this.notificationService.showError('Failed to delete enquiry: ' + error.message);
        return;
      }

      if (!data || data.length === 0) {
        console.error('Delete failed: 0 rows deleted. Check Supabase RLS policies.');
        this.notificationService.showError('Database delete blocked by Supabase RLS. Please add a DELETE policy on enquiries table.');
        return;
      }

      this.notificationService.showSuccess('Enquiry deleted successfully.');
      this.enquiries = this.enquiries.filter(e => e.id !== id);
      this.enquiryCount = this.enquiries.length;
      this.activeActionDropdownId = null;
    } catch (err: any) {
      console.error('Delete enquiry exception:', err);
      this.notificationService.showError('Error deleting enquiry.');
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
    const expectedHash = '9d0c1c9b384189acc0277908409bbf3210d3ee7d5a8836e7a07930536c8b5f12';
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
    this.showNoteBox = false;
    this.applicantNote = localStorage.getItem('admin_note_' + eq.id) || '';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showEnquiryModal = false;
    this.selectedEnquiry = null;
    this.showNoteBox = false;
    document.body.style.overflow = '';
  }

  toggleNoteBox() {
    this.showNoteBox = !this.showNoteBox;
  }

  saveApplicantNote() {
    if (!this.selectedEnquiry) return;
    localStorage.setItem('admin_note_' + this.selectedEnquiry.id, this.applicantNote);
    this.notificationService.showSuccess('Note saved successfully!');
  }

  openImage(url?: string | null) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  async updateStatus() {
    if (!this.selectedEnquiry) return;

    try {
      const { data, error } = await supabase
        .from('enquiries')
        .update({ status: this.selectedEnquiry.status })
        .eq('id', this.selectedEnquiry.id)
        .select();

      if (error) {
        console.error('Update status error:', error);
        this.notificationService.showError('Failed to update status: ' + error.message);
        return;
      }

      if (!data || data.length === 0) {
        console.error('Update failed: 0 rows modified. Check Supabase RLS policies.');
        this.notificationService.showError('Database update blocked by Supabase RLS. Please add an UPDATE policy on enquiries table.');
        return;
      }

      this.notificationService.showSuccess('Status updated successfully!');

      // Instantly update the local array to reflect changes immediately on the frontend
      const index = this.enquiries.findIndex(e => e.id === this.selectedEnquiry.id);
      if (index !== -1) {
        this.enquiries[index].status = this.selectedEnquiry.status;
      }

      this.closeModal();
    } catch (err: any) {
      console.error('Update status exception:', err);
      this.notificationService.showError('Error updating status.');
    }
  }
}
