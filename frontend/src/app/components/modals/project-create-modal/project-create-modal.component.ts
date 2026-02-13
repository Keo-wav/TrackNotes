import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProjectService} from '../../../services/project/project.service';
import {ModalService} from '../../../services/modal/modal.service';

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
    if (this.projectForm.valid) {
      this.projectService.create(this.projectForm.value).subscribe(() => {
        this.close();
        // Optionally refresh project list
      });
    }
  }

  close() {
    this.modalService.close();
  }
}
