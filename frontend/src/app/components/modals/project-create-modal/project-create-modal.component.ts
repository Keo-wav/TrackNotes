import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProjectService} from '../../../services/project/project.service';
import {ModalService} from '../../../services/modal/modal.service';
import {CreateProjectDto} from '../../../models/project/project-create.dto';

@Component({
  selector: 'app-project-create-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './project-create-modal.component.html',
  styleUrl: './project-create-modal.component.css',
})
export class ProjectCreateModalComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private modalService: ModalService,
    ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  onSubmit() {
    const payload: CreateProjectDto = {
      ...this.projectForm.value,
      creator_id: 1 // TODO: remplacer avec vrai id_user quand géré Auth
    };

    this.projectService.create(payload).subscribe({
      next: () => {
        this.close();
      },
      error: (err) => {
        console.error('Project creation failed. Check if creator_id exists in the DB!', err);
      }
    });
  }

  close() {
    this.modalService.close();
  }
}
