import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {TrackService} from '../../../services/track/track.service';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-track-upload-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-upload-modal.component.html',
  styleUrl: './track-upload-modal.component.css'
})
export class TrackUploadModalComponent {
  private trackService = inject(TrackService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  selectedFile = signal<File | null>(null);
  uploadProgress = signal<number>(0);
  isUploading = signal<boolean>(false);
  dragOver = signal<boolean>(false);

  // Extract Project ID from the URL (e.g., /projects/2)
  private projectId = computed(() => {
    const parts = this.router.url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  });

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile.set(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    if (event.dataTransfer?.files[0]) {
      this.selectedFile.set(event.dataTransfer.files[0]);
    }
  }

  upload() {
    const file = this.selectedFile();
    const id = this.projectId();

    if (file && id) {
      this.isUploading.set(true);
      this.trackService.uploadTrack(id, file, file.name).subscribe({
        next: (res) => {
          if (typeof res === 'number') {
            this.uploadProgress.set(res);
          } else {
            // Upload complete
            this.close();
            // You might want to trigger a list refresh here
          }
        },
        error: () => this.isUploading.set(false)
      });
    }
  }

  close() {
    this.modalService.close();
  }
}
