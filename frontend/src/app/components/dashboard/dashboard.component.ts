import { Component } from '@angular/core';
import {DashboardStatsComponent} from './widgets/dashboard-stats/dashboard-stats.component';
import {DashboardProjectsComponent} from './widgets/dashboard-projects/dashboard-projects.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardStatsComponent,
    DashboardProjectsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {}
