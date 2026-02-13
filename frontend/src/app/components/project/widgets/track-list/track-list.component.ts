import { Component, inject, Input, OnChanges } from '@angular/core';
import {TrackService} from '../../../../services/track/track.service';
import {Observable, tap} from 'rxjs';
import {TrackDto} from '../../../../models/track.dto';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent implements OnChanges {
  @Input({ required: true }) projectId!: number;

  trackService = inject(TrackService);
  tracks$!: Observable<TrackDto[]>;

  ngOnChanges(): void {
    this.tracks$ = this.trackService.getTracksByProject(this.projectId).pipe(
      tap(data => console.log('Tracks fetched for project:', data))
    );
  }
}
