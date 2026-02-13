import { Component, inject, OnInit, signal} from '@angular/core';
import {ProjectComments} from './widgets/project-comments/project-comments';
import {TrackCommentsComponent} from './widgets/track-comments/track-comments.component';
import {TrackListComponent} from './widgets/track-list/track-list.component';
import {TrackPlayerComponent} from './widgets/track-player/track-player.component';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {ProjectDto} from '../../models/project/project.dto';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ProjectComments,
    TrackCommentsComponent,
    TrackListComponent,
    TrackPlayerComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  project = signal<ProjectDto | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(Number(id)).subscribe({
        next: (data) => {
          this.project.set(data);
        }
      });
    }
  }
}
