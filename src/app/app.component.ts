import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface OverviewMetrics {
  revenue: number;
  orders: number;
  unitsSold: number;
  returnRate: number;
}

interface PerformanceMetrics {
  pageViews: number;
  netSales: number;
  buyBoxPercent: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Walmart Seller Center';
  isSidebarOpen = true;
  selectedSection: 'Overview' | 'Performance' | null = null;

  overviewData: OverviewMetrics | null = null;
  performanceData: PerformanceMetrics | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.selectedSection = 'Overview';
    this.fetchOverview();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onNavClick(section: 'Overview' | 'Performance') {
    this.selectedSection = section;

    if (section === 'Overview') {
      console.log('📡 Hitting /api/overview…');
      this.fetchOverview();
    } else {
      console.log('📡 Hitting /api/performance…');
      this.fetchPerformance();
    }
  }

  private fetchOverview(): void {
    this.http
      .get<OverviewMetrics>('/api/overview')
      .subscribe({
        next: (data) => {
          console.log('✅ Received overview data:', data);
          this.overviewData = data;
        },
        error: (err) => {
          console.error('❌ Error fetching overview:', err);
          this.overviewData = null;
        }
      });
  }

  private fetchPerformance(): void {
    this.http
      .get<PerformanceMetrics>('/api/performance')
      .subscribe({
        next: (data) => {
          console.log('✅ Received performance data:', data);
          this.performanceData = data;
        },
        error: (err) => {
          console.error('❌ Error fetching performance:', err);
          this.performanceData = null;
        }
      });
  }
}