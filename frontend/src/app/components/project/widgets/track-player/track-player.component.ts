import { Component, input} from '@angular/core';

@Component({
  selector: 'app-track-player',
  standalone: true,
  imports: [],
  templateUrl: './track-player.component.html',
  styleUrl: './track-player.component.css'
})
export class TrackPlayerComponent {
  track = input.required<any>();
}
