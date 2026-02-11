import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    loadComponent: () => import('./components/project/project.component')
      .then(m => m.ProjectComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
