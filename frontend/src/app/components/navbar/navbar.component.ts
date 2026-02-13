import { Component, inject} from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  modalService = inject(ModalService);

  onAddNewProject() {
    this.modalService.open('createProject');
  }
}
