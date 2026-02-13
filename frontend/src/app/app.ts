import { Component, inject, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AsyncPipe} from '@angular/common';
import {ModalService} from './services/modal/modal.service';
import {ProjectCreateModalComponent} from './components/modals/project-create-modal/project-create-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, AsyncPipe, ProjectCreateModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  modalService = inject(ModalService);
}
