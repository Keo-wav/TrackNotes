// services/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // null -> all modals closed
  private activeModal = new BehaviorSubject<string | null>(null);
  activeModal$ = this.activeModal.asObservable();

  open(modalName: string) {
    this.activeModal.next(modalName);
  }

  close() {
    this.activeModal.next(null);
  }
}
