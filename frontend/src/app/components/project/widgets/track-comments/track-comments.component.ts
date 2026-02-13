import { Component, computed, inject} from '@angular/core';
import {TrackService} from '../../../../services/track/track.service';
import {CommentService} from '../../../../services/comment/comment.service';

@Component({
  selector: 'app-track-comments',
  standalone: true,
  imports: [],
  templateUrl: './track-comments.component.html',
  styleUrl: './track-comments.component.css'
})
export class TrackCommentsComponent {
  trackService = inject(TrackService);
  commentService = inject(CommentService);

  comments = computed(() => {
    const track = this.trackService.selectedTrack();
    return track ? track.comments : [];
  });
}
