import { Component, inject, Input, OnInit} from '@angular/core';
import {TrackService} from '../../../../services/track/track.service';
import {Observable} from 'rxjs';
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
export class TrackListComponent implements OnInit {
  @Input({ required: true }) projectId!: number;

  trackService = inject(TrackService);
  tracks$!: Observable<TrackDto[]>;

  ngOnInit(): void {
    // this.tracks$ = this.trackService.getTracksByProject(id);
  }
}
