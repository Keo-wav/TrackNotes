import { Component, inject, OnInit, signal} from '@angular/core';
import { TrackService } from '../../../../services/track/track.service';
import { ProjectService } from '../../../../services/project/project.service';
import { CommentService } from '../../../../services/comment/comment.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.css',
})
export class DashboardStatsComponent implements OnInit {
  trackService = inject(TrackService);
  projectService = inject(ProjectService);
  commentService = inject(CommentService);

  totalTracks = signal(0);
  totalProjects = signal(0);
  totalComments = signal(0);

  ngOnInit(): void {
    forkJoin({
      tracks: this.trackService.getTracks(),
      projects: this.projectService.getProjects(),
      comments: this.commentService.getComments(),
    }).subscribe({
      next: (data) => {
        this.totalTracks.set(data.tracks.length);
        this.totalProjects.set(data.projects.length);
        this.totalComments.set(data.comments.length);
      }, error: error => {
        console.error('stats load failed', error.message)
      }
    });
  }
}
