import {Component, computed, effect, inject, Input, Signal} from '@angular/core';
import {TrackService} from '../../../../services/track/track.service';
import {CommentService} from '../../../../services/comment/comment.service';
import {UpperCasePipe} from '@angular/common';
import {CommentDto} from '../../../../models/comment.dto';

@Component({
  selector: 'app-track-comments',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './track-comments.component.html',
  styleUrl: './track-comments.component.css'
})
export class TrackCommentsComponent {
  @Input({ required: true }) projectId!: number;

  trackService = inject(TrackService);
  commentService = inject(CommentService);

  comments: Signal<CommentDto[]> = computed(() => {
    const track = this.trackService.selectedTrack();
    return track?.comments || [];
  });

  constructor() {
    effect(() => {
      const selectedTrack = this.trackService.selectedTrack();
      if (selectedTrack?.id_track) {
        this.loadComments(selectedTrack.id_track);
      }
    });
  }

  private loadComments(trackId: number) {
    this.commentService.getCommentsByTrack(trackId).subscribe({
      next: (comments) => {
        this.trackService.updateTrackComments(comments);
      },
      error: (err) => console.error('Failed to load comments:', err)
    });
  }
}
