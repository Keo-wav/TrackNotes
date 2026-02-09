import { Component, inject} from '@angular/core';
import {TrackListComponent} from '../project/widgets/track-list/track-list.component';
import {TrackPlayerComponent} from '../project/widgets/track-player/track-player.component';
import {TrackCommentsComponent} from '../project/widgets/track-comments/track-comments.component';
import {TrackService} from '../../services/track.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TrackListComponent,
    TrackPlayerComponent,
    TrackCommentsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  trackService = inject(TrackService);
}
