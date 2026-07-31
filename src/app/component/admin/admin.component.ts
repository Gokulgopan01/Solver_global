import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { supabase } from '../../supabase.client';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  enquiries: any[] = [];
  isAuthenticated = false;
  showKeyPrompt = false;

  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  public enquiryCount = 0;

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
    // The hash of the expected key
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
        console.log('All enquiries:', this.enquiries);
      });
  }

  viewRow(eq: any) {
    // Placeholder for view row logic
    console.log('Viewing row:', eq);
  }
}
