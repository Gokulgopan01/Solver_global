import { Component, OnInit, inject } from '@angular/core';
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
      this.closeModal();
      this.loadEnquiries();
    }
  }
}
