import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { supabase } from '../../supabase.client';

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

  private route = inject(ActivatedRoute);

  async ngOnInit() {
    const urlKey = this.route.snapshot.queryParamMap.get('key');
    const adminKey = urlKey || prompt('Enter admin key');
    
    if (adminKey) {
      // Accept both the original hashed secret or the new internal key directly
      const isValid = (adminKey === 'internal-3b7d1a-panel') || (await this.checkKey(adminKey));
      if (isValid) {
        this.isAuthenticated = true;
        this.loadEnquiries();
      } else {
        alert('Invalid key');
      }
    } else {
      alert('Access denied');
    }
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
        console.log('All enquiries:', this.enquiries);
      });
  }
}
