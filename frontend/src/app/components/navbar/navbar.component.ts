import { Component, computed, inject} from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  modalService = inject(ModalService);
  private router = inject(Router);

  onAddNewProject() {
    this.modalService.open('createProject');
  }

  private url = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isDashboard = computed(() => this.url().includes('/dashboard') || this.url() === '/');
  isProjectPage = computed(() => this.url().includes('/projects/'));
}
