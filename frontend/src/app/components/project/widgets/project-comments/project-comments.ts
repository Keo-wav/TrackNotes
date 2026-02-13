import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-comments',
  imports: [],
  templateUrl: './project-comments.html',
  styleUrl: './project-comments.css',
})
export class ProjectComments {
  @Input({ required: true }) projectId!: number;
}
